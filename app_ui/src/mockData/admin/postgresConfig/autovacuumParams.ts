/**
 * Autovacuum configuration parameters
 */

import type { ConfigParam } from './types';

export const autovacuumParams: ConfigParam[] = [
  {
    name: 'autovacuum',
    value: 'on',
    defaultValue: 'on',
    description: 'Автоматичне очищення (vacuum) таблиць',
    requiresRestart: false,
    category: 'autovacuum'
  },
  {
    name: 'autovacuum_max_workers',
    value: '3',
    defaultValue: '3',
    description: 'Максимальна кількість процесів autovacuum',
    requiresRestart: true,
    category: 'autovacuum'
  },
  {
    name: 'autovacuum_naptime',
    value: '60s',
    defaultValue: '1min',
    description: 'Час між запусками autovacuum',
    requiresRestart: false,
    category: 'autovacuum'
  },
];
