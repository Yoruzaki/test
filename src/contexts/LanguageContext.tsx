import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de Bord',
    'nav.production': 'Production',
    'nav.inventory': 'Inventaire',
    'nav.quality': 'Qualité',
    'nav.orders': 'Commandes',
    'nav.reports': 'Rapports',
    'nav.settings': 'Paramètres',
    
    // Header
    'header.title': 'Système de Gestion Laitière Algérienne',
    'header.search': 'Rechercher...',
    'header.user': 'Amina Benali',
    'header.role': 'Gestionnaire Production',
    
    // Dashboard
    'dashboard.title': 'Tableau de Bord',
    'dashboard.updated': 'Mis à jour',
    'dashboard.dailyProduction': 'Production Quotidienne',
    'dashboard.activeOrders': 'Commandes Actives',
    'dashboard.qualityCompliance': 'Qualité Conforme',
    'dashboard.revenue': 'Chiffre d\'Affaires',
    'dashboard.vsYesterday': 'vs hier',
    'dashboard.todayProduction': 'Production du Jour',
    'dashboard.recentActivity': 'Activité Récente',
    'dashboard.quickActions': 'Actions Rapides',
    'dashboard.newProduction': 'Nouvelle Production',
    'dashboard.manageStock': 'Gérer Stock',
    'dashboard.qualityControl': 'Contrôle Qualité',
    'dashboard.manageTeams': 'Gérer Équipes',
    
    // Common
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.cancel': 'Annuler',
    'common.confirm': 'Confirmer',
    'common.close': 'Fermer',
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.warning': 'Attention',
    'common.info': 'Information',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.production': 'Production',
    'nav.inventory': 'Inventory',
    'nav.quality': 'Quality',
    'nav.orders': 'Orders',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    
    // Header
    'header.title': 'Algerian Dairy Management System',
    'header.search': 'Search...',
    'header.user': 'Amina Benali',
    'header.role': 'Production Manager',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.updated': 'Updated',
    'dashboard.dailyProduction': 'Daily Production',
    'dashboard.activeOrders': 'Active Orders',
    'dashboard.qualityCompliance': 'Quality Compliance',
    'dashboard.revenue': 'Revenue',
    'dashboard.vsYesterday': 'vs yesterday',
    'dashboard.todayProduction': 'Today\'s Production',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.newProduction': 'New Production',
    'dashboard.manageStock': 'Manage Stock',
    'dashboard.qualityControl': 'Quality Control',
    'dashboard.manageTeams': 'Manage Teams',
    
    // Common
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Information',
  },
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.production': 'الإنتاج',
    'nav.inventory': 'المخزون',
    'nav.quality': 'الجودة',
    'nav.orders': 'الطلبات',
    'nav.reports': 'التقارير',
    'nav.settings': 'الإعدادات',
    
    // Header
    'header.title': 'نظام إدارة مصنع الألبان الجزائري',
    'header.search': 'بحث...',
    'header.user': 'أمينة بن علي',
    'header.role': 'مدير الإنتاج',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.updated': 'آخر تحديث',
    'dashboard.dailyProduction': 'الإنتاج اليومي',
    'dashboard.activeOrders': 'الطلبات النشطة',
    'dashboard.qualityCompliance': 'مطابقة الجودة',
    'dashboard.revenue': 'الإيرادات',
    'dashboard.vsYesterday': 'مقارنة بالأمس',
    'dashboard.todayProduction': 'إنتاج اليوم',
    'dashboard.recentActivity': 'النشاط الأخير',
    'dashboard.quickActions': 'إجراءات سريعة',
    'dashboard.newProduction': 'إنتاج جديد',
    'dashboard.manageStock': 'إدارة المخزون',
    'dashboard.qualityControl': 'مراقبة الجودة',
    'dashboard.manageTeams': 'إدارة الفرق',
    
    // Common
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.cancel': 'إلغاء',
    'common.confirm': 'تأكيد',
    'common.close': 'إغلاق',
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.warning': 'تحذير',
    'common.info': 'معلومات',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['fr', 'en', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    
    // Set document direction and language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Add/remove Arabic font class
    if (language === 'ar') {
      document.documentElement.classList.add('font-arabic');
    } else {
      document.documentElement.classList.remove('font-arabic');
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
</LanguageContext.Provider>

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};