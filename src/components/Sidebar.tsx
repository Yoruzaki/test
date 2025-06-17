import React from 'react';
import { 
  BarChart3, 
  Factory, 
  Package, 
  ShieldCheck, 
  ClipboardList, 
  FileText, 
  Settings as SettingsIcon,
  Menu,
  Milk
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  setIsOpen 
}) => {
  const { t, isRTL } = useLanguage();

  const menuItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: BarChart3 },
    { id: 'production', label: t('nav.production'), icon: Factory },
    { id: 'inventory', label: t('nav.inventory'), icon: Package },
    { id: 'quality', label: t('nav.quality'), icon: ShieldCheck },
    { id: 'orders', label: t('nav.orders'), icon: ClipboardList },
    { id: 'reports', label: t('nav.reports'), icon: FileText },
    { id: 'settings', label: t('nav.settings'), icon: SettingsIcon },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed ${isRTL ? 'right-0' : 'left-0'} top-0 h-full bg-white dark:bg-gray-800 shadow-lg z-40 transition-all duration-300 border-${isRTL ? 'l' : 'r'} dark:border-gray-700 ${
        isOpen ? 'w-64' : 'w-16'
      } ${
        // Mobile responsive
        isOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0')
      }`}>
        <div className={`flex items-center justify-between p-4 border-b dark:border-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'} ${!isOpen && 'justify-center'}`}>
            <Milk className="h-8 w-8 text-blue-600" />
            {isOpen && (
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h1 className={`text-xl font-bold text-gray-800 dark:text-white ${isRTL ? 'font-arabic' : ''}`}>
                  مصنع الألبان الجزائري
                </h1>
                <p className={`text-sm text-gray-500 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL ? 'إدارة الألبان' : 'Gestion Laitière'}
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <nav className="mt-6 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'} px-3 py-3 rounded-lg mb-1 transition-all duration-200 ${
                  isActive
                    ? `bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-${isRTL ? 'l' : 'r'}-2 border-blue-600`
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white'
                } ${!isOpen && 'justify-center'}`}
                title={!isOpen ? item.label : ''}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''} ${isRTL && !isOpen ? 'ml-0' : ''}`} />
                {isOpen && (
                  <span className={`font-medium ${isActive ? 'text-blue-700 dark:text-blue-300' : ''} ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};