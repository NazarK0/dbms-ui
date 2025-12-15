import { History, Calendar, Activity } from 'lucide-react';
import type { StatisticCardConfig } from './types';

/**
 * Configuration for all statistic cards
 */
export const statisticCardsConfig: StatisticCardConfig[] = [
  {
    key: 'total',
    icon: History,
    gradient: {
      from: 'from-lime-500',
      to: 'to-green-600',
    },
    badgeVariant: 'secondary',
    title: 'Всього подій',
    description: 'За весь період',
  },
  {
    key: 'today',
    icon: Calendar,
    gradient: {
      from: 'from-yellow-500',
      to: 'to-lime-600',
    },
    badgeVariant: 'secondary',
    title: 'Сьогодні',
    description: 'Події за 12 грудня',
  },
  {
    key: 'success',
    icon: Activity,
    gradient: {
      from: 'from-green-500',
      to: 'to-lime-600',
    },
    badgeVariant: 'default',
    title: 'Успішних',
    description: 'Виконано без помилок',
  },
  {
    key: 'failed',
    icon: Activity,
    gradient: {
      from: 'from-red-500',
      to: 'to-red-600',
    },
    badgeVariant: 'destructive',
    title: 'Помилкових',
    description: 'Виконано з помилками',
    borderColor: 'border-red-200',
  },
] as const;
