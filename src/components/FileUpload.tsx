import React, { useRef } from 'react';
import { read, utils } from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import { Domain } from '../types';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onUpload: (domains: Domain[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(worksheet);

        const domains: Domain[] = jsonData.map((row: any) => ({
          id: uuidv4(),
          item: row.Item || '',
          provider: row.Provider || '',
          buyPrice: parseFloat(row['Buy Price']) || 0,
          boughtDate: row['Bought Date'] || '',
          forSale: row['For sale']?.toLowerCase() === 'yes',
          sellingPrice: row['Selling Price'] ? parseFloat(row['Selling Price']) : null,
          soldDate: row['Sold Date'] || null,
        }));

        onUpload(domains);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".xlsx,.xls,.csv,.txt"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <Upload className="mr-2" size={18} />
        Upload Domains
      </button>
    </div>
  );
};

export default FileUpload;