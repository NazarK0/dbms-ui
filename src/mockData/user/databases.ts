/**
 * Mock database data for user database browser
 * This represents databases and tables accessible to end users
 */

export interface TableInfo {
  name: string;
  records: number;
  size: string;
  permissions: string[];
  rlsEnabled: boolean;
  description: string;
}

export interface Database {
  id: number;
  name: string;
  description: string;
  tables: TableInfo[];
}

export const userDatabases: Database[] = [
  {
    id: 1,
    name: 'app_production',
    description: 'Production database',
    tables: [
      {
        name: 'users',
        records: 6745,
        size: '2.4 MB',
        permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
        rlsEnabled: true,
        description: 'User accounts and profiles',
      },
      {
        name: 'orders',
        records: 45230,
        size: '18.7 MB',
        permissions: ['SELECT', 'INSERT', 'UPDATE'],
        rlsEnabled: true,
        description: 'Customer orders',
      },
      {
        name: 'products',
        records: 1245,
        size: '850 KB',
        permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
        rlsEnabled: false,
        description: 'Product catalog',
      },
      {
        name: 'audit_logs',
        records: 125430,
        size: '45.2 MB',
        permissions: ['SELECT', 'INSERT'],
        rlsEnabled: true,
        description: 'System audit trail',
      },
      {
        name: 'categories',
        records: 42,
        size: '12 KB',
        permissions: ['SELECT'],
        rlsEnabled: false,
        description: 'Product categories',
      },
      {
        name: 'sessions',
        records: 3450,
        size: '1.2 MB',
        permissions: ['SELECT', 'INSERT', 'DELETE'],
        rlsEnabled: true,
        description: 'User sessions',
      },
    ],
  },
  {
    id: 2,
    name: 'app_staging',
    description: 'Staging environment',
    tables: [
      {
        name: 'users',
        records: 850,
        size: '320 KB',
        permissions: ['SELECT', 'INSERT', 'UPDATE'],
        rlsEnabled: true,
        description: 'Test user accounts',
      },
      {
        name: 'orders',
        records: 5200,
        size: '2.1 MB',
        permissions: ['SELECT', 'INSERT'],
        rlsEnabled: false,
        description: 'Test orders',
      },
      {
        name: 'products',
        records: 145,
        size: '95 KB',
        permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
        rlsEnabled: false,
        description: 'Test products',
      },
    ],
  },
  {
    id: 3,
    name: 'app_analytics',
    description: 'Analytics and reporting',
    tables: [
      {
        name: 'daily_stats',
        records: 2450,
        size: '850 KB',
        permissions: ['SELECT'],
        rlsEnabled: false,
        description: 'Daily statistics',
      },
      {
        name: 'user_events',
        records: 85230,
        size: '28.4 MB',
        permissions: ['SELECT'],
        rlsEnabled: true,
        description: 'User activity events',
      },
      {
        name: 'reports',
        records: 124,
        size: '245 KB',
        permissions: ['SELECT'],
        rlsEnabled: false,
        description: 'Generated reports',
      },
    ],
  },
];
