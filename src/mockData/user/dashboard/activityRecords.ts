import type { ActivityRecord, TableAccess } from './types';

// Activity Records - записи активності користувача
export const activityRecords: ActivityRecord[] = [
  {
    id: 1,
    database: 'crm_database',
    table: 'companies',
    recordId: 'CMP-1247',
    action: 'UPDATE',
    field: 'contact_email',
    timestamp: '5 хвилин тому',
  },
  {
    id: 2,
    database: 'project_management',
    table: 'projects',
    recordId: 'PRJ-8924',
    action: 'CREATE',
    field: 'project_name',
    timestamp: '12 хвилин тому',
  },
  {
    id: 3,
    database: 'analytics_db',
    table: 'reports',
    recordId: 'RPT-2456',
    action: 'UPDATE',
    field: 'report_status',
    timestamp: '1 годину тому',
  },
  {
    id: 4,
    database: 'ecommerce_db',
    table: 'products',
    recordId: 'PRD-5623',
    action: 'UPDATE',
    field: 'price',
    timestamp: '2 години тому',
  },
  {
    id: 5,
    database: 'content_db',
    table: 'articles',
    recordId: 'ART-3421',
    action: 'CREATE',
    field: 'title',
    timestamp: '3 години тому',
  },
];

// Table Access - доступ до таблиць з правами
export const tableAccess: TableAccess[] = [
  {
    id: 1,
    database: 'crm_database',
    table: 'companies',
    records: 1254,
    lastAccess: '5 хвилин тому',
    permissions: ['SELECT', 'INSERT', 'UPDATE'],
  },
  {
    id: 2,
    database: 'project_management',
    table: 'projects',
    records: 847,
    lastAccess: '15 хвилин тому',
    permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
  },
  {
    id: 3,
    database: 'crm_database',
    table: 'customers',
    records: 3421,
    lastAccess: '45 хвилин тому',
    permissions: ['SELECT', 'UPDATE'],
  },
  {
    id: 4,
    database: 'ecommerce_db',
    table: 'orders',
    records: 12456,
    lastAccess: '1 годину тому',
    permissions: ['SELECT', 'INSERT'],
  },
  {
    id: 5,
    database: 'analytics_db',
    table: 'reports',
    records: 234,
    lastAccess: '2 години тому',
    permissions: ['SELECT'],
  },
];
