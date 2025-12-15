import type { DatabaseGroup } from './types';

// Grouped Databases - згруповані бази даних з ролями та останнім доступом
export const groupedDatabases: DatabaseGroup[] = [
  {
    group: 'Production Databases',
    databases: [
      { name: 'crm_database', tables: 24, role: 'Редактор', lastAccess: '5 хв тому' },
      { name: 'ecommerce_db', tables: 32, role: 'Редактор', lastAccess: '1 год тому' },
    ],
  },
  {
    group: 'Analytics & Reports',
    databases: [
      { name: 'analytics_db', tables: 12, role: 'Читач', lastAccess: '2 год тому' },
      { name: 'bi_reports', tables: 8, role: 'Читач', lastAccess: 'вчора' },
    ],
  },
  {
    group: 'Development',
    databases: [
      { name: 'project_management', tables: 18, role: 'Адміністратор', lastAccess: '15 хв тому' },
      { name: 'test_db', tables: 15, role: 'Редактор', lastAccess: '3 год тому' },
    ],
  },
];
