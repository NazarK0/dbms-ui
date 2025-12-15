/**
 * Logging configuration parameters
 */

import type { ConfigParam } from './types';

export const loggingParams: ConfigParam[] = [
  {
    name: 'logging_collector',
    value: 'on',
    defaultValue: 'off',
    description: 'Збір логів у фонові файли',
    requiresRestart: true,
    category: 'logging'
  },
  {
    name: 'log_min_duration_statement',
    value: '1000',
    defaultValue: '-1',
    unit: 'ms',
    description: 'Логувати запити довші за вказаний час',
    requiresRestart: false,
    category: 'logging'
  },
  {
    name: 'log_checkpoints',
    value: 'on',
    defaultValue: 'off',
    description: 'Логувати контрольні точки',
    requiresRestart: false,
    category: 'logging'
  },
  {
    name: 'log_connections',
    value: 'on',
    defaultValue: 'off',
    description: 'Логувати нові підключення',
    requiresRestart: false,
    category: 'logging'
  },
  {
    name: 'log_disconnections',
    value: 'on',
    defaultValue: 'off',
    description: 'Логувати відключення',
    requiresRestart: false,
    category: 'logging'
  },
];
