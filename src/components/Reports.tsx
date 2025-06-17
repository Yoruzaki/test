import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  DollarSign,
  Package,
  Users,
  Factory
} from 'lucide-react';

export const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('production');

  const periods = [
    { id: 'week', name: 'Cette Semaine' },
    { id: 'month', name: 'Ce Mois' },
    { id: 'quarter', name: 'Ce Trimestre' },
    { id: 'year', name: 'Cette Année' }
  ];

  const reportTypes = [
    { id: 'production', name: 'Production', icon: Factory },
    { id: 'sales', name: 'Ventes', icon: DollarSign },
    { id: 'inventory', name: 'Inventaire', icon: Package },
    { id: 'quality', name: 'Qualité', icon: BarChart3 }
  ];

  const productionData = [
    { product: 'Lait Entier', quantity: 45230, unit: 'L', target: 50000, variance: -9.5 },
    { product: 'Fromage Comté', quantity: 2850, unit: 'kg', target: 3000, variance: -5.0 },
    { product: 'Yaourt Nature', quantity: 8750, unit: 'unités', target: 8000, variance: 9.4 },
    { product: 'Beurre Fermier', quantity: 1240, unit: 'kg', target: 1200, variance: 3.3 }
  ];

  const salesData = [
    { customer: 'Supermarché BioFresh', amount: 15420, orders: 12, growth: 15.2 },
    { customer: 'Restaurant Le Gourmet', amount: 8930, orders: 8, growth: 7.8 },
    { customer: 'École Saint-Jean', amount: 5640, orders: 4, growth: -2.1 },
    { customer: 'Boulangerie Artisanale', amount: 4250, orders: 6, growth: 12.5 }
  ];

  const kpis = {
    production: {
      total: '58,070 L',
      efficiency: '94.2%',
      quality: '98.5%',
      downtime: '2.3h'
    },
    sales: {
      revenue: '€34,240',
      orders: '30',
      avgOrder: '€1,141',
      growth: '+12.5%'
    }
  };

  const renderProductionReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Production Totale</p>
              <p className="text-2xl font-bold text-gray-900">{kpis.production.total}</p>
            </div>
            <Factory className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Efficacité</p>
              <p className="text-2xl font-bold text-green-600">{kpis.production.efficiency}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Qualité</p>
              <p className="text-2xl font-bold text-blue-600">{kpis.production.quality}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Temps d'Arrêt</p>
              <p className="text-2xl font-bold text-orange-600">{kpis.production.downtime}</p>
            </div>
            <Calendar className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance par Produit</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Produit</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Quantité Produite</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Objectif</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Écart</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Performance</th>
              </tr>
            </thead>
            <tbody>
              {productionData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{item.product}</td>
                  <td className="py-3 px-4 text-gray-700">{item.quantity.toLocaleString()} {item.unit}</td>
                  <td className="py-3 px-4 text-gray-700">{item.target.toLocaleString()} {item.unit}</td>
                  <td className={`py-3 px-4 font-medium ${item.variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.variance >= 0 ? '+' : ''}{item.variance}%
                  </td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.variance >= 0 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(100, (item.quantity / item.target) * 100)}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSalesReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Chiffre d'Affaires</p>
              <p className="text-2xl font-bold text-gray-900">{kpis.sales.revenue}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Commandes</p>
              <p className="text-2xl font-bold text-blue-600">{kpis.sales.orders}</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Panier Moyen</p>
              <p className="text-2xl font-bold text-purple-600">{kpis.sales.avgOrder}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Croissance</p>
              <p className="text-2xl font-bold text-green-600">{kpis.sales.growth}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance par Client</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Client</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Montant</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Commandes</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Croissance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Contribution</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item, index) => {
                const totalRevenue = salesData.reduce((sum, s) => sum + s.amount, 0);
                const contribution = (item.amount / totalRevenue) * 100;
                
                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{item.customer}</td>
                    <td className="py-3 px-4 text-gray-700">€{item.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-700">{item.orders}</td>
                    <td className={`py-3 px-4 font-medium ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.growth >= 0 ? '+' : ''}{item.growth}%
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: `${contribution}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{contribution.toFixed(1)}%</span>
                      </div>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Rapports et Analyses</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Exporter PDF</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Planifier Rapport
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-2">
            {reportTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedReport(type.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                    selectedReport === type.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{type.name}</span>
                </button>
              );
            })}
          </div>

          <div className="flex space-x-2">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPeriod === period.id
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Report Content */}
      {selectedReport === 'production' && renderProductionReport()}
      {selectedReport === 'sales' && renderSalesReport()}
      
      {(selectedReport === 'inventory' || selectedReport === 'quality') && (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Rapport {selectedReport === 'inventory' ? 'Inventaire' : 'Qualité'} en Développement
          </h3>
          <p className="text-gray-600">
            Ce rapport sera disponible dans une prochaine version du système.
          </p>
        </div>
      )}
    </div>
  );
};