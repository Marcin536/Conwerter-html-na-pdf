
import React, { forwardRef } from 'react';
import { DownloadIcon, PortraitIcon, LandscapeIcon } from './Icon';
import { Spinner } from './Spinner';

interface PreviewPanelProps {
  htmlContent: string;
  onGeneratePdf: () => void;
  isLoading: boolean;
  orientation: 'p' | 'l';
  onOrientationChange: (orientation: 'p' | 'l') => void;
}

interface OrientationButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const OrientationButton: React.FC<OrientationButtonProps> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-indigo-500 ${
      active
        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
    }`}
  >
    {children}
  </button>
);


export const PreviewPanel = forwardRef<HTMLDivElement, PreviewPanelProps>(
  ({ htmlContent, onGeneratePdf, isLoading, orientation, onOrientationChange }, ref) => {
    // A4 dimensions in millimeters. CSS handles the conversion to pixels.
    // This forces the content to reflow to the correct width before capturing.
    const a4Style = {
      width: orientation === 'p' ? '210mm' : '297mm',
      minHeight: orientation === 'p' ? '297mm' : '210mm',
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col h-full overflow-hidden">
        <div className="flex-shrink-0 p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center gap-4 flex-wrap">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Live Preview (A4)</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
               <OrientationButton active={orientation === 'p'} onClick={() => onOrientationChange('p')}>
                  <PortraitIcon className="h-4 w-4" />
                  <span>Pionowo</span>
               </OrientationButton>
               <OrientationButton active={orientation === 'l'} onClick={() => onOrientationChange('l')}>
                   <LandscapeIcon className="h-4 w-4" />
                  <span>Poziomo</span>
               </OrientationButton>
            </div>
            <button
              onClick={onGeneratePdf}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  Generowanie...
                </>
              ) : (
                <>
                  <DownloadIcon className="h-5 w-5" />
                  Generuj i pobierz PDF
                </>
              )}
            </button>
          </div>
        </div>
        <div className="flex-grow bg-gray-50 dark:bg-gray-900 overflow-auto p-8 flex justify-center">
          <div 
            ref={ref} 
            className="bg-white shadow-2xl p-[20mm] box-content"
            style={a4Style}
          >
            <div
              id="pdf-preview-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      </div>
    );
  }
);
