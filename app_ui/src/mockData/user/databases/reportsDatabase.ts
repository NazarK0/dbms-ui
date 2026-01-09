import type { Database } from './types';

// Reports Database - система звітності
export const reportsDatabase: Database = {
  id: 6,
  name: 'reports_db',
  description: 'Система звітності',
  tables: [
    {
      name: 'financial_reports',
      records: 234,
      size: '1.2 MB',
      permissions: ['SELECT'],
      rlsEnabled: true,
      description: 'Фінансові звіти',
    },
    {
      name: 'sales_reports',
      records: 456,
      size: '2.1 MB',
      permissions: ['SELECT'],
      rlsEnabled: true,
      description: 'Звіти по продажам',
    },
    {
      name: 'inventory_reports',
      records: 189,
      size: '890 KB',
      permissions: ['SELECT'],
      rlsEnabled: false,
      description: 'Звіти по складу',
    },
    {
      name: 'customer_reports',
      records: 345,
      size: '1.4 MB',
      permissions: ['SELECT'],
      rlsEnabled: true,
      description: 'Звіти по клієнтам',
    },
    {
      name: 'performance_reports',
      records: 123,
      size: '680 KB',
      permissions: ['SELECT'],
      rlsEnabled: false,
      description: 'Звіти продуктивності',
    },
    {
      name: 'scheduled_reports',
      records: 67,
      size: '340 KB',
      permissions: ['SELECT'],
      rlsEnabled: false,
      description: 'Заплановані звіти',
    },
  ],
};
