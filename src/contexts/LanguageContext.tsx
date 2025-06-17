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
    'header.title': 'Système de Gestion Laitière',
    'header.search': 'Rechercher...',
    'header.user': 'Marie Dubois',
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
    
    // Production
    'production.title': 'Gestion de Production',
    'production.newProduction': 'Nouvelle Production',
    'production.exportData': 'Exporter Données',
    'production.productionLines': 'Lignes de Production',
    'production.running': 'En cours',
    'production.paused': 'En pause',
    'production.maintenance': 'Maintenance',
    'production.temperature': 'Température',
    'production.pressure': 'Pression',
    'production.speed': 'Vitesse',
    'production.efficiency': 'Efficacité',
    'production.schedule': 'Planning Production',
    'production.completed': 'Terminé',
    'production.inProgress': 'En cours',
    'production.planned': 'Planifié',
    
    // Inventory
    'inventory.title': 'Gestion des Stocks',
    'inventory.addItem': 'Ajouter Article',
    'inventory.fullInventory': 'Inventaire Complet',
    'inventory.totalItems': 'Total Articles',
    'inventory.lowStock': 'Stock Faible',
    'inventory.totalValue': 'Valeur Totale',
    'inventory.lastUpdate': 'Dernière MAJ',
    'inventory.all': 'Tous',
    'inventory.rawMaterials': 'Matières Premières',
    'inventory.finishedProducts': 'Produits Finis',
    'inventory.packaging': 'Emballages',
    'inventory.searchItem': 'Rechercher un article...',
    'inventory.normal': 'Normal',
    'inventory.high': 'Stock Élevé',
    'inventory.low': 'Stock Faible',
    
    // Quality Control
    'quality.title': 'Contrôle Qualité',
    'quality.newTest': 'Nouveau Test',
    'quality.qualityReport': 'Rapport Qualité',
    'quality.totalTests': 'Tests Totaux',
    'quality.compliant': 'Conformes',
    'quality.nonCompliant': 'Non Conformes',
    'quality.pending': 'En Attente',
    'quality.microbiological': 'Microbiologique',
    'quality.physicochemical': 'Physico-chimique',
    'quality.sensory': 'Sensoriel',
    'quality.allTests': 'Tous les Tests',
    'quality.viewReport': 'Voir Rapport',
    'quality.validateResults': 'Valider Résultats',
    
    // Orders
    'orders.title': 'Gestion des Commandes',
    'orders.newOrder': 'Nouvelle Commande',
    'orders.export': 'Exporter',
    'orders.totalOrders': 'Total Commandes',
    'orders.revenue': 'Chiffre d\'Affaires',
    'orders.pending': 'En Attente',
    'orders.urgent': 'Urgentes',
    'orders.all': 'Toutes',
    'orders.processing': 'En Préparation',
    'orders.shipped': 'Expédiées',
    'orders.delivered': 'Livrées',
    'orders.viewDetails': 'Voir Détails',
    'orders.processOrder': 'Traiter Commande',
    'orders.markShipped': 'Marquer Expédiée',
    
    // Reports
    'reports.title': 'Rapports et Analyses',
    'reports.exportPDF': 'Exporter PDF',
    'reports.scheduleReport': 'Planifier Rapport',
    'reports.production': 'Production',
    'reports.sales': 'Ventes',
    'reports.inventory': 'Inventaire',
    'reports.quality': 'Qualité',
    'reports.thisWeek': 'Cette Semaine',
    'reports.thisMonth': 'Ce Mois',
    'reports.thisQuarter': 'Ce Trimestre',
    'reports.thisYear': 'Cette Année',
    
    // Settings
    'settings.title': 'Paramètres Système',
    'settings.save': 'Sauvegarder',
    'settings.general': 'Général',
    'settings.users': 'Utilisateurs',
    'settings.notifications': 'Notifications',
    'settings.security': 'Sécurité',
    'settings.system': 'Système',
    'settings.database': 'Base de Données',
    
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
    'header.title': 'Dairy Management System',
    'header.search': 'Search...',
    'header.user': 'Marie Dubois',
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
    
    // Production
    'production.title': 'Production Management',
    'production.newProduction': 'New Production',
    'production.exportData': 'Export Data',
    'production.productionLines': 'Production Lines',
    'production.running': 'Running',
    'production.paused': 'Paused',
    'production.maintenance': 'Maintenance',
    'production.temperature': 'Temperature',
    'production.pressure': 'Pressure',
    'production.speed': 'Speed',
    'production.efficiency': 'Efficiency',
    'production.schedule': 'Production Schedule',
    'production.completed': 'Completed',
    'production.inProgress': 'In Progress',
    'production.planned': 'Planned',
    
    // Inventory
    'inventory.title': 'Inventory Management',
    'inventory.addItem': 'Add Item',
    'inventory.fullInventory': 'Full Inventory',
    'inventory.totalItems': 'Total Items',
    'inventory.lowStock': 'Low Stock',
    'inventory.totalValue': 'Total Value',
    'inventory.lastUpdate': 'Last Update',
    'inventory.all': 'All',
    'inventory.rawMaterials': 'Raw Materials',
    'inventory.finishedProducts': 'Finished Products',
    'inventory.packaging': 'Packaging',
    'inventory.searchItem': 'Search item...',
    'inventory.normal': 'Normal',
    'inventory.high': 'High Stock',
    'inventory.low': 'Low Stock',
    
    // Quality Control
    'quality.title': 'Quality Control',
    'quality.newTest': 'New Test',
    'quality.qualityReport': 'Quality Report',
    'quality.totalTests': 'Total Tests',
    'quality.compliant': 'Compliant',
    'quality.nonCompliant': 'Non-Compliant',
    'quality.pending': 'Pending',
    'quality.microbiological': 'Microbiological',
    'quality.physicochemical': 'Physicochemical',
    'quality.sensory': 'Sensory',
    'quality.allTests': 'All Tests',
    'quality.viewReport': 'View Report',
    'quality.validateResults': 'Validate Results',
    
    // Orders
    'orders.title': 'Order Management',
    'orders.newOrder': 'New Order',
    'orders.export': 'Export',
    'orders.totalOrders': 'Total Orders',
    'orders.revenue': 'Revenue',
    'orders.pending': 'Pending',
    'orders.urgent': 'Urgent',
    'orders.all': 'All',
    'orders.processing': 'Processing',
    'orders.shipped': 'Shipped',
    'orders.delivered': 'Delivered',
    'orders.viewDetails': 'View Details',
    'orders.processOrder': 'Process Order',
    'orders.markShipped': 'Mark Shipped',
    
    // Reports
    'reports.title': 'Reports & Analytics',
    'reports.exportPDF': 'Export PDF',
    'reports.scheduleReport': 'Schedule Report',
    'reports.production': 'Production',
    'reports.sales': 'Sales',
    'reports.inventory': 'Inventory',
    'reports.quality': 'Quality',
    'reports.thisWeek': 'This Week',
    'reports.thisMonth': 'This Month',
    'reports.thisQuarter': 'This Quarter',
    'reports.thisYear': 'This Year',
    
    // Settings
    'settings.title': 'System Settings',
    'settings.save': 'Save',
    'settings.general': 'General',
    'settings.users': 'Users',
    'settings.notifications': 'Notifications',
    'settings.security': 'Security',
    'settings.system': 'System',
    'settings.database': 'Database',
    
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
    'header.title': 'نظام إدارة مصنع الألبان',
    'header.search': 'بحث...',
    'header.user': 'مريم دوبوا',
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
    
    // Production
    'production.title': 'إدارة الإنتاج',
    'production.newProduction': 'إنتاج جديد',
    'production.exportData': 'تصدير البيانات',
    'production.productionLines': 'خطوط الإنتاج',
    'production.running': 'قيد التشغيل',
    'production.paused': 'متوقف مؤقتاً',
    'production.maintenance': 'صيانة',
    'production.temperature': 'درجة الحرارة',
    'production.pressure': 'الضغط',
    'production.speed': 'السرعة',
    'production.efficiency': 'الكفاءة',
    'production.schedule': 'جدول الإنتاج',
    'production.completed': 'مكتمل',
    'production.inProgress': 'قيد التنفيذ',
    'production.planned': 'مخطط',
    
    // Inventory
    'inventory.title': 'إدارة المخزون',
    'inventory.addItem': 'إضافة عنصر',
    'inventory.fullInventory': 'جرد كامل',
    'inventory.totalItems': 'إجمالي العناصر',
    'inventory.lowStock': 'مخزون منخفض',
    'inventory.totalValue': 'القيمة الإجمالية',
    'inventory.lastUpdate': 'آخر تحديث',
    'inventory.all': 'الكل',
    'inventory.rawMaterials': 'المواد الخام',
    'inventory.finishedProducts': 'المنتجات النهائية',
    'inventory.packaging': 'التعبئة والتغليف',
    'inventory.searchItem': 'البحث عن عنصر...',
    'inventory.normal': 'عادي',
    'inventory.high': 'مخزون عالي',
    'inventory.low': 'مخزون منخفض',
    
    // Quality Control
    'quality.title': 'مراقبة الجودة',
    'quality.newTest': 'اختبار جديد',
    'quality.qualityReport': 'تقرير الجودة',
    'quality.totalTests': 'إجمالي الاختبارات',
    'quality.compliant': 'مطابق',
    'quality.nonCompliant': 'غير مطابق',
    'quality.pending': 'في الانتظار',
    'quality.microbiological': 'ميكروبيولوجي',
    'quality.physicochemical': 'فيزيائي كيميائي',
    'quality.sensory': 'حسي',
    'quality.allTests': 'جميع الاختبارات',
    'quality.viewReport': 'عرض التقرير',
    'quality.validateResults': 'التحقق من النتائج',
    
    // Orders
    'orders.title': 'إدارة الطلبات',
    'orders.newOrder': 'طلب جديد',
    'orders.export': 'تصدير',
    'orders.totalOrders': 'إجمالي الطلبات',
    'orders.revenue': 'الإيرادات',
    'orders.pending': 'في الانتظار',
    'orders.urgent': 'عاجل',
    'orders.all': 'الكل',
    'orders.processing': 'قيد المعالجة',
    'orders.shipped': 'تم الشحن',
    'orders.delivered': 'تم التسليم',
    'orders.viewDetails': 'عرض التفاصيل',
    'orders.processOrder': 'معالجة الطلب',
    'orders.markShipped': 'تحديد كمشحون',
    
    // Reports
    'reports.title': 'التقارير والتحليلات',
    'reports.exportPDF': 'تصدير PDF',
    'reports.scheduleReport': 'جدولة التقرير',
    'reports.production': 'الإنتاج',
    'reports.sales': 'المبيعات',
    'reports.inventory': 'المخزون',
    'reports.quality': 'الجودة',
    'reports.thisWeek': 'هذا الأسبوع',
    'reports.thisMonth': 'هذا الشهر',
    'reports.thisQuarter': 'هذا الربع',
    'reports.thisYear': 'هذا العام',
    
    // Settings
    'settings.title': 'إعدادات النظام',
    'settings.save': 'حفظ',
    'settings.general': 'عام',
    'settings.users': 'المستخدمون',
    'settings.notifications': 'الإشعارات',
    'settings.security': 'الأمان',
    'settings.system': 'النظام',
    'settings.database': 'قاعدة البيانات',
    
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
  const [language, setLanguage] = useState<Language>('fr');

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