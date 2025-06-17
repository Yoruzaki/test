import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Milk,
  Wheat,
  Factory
} from 'lucide-react';

export const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const inventoryData = [
    {
      id: 'RAW001',
      name: 'Lait Cru Bio',
      category: 'raw',
      quantity: 15420,
      unit: 'L',
      minStock: 10000,
      maxStock: 20000,
      location: 'Tank A1',
      expiryDate: '2024-01-18',
      supplier: 'Ferme Dubois',
      status: 'normal'
    },
    {
      id: 'RAW002',
      name: 'Ferments Lactiques',
      category: 'raw',
      quantity: 45,
      unit: 'kg',
      minStock: 20,
      maxStock: 100,
      location: 'Réfrigérateur R1',
      expiryDate: '2024-02-15',
      supplier: 'BioLac Industries',
      status: 'normal'
    },
    {
      id: 'FIN001',
      name: 'Lait Entier 1L',
      category: 'finished',
      quantity: 2340,
      unit: 'unités',
      minStock: 1000,
      maxStock: 5000,
      location: 'Entrepôt E1',
      expiryDate: '2024-01-25',
      supplier: '',
      status: 'normal'
    },
    {
      id: 'FIN002',
      name: 'Fromage Comté AOP',
      category: 'finished',
      quantity: 180,
      unit: 'kg',
      minStock: 200,
      maxStock: 800,
      location: 'Cave C1',
      expiryDate: '2024-06-15',
      supplier: '',
      status: 'low'
    },
    {
      id: 'PAK001',
      name: 'Bouteilles 1L',
      category: 'packaging',
      quantity: 15000,
      unit: 'unités',
      minStock: 5000,
      maxStock: 25000,
      location: 'Stockage S1',
      expiryDate: '',
      supplier: 'PackVert',
      status: 'normal'
    },
    {
      id: 'PAK002',
      name: 'Étiquettes Bio',
      category: 'packaging',
      quantity: 8500,
      unit: 'unités',
      minStock: 10000,
      maxStock: 50000,
      location: 'Stockage S2',
      expiryDate: '',
      supplier: 'LabelPro',
      status: 'low'
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous', icon: Package },
    { id: 'raw', name: 'Matières Premières', icon: Milk },
    { id: 'finished', name: 'Produits Finis', icon: Factory },
    { id: 'packaging', name: 'Emballages', icon: Wheat }
  ];

  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'text-red-600 bg-red-50';
      case 'high': return 'text-blue-600 bg-blue-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const getStockLevel = (quantity: number, minStock: number, maxStock: number) => {
    const percentage = (quantity / maxStock) * 100;
    if (percentage < (minStock / maxStock) * 100) return 'low';
    if (percentage > 80) return 'high';
    return 'normal';
  };

  const summary = {
    totalItems: inventoryData.length,
    lowStock: inventoryData.filter(item => item.status === 'low').length,
    totalValue: 125430,
    lastUpdated: new Date().toLocaleString('fr-FR')
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Stocks</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Ajouter Article</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Inventaire Complet
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Articles</p>
              <p className="text-2xl font-bold text-gray-900">{summary.totalItems}</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stock Faible</p>
              <p className="text-2xl font-bold text-red-600">{summary.lowStock}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Valeur Totale</p>
              <p className="text-2xl font-bold text-gray-900">€{summary.totalValue.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Dernière MAJ</p>
              <p className="text-sm font-medium text-gray-900">{summary.lastUpdated}</p>
            </div>
            <Factory className="h-8 w-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Emplacement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => {
                const stockLevel = getStockLevel(item.quantity, item.minStock, item.maxStock);
                const stockPercentage = (item.quantity / item.maxStock) * 100;
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">ID: {item.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.quantity.toLocaleString()} {item.unit}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className={`h-2 rounded-full ${
                              stockLevel === 'low' ? 'bg-red-500' :
                              stockLevel === 'high' ? 'bg-blue-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(stockLevel)}`}>
                        {stockLevel === 'low' ? 'Stock Faible' :
                         stockLevel === 'high' ? 'Stock Élevé' : 'Normal'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.expiryDate || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Modifier</button>
                      <button className="text-green-600 hover:text-green-900">Mouvement</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};