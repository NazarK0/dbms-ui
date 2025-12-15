/**
 * Memory configuration parameters
 */

import type { ConfigParam } from './types';

export const memoryParams: ConfigParam[] = [
  {
    name: 'shared_buffers',
    value: '256MB',
    defaultValue: '128MB',
    unit: 'MB',
    description: 'Обсяг пам\'яті для кешування даних',
    requiresRestart: true,
    category: 'memory'
  },
  {
    name: 'work_mem',
    value: '8MB',
    defaultValue: '4MB',
    unit: 'MB',
    description: 'Пам\'ять для операцій сортування та хешування',
    requiresRestart: false,
    category: 'memory'
  },
  {
    name: 'maintenance_work_mem',
    value: '128MB',
    defaultValue: '64MB',
    unit: 'MB',
    description: 'Пам\'ять для операцій обслуговування (VACUUM, CREATE INDEX)',
    requiresRestart: false,
    category: 'memory'
  },
  {
    name: 'effective_cache_size',
    value: '1GB',
    defaultValue: '4GB',
    unit: 'GB',
    description: 'Оцінка доступної пам\'яті для кешування ОС',
    requiresRestart: false,
    category: 'memory'
  },
];
