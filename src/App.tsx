import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Production } from './components/Production';
import { Inventory } from './components/Inventory';
import { QualityControl } from './components/QualityControl';
import { Orders } from './components/Orders';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { useLanguage } from './contexts/LanguageContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isRTL } = useLanguage();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'production':
        return <Production />;
      case 'inventory':
        return <Inventory />;
      case 'quality':
        return <QualityControl />;
      case 'orders':
        return <Orders />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-200" dir={isRTL ? 'rtl' : 'ltr'}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className={`flex-1 transition-all duration-300 ${
        isRTL 
          ? (sidebarOpen ? 'mr-64' : 'mr-16')
          : (sidebarOpen ? 'ml-64' : 'ml-16')
      } ${
        // Responsive adjustments
        sidebarOpen 
          ? 'lg:ml-64 lg:mr-0' 
          : 'lg:ml-16 lg:mr-0'
      }`}>
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="p-3 sm:p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;