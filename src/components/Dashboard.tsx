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
  const { t, isRTL } = useLanguage();

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
      value: '45,230 دج',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'orange'
    }
  ];

  const recentActivity = [
    { time: '09:15', event: 'دفعة حليب #L2024-001 تم التحقق من الجودة', type: 'success' },
    { time: '08:45', event: 'بدء إنتاج جبن الشيدر الجزائري', type: 'info' },
    { time: '08:30', event: 'تنبيه: درجة حرارة الخزان #3 مرتفعة', type: 'warning' },
    { time: '08:00', event: 'تم استلام تسليم المواد الخام', type: 'success' },
    { time: '07:30', event: 'بدء نوبة الفريق الصباحي', type: 'info' }
  ];

  const productionData = [
    { product: 'حليب كامل الدسم', target: 5000, actual: 4850, percentage: 97 },
    { product: 'جبن جزائري', target: 800, actual: 720, percentage: 90 },
    { product: 'لبن طبيعي', target: 2000, actual: 2150, percentage: 108 },
    { product: 'زبدة بلدية', target: 300, actual: 285, percentage: 95 }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className={`text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white ${isRTL ? 'font-arabic' : ''}`}>
          {t('dashboard.title')}
        </h1>
        <div className={`text-sm text-gray-500 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>
          {t('dashboard.updated')}: {new Date().toLocaleString('ar-DZ')}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} justify-between`}>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 mb-1 ${isRTL ? 'font-arabic' : ''}`}>{stat.title}</p>
                  <p className={`text-xl sm:text-2xl font-bold text-gray-900 dark:text-white ${isRTL ? 'font-arabic' : ''}`}>{stat.value}</p>
                  <p className={`text-sm font-medium mt-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  } ${isRTL ? 'font-arabic' : ''}`}>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Production Status */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-4 sm:p-6">
          <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h3 className={`text-lg font-semibold text-gray-900 dark:text-white ${isRTL ? 'font-arabic' : ''}`}>
              {t('dashboard.todayProduction')}
            </h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {productionData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>
                    {item.product}
                  </span>
                  <span className={`text-sm text-gray-500 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>
                    {item.actual} / {item.target} L
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.percentage >= 100 ? 'bg-green-500' :
                      item.percentage >= 90 ? 'bg-blue-500' : 'bg-orange-500'
                    } ${isRTL ? 'rounded-r-full' : 'rounded-l-full'}`}
                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                  />
                </div>
                <div className={`flex justify-between text-xs text-gray-500 dark:text-gray-400 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                  <span>{item.percentage}% من الهدف</span>
                  <span className={`font-medium ${
                    item.percentage >= 100 ? 'text-green-600' :
                    item.percentage >= 90 ? 'text-blue-600' : 'text-orange-600'
                  }`}>
                    {item.percentage >= 100 ? 'تم تحقيق الهدف' :
                     item.percentage >= 90 ? 'قيد التنفيذ' : 'متأخر'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-4 sm:p-6">
          <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h3 className={`text-lg font-semibold text-gray-900 dark:text-white ${isRTL ? 'font-arabic' : ''}`}>
              {t('dashboard.recentActivity')}
            </h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className={`flex items-start ${isRTL ? 'flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'}`}>
                <div className={`mt-1 h-2 w-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm text-gray-900 dark:text-white ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {activity.event}
                  </p>
                  <p className={`text-xs text-gray-500 dark:text-gray-400 ${isRTL ? 'text-right' : ''}`}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-4 sm:p-6">
        <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
          {t('dashboard.quickActions')}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            <Factory className="h-6 sm:h-8 w-6 sm:w-8 text-gray-400 mx-auto mb-2" />
            <span className={`text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>
              {t('dashboard.newProduction')}
            </span>
          </button>
          <button className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
            <Package className="h-6 sm:h-8 w-6 sm:w-8 text-gray-400 mx-auto mb-2" />
            <span className={`text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>
              {t('dashboard.manageStock')}
            </span>
          </button>
          <button className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
            <CheckCircle className="h-6 sm:h-8 w-6 sm:w-8 text-gray-400 mx-auto mb-2" />
            <span className={`text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>
              {t('dashboard.qualityControl')}
            </span>
          </button>
          <button className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
            <Users className="h-6 sm:h-8 w-6 sm:w-8 text-gray-400 mx-auto mb-2" />
            <span className={`text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>
              {t('dashboard.manageTeams')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};