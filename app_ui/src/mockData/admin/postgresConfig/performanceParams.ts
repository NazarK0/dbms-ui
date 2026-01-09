/**
 * Performance configuration parameters
 */

import type { ConfigParam } from './types';

export const performanceParams: ConfigParam[] = [
  {
    name: 'random_page_cost',
    value: '1.1',
    defaultValue: '4.0',
    description: 'Вартість випадкового читання сторінки (для SSD)',
    requiresRestart: false,
    category: 'performance'
  },
  {
    name: 'effective_io_concurrency',
    value: '200',
    defaultValue: '1',
    description: 'Паралельність I/O операцій (для SSD)',
    requiresRestart: false,
    category: 'performance'
  },
  {
    name: 'default_statistics_target',
    value: '100',
    defaultValue: '100',
    description: 'Ціль для збору статистики планувальника',
    requiresRestart: false,
    category: 'performance'
  },
];
