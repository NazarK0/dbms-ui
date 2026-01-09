import type { Database } from './types';

// Analytics Database - аналітика та звітність
export const analyticsDatabase: Database = {
  id: 3,
  name: 'analytics_db',
  description: 'Аналітика та звітність',
  tables: [
    {
      name: 'reports',
      records: 234,
      size: '1.8 MB',
      permissions: ['SELECT'],
      rlsEnabled: false,
      description: 'Згенеровані звіти',
    },
    {
      name: 'metrics',
      records: 567,
      size: '950 KB',
      permissions: ['SELECT'],
      rlsEnabled: false,
      description: 'Метрики системи',
    },
    {
      name: 'kpis',
      records: 89,
      size: '245 KB',
      permissions: ['SELECT'],
      rlsEnabled: false,
      description: 'Ключові показники',
    },
    {
      name: 'dashboards',
      records: 45,
      size: '180 KB',
      permissions: ['SELECT'],
      rlsEnabled: false,
      description: 'Аналітичні дашборди',
    },
    {
      name: 'daily_stats',
      records: 2450,
      size: '3.2 MB',
      permissions: ['SELECT'],
      rlsEnabled: false,
      description: 'Щоденна статистика',
    },
    {
      name: 'user_events',
      records: 85230,
      size: '28.4 MB',
      permissions: ['SELECT'],
      rlsEnabled: true,
      description: 'Події користувачів',
    },
  ],
};
