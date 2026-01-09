import type { DatabaseAccess } from './types';

// Database Access Permissions - права доступу користувача до баз даних
export const databaseAccessPermissions: DatabaseAccess[] = [
  {
    database: 'crm_database',
    permissions: { read: true, write: true, delete: true, export: true },
    tables: ['companies', 'contacts', 'deals', 'activities', 'notes'],
    grantedBy: 'Марія Коваленко',
    grantedDate: '1 березня 2024',
  },
  {
    database: 'project_management',
    permissions: { read: true, write: true, delete: true, export: true },
    tables: ['projects', 'tasks', 'milestones', 'team_members', 'time_logs'],
    grantedBy: 'Олексій Шевченко',
    grantedDate: '15 лютого 2024',
  },
  {
    database: 'analytics_db',
    permissions: { read: true, write: false, delete: false, export: true },
    tables: ['reports', 'metrics', 'kpis', 'dashboards'],
    grantedBy: 'Анна Мельник',
    grantedDate: '20 січня 2024',
  },
  {
    database: 'ecommerce_db',
    permissions: { read: true, write: true, delete: false, export: true },
    tables: ['products', 'orders', 'customers', 'categories', 'reviews', 'inventory'],
    grantedBy: 'Дмитро Коваль',
    grantedDate: '10 січня 2024',
  },
];
