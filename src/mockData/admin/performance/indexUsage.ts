/**
 * Index Usage Statistics
 * 
 * Mock data for index usage analysis and efficiency metrics
 */

import type { IndexUsage } from './types';

export const indexUsage: IndexUsage[] = [
  {
    table: 'orders',
    index: 'idx_orders_user_id',
    size: '45 МБ',
    scans: 15234,
    rowsRead: 245678,
    usage: 98,
  },
  {
    table: 'orders',
    index: 'idx_orders_status',
    size: '23 МБ',
    scans: 8945,
    rowsRead: 156789,
    usage: 87,
  },
  {
    table: 'users',
    index: 'idx_users_email',
    size: '12 МБ',
    scans: 23456,
    rowsRead: 23456,
    usage: 100,
  },
  {
    table: 'products',
    index: 'idx_products_category',
    size: '8 МБ',
    scans: 12456,
    rowsRead: 67890,
    usage: 67,
  },
  {
    table: 'sessions',
    index: 'idx_sessions_expires',
    size: '34 МБ',
    scans: 234,
    rowsRead: 156789,
    usage: 8,
  },
];
