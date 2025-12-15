/**
 * Connection Limit Presets
 * 
 * Predefined connection limit options for database creation
 */

import type { ConnectionLimitPreset } from './types';

export const connectionLimitPresets: ConnectionLimitPreset[] = [
  {
    value: -1,
    label: 'Необмежено',
    description: 'Без обмежень підключень',
    recommended: 'Для системних БД',
  },
  {
    value: 10,
    label: '10 підключень',
    description: 'Для малих додатків',
  },
  {
    value: 50,
    label: '50 підключень',
    description: 'Для середніх додатків',
    recommended: 'Рекомендовано',
  },
  {
    value: 100,
    label: '100 підключень',
    description: 'Для великих додатків',
  },
  {
    value: 200,
    label: '200 підключень',
    description: 'Для highload систем',
  },
];
