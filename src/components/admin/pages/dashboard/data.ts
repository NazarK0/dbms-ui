/**
 * Mock data and default configurations for Dashboard components
 */

import type { DashboardCard } from './types';

export const defaultDashboardCards: DashboardCard[] = [
  {
    id: 'databases',
    name: 'Всього баз даних',
    description: 'Кількість баз даних у системі',
    visible: true,
    category: 'stats',
  },
  {
    id: 'admins',
    name: 'Адміністраторів',
    description: 'Кількість адміністраторів системи',
    visible: true,
    category: 'stats',
  },
  {
    id: 'users',
    name: 'Користувачів',
    description: 'Кількість звичайних користувачів',
    visible: true,
    category: 'stats',
  },
  {
    id: 'tables',
    name: 'Всього таблиць',
    description: 'Загальна кількість таблиць',
    visible: true,
    category: 'stats',
  },
  {
    id: 'storage',
    name: 'Використано сховища',
    description: 'Використаний дисковий простір',
    visible: true,
    category: 'stats',
  },
  {
    id: 'performance',
    name: 'Огляд продуктивності',
    description: 'Ключові метрики продуктивності',
    visible: true,
    category: 'performance',
  },
  {
    id: 'activity',
    name: 'Остання активність',
    description: 'Нещодавні події системи',
    visible: true,
    category: 'activity',
  },
  {
    id: 'connections',
    name: "Активні з'єднання",
    description: 'Поточні підключення',
    visible: true,
    category: 'activity',
  },
];

export const categoryLabels = {
  stats: 'Статистика',
  performance: 'Продуктивність',
  activity: 'Активність',
};

export const activityTypeColors = {
  success: 'bg-green-100 text-green-700',
  info: 'bg-blue-100 text-blue-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
};

export const activityTypeIcons = {
  success: 'CheckCircle2',
  info: 'Info',
  warning: 'AlertTriangle',
  error: 'XCircle',
};

export const connectionStateColors = {
  активний: 'bg-green-100 text-green-700',
  очікує: 'bg-yellow-100 text-yellow-700',
  простій: 'bg-slate-100 text-slate-700',
  помилка: 'bg-red-100 text-red-700',
};

export const performanceThresholds = {
  cpu: { warning: 70, critical: 90 },
  memory: { warning: 75, critical: 90 },
  diskIO: { warning: 80, critical: 95 },
  network: { warning: 70, critical: 85 },
};

export const refreshIntervals = {
  stats: 30000, // 30 seconds
  performance: 5000, // 5 seconds
  activity: 10000, // 10 seconds
  connections: 15000, // 15 seconds
};

export const defaultDashboardLayout = {
  statsGridColumns: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
  performanceColumns: 'grid-cols-1 md:grid-cols-4',
  activityColumns: 'grid-cols-1 lg:grid-cols-2',
};
