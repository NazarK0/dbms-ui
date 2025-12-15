/**
 * Write-Ahead Logging (WAL) configuration parameters
 */

import type { ConfigParam } from './types';

export const walParams: ConfigParam[] = [
  {
    name: 'wal_level',
    value: 'replica',
    defaultValue: 'replica',
    description: 'Рівень деталізації WAL логів',
    requiresRestart: true,
    category: 'wal'
  },
  {
    name: 'max_wal_size',
    value: '2GB',
    defaultValue: '1GB',
    unit: 'GB',
    description: 'Максимальний розмір WAL між checkpoint',
    requiresRestart: false,
    category: 'wal'
  },
  {
    name: 'min_wal_size',
    value: '512MB',
    defaultValue: '80MB',
    unit: 'MB',
    description: 'Мінімальний розмір WAL',
    requiresRestart: false,
    category: 'wal'
  },
  {
    name: 'wal_buffers',
    value: '16MB',
    defaultValue: '-1',
    unit: 'MB',
    description: 'Буфери для WAL даних',
    requiresRestart: true,
    category: 'wal'
  },
];
