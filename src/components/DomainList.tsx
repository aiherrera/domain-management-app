import React, { useState } from 'react';
import { Domain } from '../types';
import { Edit, Trash2 } from 'lucide-react';

interface DomainListProps {
  domains: Domain[];
  onEdit: (domain: Domain) => void;
  onDelete: (id: string) => void;
}

const DomainList: React.FC<DomainListProps> = ({ domains, onEdit, onDelete }) => {
  const [sortColumn, setSortColumn] = useState<keyof Domain>('item');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: keyof Domain) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedDomains = [...domains].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            {['Item', 'Provider', 'Buy Price', 'Bought Date', 'For sale', 'Selling Price', 'Sold Date', 'Actions'].map((header) => (
              <th
                key={header}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort(header.toLowerCase().replace(' ', '') as keyof Domain)}
              >
                {header}
                {sortColumn === header.toLowerCase().replace(' ', '') && (
                  <span className="ml-1">{sortDirection === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedDomains.map((domain) => (
            <tr key={domain.id} className={domain.forSale ? 'bg-green-50' : 'bg-red-50'}>
              <td className="px-4 py-2">{domain.item}</td>
              <td className="px-4 py-2">{domain.provider}</td>
              <td className="px-4 py-2">${typeof domain.buyPrice === 'number' ? domain.buyPrice.toFixed(2) : domain.buyPrice}</td>
              <td className="px-4 py-2">{domain.boughtDate}</td>
              <td className="px-4 py-2">{domain.forSale ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2">{domain.sellingPrice ? `$${domain.sellingPrice.toFixed(2)}` : '-'}</td>
              <td className="px-4 py-2">{domain.soldDate || '-'}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onEdit(domain)}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onDelete(domain.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DomainList;