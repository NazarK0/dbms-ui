import type { AccessedTable } from './types';

// Last Accessed Tables - останні таблиці до яких отримав доступ користувач
export const lastAccessedTables: AccessedTable[] = [
  {
    id: 1,
    name: 'companies',
    database: 'crm_database',
    records: 1254,
    lastAccessed: '5 хвилин тому',
    accessType: 'write',
    icon: '🏢',
  },
  {
    id: 2,
    name: 'projects',
    database: 'project_management',
    records: 847,
    lastAccessed: '15 хвилин тому',
    accessType: 'read',
    icon: '📊',
  },
  {
    id: 3,
    name: 'customers',
    database: 'crm_database',
    records: 3421,
    lastAccessed: '45 хвилин тому',
    accessType: 'read',
    icon: '👥',
  },
  {
    id: 4,
    name: 'orders',
    database: 'ecommerce_db',
    records: 12456,
    lastAccessed: '1 годину тому',
    accessType: 'write',
    icon: '🛒',
  },
  {
    id: 5,
    name: 'reports',
    database: 'analytics_db',
    records: 234,
    lastAccessed: '2 години тому',
    accessType: 'read',
    icon: '📈',
  },
];
