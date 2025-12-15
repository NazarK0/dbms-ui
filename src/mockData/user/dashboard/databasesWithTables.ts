import type { DatabaseWithTables } from './types';

// Databases with Tables - повний список баз даних з вкладеними таблицями для browser
export const databasesWithTables: DatabaseWithTables[] = [
  {
    id: 1,
    name: 'crm_database',
    description: 'CRM система',
    icon: '👥',
    color: 'from-violet-500 to-purple-600',
    tables: [
      { id: 1, name: 'companies', records: 1254, icon: '🏢' },
      { id: 2, name: 'contacts', records: 3421, icon: '👤' },
      { id: 3, name: 'deals', records: 892, icon: '💼' },
      { id: 4, name: 'activities', records: 5678, icon: '📅' },
      { id: 5, name: 'notes', records: 2341, icon: '📝' },
    ],
  },
  {
    id: 2,
    name: 'project_management',
    description: 'Управління проєктами',
    icon: '📊',
    color: 'from-blue-500 to-cyan-600',
    tables: [
      { id: 6, name: 'projects', records: 847, icon: '📊' },
      { id: 7, name: 'tasks', records: 4521, icon: '✅' },
      { id: 8, name: 'milestones', records: 234, icon: '🎯' },
      { id: 9, name: 'team_members', records: 156, icon: '👥' },
      { id: 10, name: 'time_logs', records: 12456, icon: '⏱️' },
    ],
  },
  {
    id: 3,
    name: 'analytics_db',
    description: 'Аналітика',
    icon: '📈',
    color: 'from-indigo-500 to-violet-600',
    tables: [
      { id: 11, name: 'reports', records: 234, icon: '📈' },
      { id: 12, name: 'metrics', records: 567, icon: '📊' },
      { id: 13, name: 'kpis', records: 89, icon: '🎯' },
      { id: 14, name: 'dashboards', records: 45, icon: '📱' },
    ],
  },
  {
    id: 4,
    name: 'ecommerce_db',
    description: 'E-commerce',
    icon: '🛒',
    color: 'from-green-500 to-lime-600',
    tables: [
      { id: 15, name: 'products', records: 8921, icon: '📦' },
      { id: 16, name: 'orders', records: 12456, icon: '🛒' },
      { id: 17, name: 'customers', records: 3421, icon: '👤' },
      { id: 18, name: 'categories', records: 89, icon: '📂' },
      { id: 19, name: 'reviews', records: 2341, icon: '⭐' },
      { id: 20, name: 'inventory', records: 8921, icon: '📊' },
    ],
  },
];
