/**
 * Slow Query Details
 * 
 * Mock data for slow queries with recommendations and impact analysis
 */

import type { SlowQueryDetail } from './types';

export const slowQueryDetails: SlowQueryDetail[] = [
  {
    query: 'SELECT * FROM large_table WHERE unindexed_column = $1',
    avgTime: '2.4с',
    calls: 145,
    recommendation: 'Створіть індекс для unindexed_column',
    impact: 'Висока',
  },
  {
    query: 'SELECT * FROM orders o JOIN users u ON o.user_id = u.id WHERE...',
    avgTime: '1.8с',
    calls: 89,
    recommendation: 'Оптимізуйте JOIN, використовуйте індекси',
    impact: 'Середня',
  },
  {
    query: 'UPDATE inventory SET quantity = quantity - $1 WHERE product_id...',
    avgTime: '950мс',
    calls: 234,
    recommendation: 'Розгляньте використання партіонування',
    impact: 'Середня',
  },
];
