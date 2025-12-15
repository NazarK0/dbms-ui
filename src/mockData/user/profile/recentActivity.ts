import type { RecentActivity } from './types';

// Recent Activity - недавня активність користувача
export const recentActivity: RecentActivity[] = [
  {
    id: 1,
    type: 'update',
    description: 'Оновлено запис у таблиці companies',
    database: 'crm_database',
    table: 'companies',
    timestamp: '5 хвилин тому',
    status: 'success',
  },
  {
    id: 2,
    type: 'create',
    description: 'Створено новий проєкт',
    database: 'project_management',
    table: 'projects',
    timestamp: '12 хвилин тому',
    status: 'success',
  },
  {
    id: 3,
    type: 'export',
    description: 'Експортовано дані таблиці orders',
    database: 'ecommerce_db',
    table: 'orders',
    timestamp: '45 хвилин тому',
    status: 'success',
  },
  {
    id: 4,
    type: 'query',
    description: 'Виконано складний запит до аналітики',
    database: 'analytics_db',
    table: 'reports',
    timestamp: '1 годину тому',
    status: 'warning',
  },
  {
    id: 5,
    type: 'delete',
    description: 'Видалено застарілі записи',
    database: 'crm_database',
    table: 'activities',
    timestamp: '2 години тому',
    status: 'success',
  },
  {
    id: 6,
    type: 'update',
    description: 'Масове оновлення продуктів',
    database: 'ecommerce_db',
    table: 'products',
    timestamp: '3 години тому',
    status: 'error',
  },
];
