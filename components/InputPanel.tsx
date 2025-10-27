import React, { useState, useCallback } from 'react';
import { CodeIcon, UploadIcon } from './Icon';

interface InputPanelProps {
  onHtmlChange: (content: string, fileName?: string) => void;
  initialValue: string;
}

type InputMode = 'paste' | 'upload';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

// FIX: Explicitly type TabButton as a React.FC to help TypeScript correctly infer the props, including children.
const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-indigo-500 flex items-center justify-center gap-2 ${
      active
        ? 'bg-indigo-500 text-white shadow'
        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
    }`}
  >
    {children}
  </button>
);

export const InputPanel: React.FC<InputPanelProps> = ({ onHtmlChange, initialValue }) => {
  const [mode, setMode] = useState<InputMode>('paste');
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onHtmlChange(content, file.name);
        setFileName(file.name);
      };
      reader.readAsText(file);
    }
     // Reset file input to allow re-uploading the same file
    event.target.value = '';
  }, [onHtmlChange]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col h-full">
      <div className="flex-shrink-0 p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex bg-gray-100 dark:bg-gray-900 rounded-lg p-1 space-x-1">
          <TabButton active={mode === 'paste'} onClick={() => setMode('paste')}>
            <CodeIcon className="h-5 w-5"/>
            Paste Code
          </TabButton>
          <TabButton active={mode === 'upload'} onClick={() => setMode('upload')}>
            <UploadIcon className="h-5 w-5"/>
            Upload File
          </TabButton>
        </div>
      </div>
      <div className="flex-grow p-4 overflow-auto">
        {mode === 'paste' ? (
          <textarea
            defaultValue={initialValue}
            onChange={(e) => onHtmlChange(e.target.value, 'pasted-content.pdf')}
            className="w-full h-full p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
            placeholder="Paste your HTML code here..."
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <UploadIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Select an HTML file to upload</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {fileName ? `Current file: ${fileName}` : 'No file selected'}
            </p>
            <label htmlFor="file-upload" className="mt-4 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Browse File
            </label>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept=".html, .htm"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};