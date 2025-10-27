
import React, { useState, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { PreviewPanel } from './components/PreviewPanel';
import {
  DEFAULT_HTML,
} from './constants';

// Type definition for jsPDF and html2canvas from global scope
declare const jspdf: any;
declare const html2canvas: any;

const App: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>(DEFAULT_HTML);
  const [fileName, setFileName] = useState<string>('document.pdf');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<'p' | 'l'>('p');
  const previewRef = useRef<HTMLDivElement>(null);

  const handleHtmlChange = useCallback((content: string, name?: string) => {
    setHtmlContent(content);
    if (name) {
      const pdfName = name.endsWith('.html') ? name.replace('.html', '.pdf') : `${name}.pdf`;
      setFileName(pdfName);
    }
  }, []);

  const handleGeneratePdf = async () => {
    if (!previewRef.current) return;
    setIsLoading(true);

    try {
      const elementToCapture = previewRef.current;
      const canvas = await html2canvas(elementToCapture, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        // Capture full scrollable content, not just visible part
        width: elementToCapture.scrollWidth,
        height: elementToCapture.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jspdf.jsPDF({
        orientation: orientation,
        unit: 'mm',
        format: 'a4'
      });
      
      // Get page dimensions from the PDF instance to ensure they match the orientation
      const pageWidthMm = pdf.internal.pageSize.getWidth();
      const pageHeightMm = pdf.internal.pageSize.getHeight();
      
      const imgWidthPx = canvas.width;
      const imgHeightPx = canvas.height;
      
      // Calculate the image's total height in the PDF, maintaining aspect ratio
      const pdfImgWidthMm = pageWidthMm; 
      const pdfImgHeightMm = (imgHeightPx * pdfImgWidthMm) / imgWidthPx;

      let heightLeft = pdfImgHeightMm;
      let position = 0;

      // Add the first page
      pdf.addImage(imgData, 'PNG', 0, position, pdfImgWidthMm, pdfImgHeightMm);
      heightLeft -= pageHeightMm;

      // Add subsequent pages if the content is taller than one page
      while (heightLeft > 0) {
        position -= pageHeightMm; // Move the image "up" on the next page
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfImgWidthMm, pdfImgHeightMm);
        heightLeft -= pageHeightMm;
      }
      
      pdf.save(fileName);

    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("An error occurred while generating the PDF. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col h-screen font-sans text-gray-800 dark:text-gray-200">
      <Header />
      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 p-4 overflow-hidden">
        <InputPanel onHtmlChange={handleHtmlChange} initialValue={htmlContent} />
        <PreviewPanel
          htmlContent={htmlContent}
          onGeneratePdf={handleGeneratePdf}
          isLoading={isLoading}
          ref={previewRef}
          orientation={orientation}
          onOrientationChange={setOrientation}
        />
      </main>
    </div>
  );
};

export default App;