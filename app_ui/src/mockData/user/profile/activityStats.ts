import type { ActivityStat } from './types';

// Activity Statistics - статистика активності користувача
export const activityStats: ActivityStat[] = [
  { label: 'Запитів сьогодні', value: '1,245', change: '+12%', trend: 'up' },
  { label: 'Створено записів', value: '47', change: '+5%', trend: 'up' },
  { label: 'Оновлено записів', value: '123', change: '+8%', trend: 'up' },
  { label: 'Помилок', value: '3', change: '-25%', trend: 'down' },
];
