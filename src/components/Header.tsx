import React from 'react';
import { Bell, Search, User, Menu, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t, isRTL } = useLanguage();

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇩🇿' }
  ];

  const [showLanguageMenu, setShowLanguageMenu] = React.useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 px-3 sm:px-6 py-4 transition-colors duration-200">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <h2 className={`text-lg sm:text-2xl font-semibold text-gray-800 dark:text-white ${isRTL ? 'font-arabic' : ''}`}>
            {t('header.title')}
          </h2>
        </div>

        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 sm:space-x-4' : 'space-x-2 sm:space-x-4'}`}>
          {/* Search - Hidden on mobile */}
          <div className="relative hidden sm:block">
            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400`} />
            <input
              type="text"
              placeholder={t('header.search')}
              className={`${isRTL ? 'pr-10 pl-4 text-right font-arabic' : 'pl-10 pr-4'} py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 lg:w-64 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}
              title="Change language"
            >
              <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
              <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 uppercase hidden sm:inline">
                {language}
              </span>
            </button>

            {showLanguageMenu && (
              <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-40 sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-50`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as any);
                      setShowLanguageMenu(false);
                    }}
                    className={`w-full ${isRTL ? 'text-right' : 'text-left'} px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center ${isRTL ? 'space-x-reverse space-x-2 sm:space-x-3' : 'space-x-2 sm:space-x-3'} ${
                      language === lang.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                    } first:rounded-t-lg last:rounded-b-lg`}
                  >
                    <span className="text-sm sm:text-lg">{lang.flag}</span>
                    <span className={`text-sm font-medium ${lang.code === 'ar' ? 'font-arabic' : ''}`}>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
            <span className={`absolute ${isRTL ? '-left-1' : '-right-1'} -top-1 h-3 w-3 sm:h-4 sm:w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center`}>
              3
            </span>
          </button>

          {/* User Profile - Hidden on mobile */}
          <div className={`hidden sm:flex items-center ${isRTL ? 'space-x-reverse space-x-3 pr-4 border-r' : 'space-x-3 pl-4 border-l'} dark:border-gray-600`}>
            <div className={`${isRTL ? 'text-left' : 'text-right'}`}>
              <p className={`text-sm font-medium text-gray-800 dark:text-white ${isRTL ? 'font-arabic' : ''}`}>{t('header.user')}</p>
              <p className={`text-xs text-gray-500 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>{t('header.role')}</p>
            </div>
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close language menu */}
      {showLanguageMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowLanguageMenu(false)}
        />
      )}
    </header>
  );
};