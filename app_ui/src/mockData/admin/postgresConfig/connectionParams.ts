/**
 * Connection configuration parameters
 */

import type { ConfigParam } from './types';

export const connectionParams: ConfigParam[] = [
  {
    name: 'max_connections',
    value: '200',
    defaultValue: '100',
    description: 'Максимальна кількість одночасних підключень',
    requiresRestart: true,
    category: 'connections'
  },
  {
    name: 'superuser_reserved_connections',
    value: '5',
    defaultValue: '3',
    description: 'Резервні підключення для суперкористувачів',
    requiresRestart: true,
    category: 'connections'
  },
  {
    name: 'idle_in_transaction_session_timeout',
    value: '30000',
    defaultValue: '0',
    unit: 'ms',
    description: 'Таймаут для неактивних транзакцій',
    requiresRestart: false,
    category: 'connections'
  },
];
