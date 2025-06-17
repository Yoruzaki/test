import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
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
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
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