import React from 'react';
import { 
  TrendingUp, 
  Package, 
  AlertTriangle, 
  CheckCircle,
  Factory,
  Users,
  DollarSign,
  Activity
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('dashboard.dailyProduction'),
      value: '12,450 L',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: Factory,
      color: 'blue'
    },
    {
      title: t('dashboard.activeOrders'),
      value: '47',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Package,
      color: 'green'
    },
    {
      title: t('dashboard.qualityCompliance'),
      value: '98.5%',
      change: '+0.8%',
      changeType: 'positive' as const,
      icon: CheckCircle,
      color: 'emerald'
    },
    {
      title: t('dashboard.revenue'),
      value: '€45,230',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'orange'
    }
  ];

  const recentActivity = [
    { time: '09:15', event: 'Lot de lait #L2024-001 validé qualité', type: 'success' },
    { time: '08:45', event: 'Production fromage comté démarrée', type: 'info' },
    { time: '08:30', event: 'Alerte: Température tank #3 élevée', type: 'warning' },
    { time: '08:00', event: 'Livraison matière première reçue', type: 'success' },
    { time: '07:30', event: 'Shift équipe matin commencé', type: 'info' }
  ];

  const productionData = [
    { product: 'Lait Entier', target: 5000, actual: 4850, percentage: 97 },
    { product: 'Fromage Comté', target: 800, actual: 720, percentage: 90 },
    { product: 'Yaourt Nature', target: 2000, actual: 2150, percentage: 108 },
    { product: 'Beurre Fermier', target: 300, actual: 285, percentage: 95 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('dashboard.title')}</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {t('dashboard.updated')}: {new Date().toLocaleString('fr-FR')}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className={`text-sm font-medium mt-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} {t('dashboard.vsYesterday')}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-50 dark:bg-${stat.color}-900/20`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Status */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('dashboard.todayProduction')}</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {productionData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.product}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.actual} / {item.target} L
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.percentage >= 100 ? 'bg-green-500' :
                      item.percentage >= 90 ? 'bg-blue-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{item.percentage}% de l'objectif</span>
                  <span className={`font-medium ${
                    item.percentage >= 100 ? 'text-green-600' :
                    item.percentage >= 90 ? 'text-blue-600' : 'text-orange-600'
                  }`}>
                    {item.percentage >= 100 ? 'Objectif atteint' :
                     item.percentage >= 90 ? 'En cours' : 'En retard'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('dashboard.recentActivity')}</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`mt-1 h-2 w-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">{activity.event}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('dashboard.quickActions')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            <Factory className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('dashboard.newProduction')}</span>
          </button>
          <button className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
            <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('dashboard.manageStock')}</span>
          </button>
          <button className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
            <CheckCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('dashboard.qualityControl')}</span>
          </button>
          <button className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
            <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('dashboard.manageTeams')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};