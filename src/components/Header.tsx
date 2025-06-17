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
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 px-6 py-4 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {t('header.title')}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('header.search')}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-1"
            title={language === 'fr' ? 'Switch to English' : 'Passer au français'}
          >
            <Globe className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase">
              {language}
            </span>
          </button>

          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center space-x-3 pl-4 border-l dark:border-gray-600">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800 dark:text-white">{t('header.user')}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('header.role')}</p>
            </div>
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};