/**
 * Admin databases (PostgreSQL system databases)
 */

import type { AdminDatabase } from './types';

export const adminDatabases: AdminDatabase[] = [
  {
    name: 'postgres',
    description: 'Системна БД для підключень та управління',
    size: '8.2 МБ',
    tables: 5,
    encoding: 'UTF8',
    collation: 'uk_UA.UTF-8',
    type: 'admin',
  },
];
