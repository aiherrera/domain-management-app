import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DomainList from './components/DomainList';
import DomainForm from './components/DomainForm';
import FileUpload from './components/FileUpload';
import { Domain, DomainFormData } from './types';
import { Globe } from 'lucide-react';

const App: React.FC = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [editingDomain, setEditingDomain] = useState<Domain | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const storedDomains = localStorage.getItem('domains');
    if (storedDomains) {
      setDomains(JSON.parse(storedDomains));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('domains', JSON.stringify(domains));
  }, [domains]);

  const handleAddDomain = (data: DomainFormData) => {
    const newDomain: Domain = {
      id: uuidv4(),
      ...data,
      buyPrice: parseFloat(data.buyPrice) || 0,
      sellingPrice: data.sellingPrice ? parseFloat(data.sellingPrice) : null,
    };
    setDomains([...domains, newDomain]);
    setIsFormVisible(false);
  };

  const handleUpdateDomain = (data: DomainFormData) => {
    if (editingDomain) {
      const updatedDomains = domains.map((domain) =>
        domain.id === editingDomain.id
          ? {
              ...domain,
              ...data,
              buyPrice: parseFloat(data.buyPrice) || 0,
              sellingPrice: data.sellingPrice ? parseFloat(data.sellingPrice) : null,
            }
          : domain
      );
      setDomains(updatedDomains);
      setEditingDomain(null);
      setIsFormVisible(false);
    }
  };

  const handleDeleteDomain = (id: string) => {
    setDomains(domains.filter((domain) => domain.id !== id));
  };

  const handleEditDomain = (domain: Domain) => {
    setEditingDomain(domain);
    setIsFormVisible(true);
  };

  const handleFileUpload = (uploadedDomains: Domain[]) => {
    setDomains([...domains, ...uploadedDomains]);
  };

  const totalDomains = domains.length;
  const totalBuyPrice = domains.reduce((sum, domain) => sum + (typeof domain.buyPrice === 'number' ? domain.buyPrice : 0), 0);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-4xl lg:max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                <Globe className="mr-2" size={32} />
                Domain Manager
              </h1>
              <div className="flex space-x-4">
                <FileUpload onUpload={handleFileUpload} />
                <button
                  onClick={() => setIsFormVisible(true)}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add New Domain
                </button>
              </div>
            </div>

            <div className="mb-8 flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <div className="text-lg font-semibold">
                Total Domains: <span className="text-indigo-600">{totalDomains}</span>
              </div>
              <div className="text-lg font-semibold">
                Total Buy Price: <span className="text-green-600">${totalBuyPrice.toFixed(2)}</span>
              </div>
            </div>

            {isFormVisible && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{editingDomain ? 'Edit Domain' : 'Add New Domain'}</h2>
                <DomainForm
                  domain={editingDomain || undefined}
                  onSubmit={editingDomain ? handleUpdateDomain : handleAddDomain}
                  onCancel={() => {
                    setIsFormVisible(false);
                    setEditingDomain(null);
                  }}
                />
              </div>
            )}

            <DomainList
              domains={domains}
              onEdit={handleEditDomain}
              onDelete={handleDeleteDomain}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;