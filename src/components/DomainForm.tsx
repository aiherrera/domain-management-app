import React, { useState, useEffect } from 'react';
import { Domain, DomainFormData } from '../types';

interface DomainFormProps {
  domain?: Domain;
  onSubmit: (data: DomainFormData) => void;
  onCancel: () => void;
}

const DomainForm: React.FC<DomainFormProps> = ({ domain, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<DomainFormData>({
    item: '',
    provider: '',
    buyPrice: '',
    boughtDate: '',
    forSale: false,
    sellingPrice: '',
    soldDate: '',
  });

  useEffect(() => {
    if (domain) {
      setFormData({
        item: domain.item,
        provider: domain.provider,
        buyPrice: typeof domain.buyPrice === 'number' ? domain.buyPrice.toString() : domain.buyPrice,
        boughtDate: domain.boughtDate,
        forSale: domain.forSale,
        sellingPrice: domain.sellingPrice ? domain.sellingPrice.toString() : '',
        soldDate: domain.soldDate || '',
      });
    }
  }, [domain]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="item" className="block text-sm font-medium text-gray-700">Domain Name</label>
        <input
          type="text"
          id="item"
          name="item"
          value={formData.item}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="provider" className="block text-sm font-medium text-gray-700">Provider</label>
        <input
          type="text"
          id="provider"
          name="provider"
          value={formData.provider}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="buyPrice" className="block text-sm font-medium text-gray-700">Buy Price</label>
        <input
          type="text"
          id="buyPrice"
          name="buyPrice"
          value={formData.buyPrice}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="boughtDate" className="block text-sm font-medium text-gray-700">Bought Date</label>
        <input
          type="date"
          id="boughtDate"
          name="boughtDate"
          value={formData.boughtDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="forSale" className="flex items-center">
          <input
            type="checkbox"
            id="forSale"
            name="forSale"
            checked={formData.forSale}
            onChange={handleChange}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <span className="ml-2 text-sm text-gray-700">For Sale</span>
        </label>
      </div>
      <div>
        <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">Selling Price</label>
        <input
          type="text"
          id="sellingPrice"
          name="sellingPrice"
          value={formData.sellingPrice}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="soldDate" className="block text-sm font-medium text-gray-700">Sold Date</label>
        <input
          type="date"
          id="soldDate"
          name="soldDate"
          value={formData.soldDate}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {domain ? 'Update' : 'Add'} Domain
        </button>
      </div>
    </form>
  );
};

export default DomainForm;