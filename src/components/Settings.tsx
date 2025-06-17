import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database,
  Wifi,
  Monitor,
  Save,
  RefreshCw
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'Général', icon: SettingsIcon },
    { id: 'users', name: 'Utilisateurs', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Sécurité', icon: Shield },
    { id: 'system', name: 'Système', icon: Monitor },
    { id: 'database', name: 'Base de Données', icon: Database }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de l'Entreprise</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de l'Entreprise
            </label>
            <input
              type="text"
              defaultValue="Laiterie Artisanale du Terroir"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numéro SIRET
            </label>
            <input
              type="text"
              defaultValue="12345678901234"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse
            </label>
            <input
              type="text"
              defaultValue="123 Route de la Ferme, 25000 Besançon"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              defaultValue="+33 3 81 22 33 44"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres de Production</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacité de Production Journalière (L)
            </label>
            <input
              type="number"
              defaultValue="50000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de Lignes de Production
            </label>
            <input
              type="number"
              defaultValue="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Température de Stockage Standard (°C)
            </label>
            <input
              type="number"
              step="0.1"
              defaultValue="4.0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durée de Conservation Standard (jours)
            </label>
            <input
              type="number"
              defaultValue="7"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Gestion des Utilisateurs</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Ajouter Utilisateur
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Nom</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Rôle</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-900">Marie Dubois</td>
                <td className="py-3 px-4 text-gray-700">marie.dubois@laiterie.fr</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    Gestionnaire Production
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Actif
                  </span>
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 text-sm">Modifier</button>
                  <button className="text-red-600 hover:text-red-900 text-sm">Désactiver</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-900">Pierre Martin</td>
                <td className="py-3 px-4 text-gray-700">pierre.martin@laiterie.fr</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Technicien Qualité
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Actif
                  </span>
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 text-sm">Modifier</button>
                  <button className="text-red-600 hover:text-red-900 text-sm">Désactiver</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Préférences de Notification</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Alertes de Production</h4>
              <p className="text-sm text-gray-600">Notifications en cas d'arrêt ou de problème de production</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Contrôle Qualité</h4>
              <p className="text-sm text-gray-600">Notifications pour les tests de qualité échoués</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Stock Faible</h4>
              <p className="text-sm text-gray-600">Alertes lorsque le stock atteint le seuil minimum</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Nouvelles Commandes</h4>
              <p className="text-sm text-gray-600">Notifications pour les nouvelles commandes clients</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations Système</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Version du Système</span>
              <span className="text-sm text-gray-900">DairyFlow v2.1.3</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Dernière Mise à Jour</span>
              <span className="text-sm text-gray-900">16 Janvier 2024</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Base de Données</span>
              <span className="text-sm text-green-600 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Connectée
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Capteurs IoT</span>
              <span className="text-sm text-green-600 flex items-center">
                <Wifi className="w-4 h-4 mr-1" />
                12/12 Actifs
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Espace Disque</span>
              <span className="text-sm text-gray-900">45.2 GB / 100 GB</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Sauvegarde</span>
              <span className="text-sm text-green-600">Aujourd'hui 03:00</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Vérifier Mises à Jour</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Diagnostics Système
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Paramètres Système</h1>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Sauvegarder</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'users' && renderUserSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'system' && renderSystemSettings()}
          
          {(activeTab === 'security' || activeTab === 'database') && (
            <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
              <SettingsIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Section {activeTab === 'security' ? 'Sécurité' : 'Base de Données'} en Développement
              </h3>
              <p className="text-gray-600">
                Ces paramètres seront disponibles dans une prochaine version.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};