/**
 * Saved configuration profiles
 */

import type { ConfigProfile } from './types';

export const savedProfiles: ConfigProfile[] = [
  {
    id: '1',
    name: 'Production Optimized',
    description: 'Оптимізовано для продакшн серверів',
    createdAt: '2024-12-10 15:30',
    parametersCount: 22,
  },
  {
    id: '2',
    name: 'Development Setup',
    description: 'Налаштування для розробки',
    createdAt: '2024-12-08 09:15',
    parametersCount: 22,
  },
  {
    id: '3',
    name: 'High Load Server',
    description: 'Конфігурація для високого навантаження',
    createdAt: '2024-12-05 18:45',
    parametersCount: 22,
  },
];
