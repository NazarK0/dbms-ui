/**
 * Quick presets for different PostgreSQL usage scenarios
 */

import type { QuickPreset } from './types';

export const quickPresets: QuickPreset[] = [
  {
    id: 'development',
    name: 'Розробка',
    description: 'Мінімальне споживання ресурсів, детальне логування',
    icon: 'Cpu',
    color: 'from-green-500 to-lime-600',
  },
  {
    id: 'production',
    name: 'Продакшн',
    description: 'Оптимізація для продуктивності та стабільності',
    icon: 'Database',
    color: 'from-yellow-500 to-lime-600',
  },
  {
    id: 'highload',
    name: 'Висока навантаження',
    description: 'Максимальна продуктивність для великих навантажень',
    icon: 'Zap',
    color: 'from-lime-500 to-green-600',
  },
];
