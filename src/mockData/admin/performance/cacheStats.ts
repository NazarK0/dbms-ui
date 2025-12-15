/**
 * Cache Statistics
 * 
 * Mock data for database cache performance metrics
 */

import type { CacheStat } from './types';

export const cacheStats: CacheStat[] = [
  { metric: 'Коефіцієнт попадань', value: '98.2%', trend: 'up', percentage: 98.2 },
  { metric: 'Блоки з диску', value: '1.2M', trend: 'down', percentage: 45 },
  { metric: 'Блоки з кешу', value: '58.4M', trend: 'up', percentage: 92 },
  { metric: 'Блоки записані', value: '850K', trend: 'stable', percentage: 68 },
];
