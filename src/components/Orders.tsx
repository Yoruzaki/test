import React, { useState } from 'react';
import { 
  ClipboardList, 
  Plus, 
  Search, 
  Calendar,
  User,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

export const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    {
      id: 'CMD-001',
      customer: 'Supermarché BioFresh',
      contact: 'Pierre Martin',
      email: 'p.martin@biofresh.fr',
      products: [
        { name: 'Lait Entier Bio 1L', quantity: 500, unit: 'unités', price: 1.85 },
        { name: 'Fromage Comté AOP', quantity: 25, unit: 'kg', price: 32.50 }
      ],
      totalAmount: 1737.50,
      status: 'processing',
      priority: 'high',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-18',
      notes: 'Livraison urgente - Client VIP'
    },
    {
      id: 'CMD-002',
      customer: 'Restaurant Le Gourmet',
      contact: 'Chef Marie Dubois',
      email: 'chef@legourmet.fr',
      products: [
        { name: 'Beurre Fermier', quantity: 10, unit: 'kg', price: 18.00 },
        { name: 'Yaourt Nature Bio', quantity: 50, unit: 'unités', price: 2.20 }
      ],
      totalAmount: 290.00,
      status: 'shipped',
      priority: 'medium',
      orderDate: '2024-01-14',
      deliveryDate: '2024-01-17',
      notes: 'Livraison matinale demandée'
    },
    {
      id: 'CMD-003',
      customer: 'École Primaire Saint-Jean',
      contact: 'Directrice Anne Roussel',
      email: 'direction@saintjean.edu',
      products: [
        { name: 'Lait Demi-Écrémé 1L', quantity: 200, unit: 'unités', price: 1.65 },
        { name: 'Yaourt aux Fruits', quantity: 150, unit: 'unités', price: 2.80 }
      ],
      totalAmount: 750.00,
      status: 'pending',
      priority: 'low',
      orderDate: '2024-01-16',
      deliveryDate: '2024-01-20',
      notes: 'Facturation mensuelle'
    },
    {
      id: 'CMD-004',
      customer: 'Boulangerie Artisanale',
      contact: 'Paul Boulanger',
      email: 'contact@artisan-pain.fr',
      products: [
        { name: 'Beurre de Baratte', quantity: 15, unit: 'kg', price: 22.00 },
        { name: 'Crème Fraîche 35%', quantity: 20, unit: 'L', price: 8.50 }
      ],
      totalAmount: 500.00,
      status: 'delivered',
      priority: 'medium',
      orderDate: '2024-01-13',
      deliveryDate: '2024-01-16',
      notes: 'Livraison effectuée'
    }
  ];

  const statuses = [
    { id: 'all', name: 'Toutes', count: orders.length },
    { id: 'pending', name: 'En Attente', count: orders.filter(o => o.status === 'pending').length },
    { id: 'processing', name: 'En Préparation', count: orders.filter(o => o.status === 'processing').length },
    { id: 'shipped', name: 'Expédiées', count: orders.filter(o => o.status === 'shipped').length },
    { id: 'delivered', name: 'Livrées', count: orders.filter(o => o.status === 'delivered').length }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-50';
      case 'processing': return 'text-blue-600 bg-blue-50';
      case 'shipped': return 'text-purple-600 bg-purple-50';
      case 'delivered': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const summary = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
    pendingCount: orders.filter(o => o.status === 'pending').length,
    urgentCount: orders.filter(o => o.priority === 'high').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Commandes</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Nouvelle Commande</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Exporter
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Commandes</p>
              <p className="text-2xl font-bold text-gray-900">{summary.totalOrders}</p>
            </div>
            <ClipboardList className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Chiffre d'Affaires</p>
              <p className="text-2xl font-bold text-green-600">€{summary.totalRevenue.toLocaleString()}</p>
            </div>
            <Package className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En Attente</p>
              <p className="text-2xl font-bold text-orange-600">{summary.pendingCount}</p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Urgentes</p>
              <p className="text-2xl font-bold text-red-600">{summary.urgentCount}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status.id}
                onClick={() => setStatusFilter(status.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  statusFilter === status.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{status.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  statusFilter === status.id ? 'bg-blue-700' : 'bg-gray-200'
                }`}>
                  {status.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une commande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <span>{order.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">
                        {order.status === 'pending' ? 'En Attente' :
                         order.status === 'processing' ? 'En Préparation' :
                         order.status === 'shipped' ? 'Expédiée' :
                         order.status === 'delivered' ? 'Livrée' : order.status}
                      </span>
                    </span>
                  </h3>
                  <div className="mt-1 space-y-1">
                    <p className="text-gray-600 flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{order.customer} - {order.contact}</span>
                    </p>
                    <p className="text-sm text-gray-500">{order.email}</p>
                  </div>
                </div>
              </div>

              <div className="text-right space-y-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                  {order.priority === 'high' ? 'Priorité Haute' :
                   order.priority === 'medium' ? 'Priorité Moyenne' : 'Priorité Basse'}
                </span>
                <p className="text-sm text-gray-600 flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Livraison: {order.deliveryDate}</span>
                </p>
                <p className="text-lg font-bold text-gray-900">€{order.totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Produits commandés:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {order.products.map((product, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.quantity} {product.unit}</p>
                    </div>
                    <p className="font-medium text-gray-900">€{(product.quantity * product.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {order.notes && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Notes:</strong> {order.notes}
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-4">
              <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Voir Détails
              </button>
              {order.status === 'pending' && (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Traiter Commande
                </button>
              )}
              {order.status === 'processing' && (
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Marquer Expédiée
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};