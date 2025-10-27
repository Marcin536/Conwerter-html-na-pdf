
import React from 'react';
import { FileTextIcon } from './Icon';

export const Header: React.FC = () => {
  return (
    <header className="flex-shrink-0 bg-white dark:bg-gray-800 shadow-md p-4">
      <div className="container mx-auto flex items-center gap-3">
        <FileTextIcon className="h-8 w-8 text-indigo-500" />
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">HTML to PDF Converter</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Convert your HTML to a print-ready A4 PDF</p>
        </div>
      </div>
    </header>
  );
};
