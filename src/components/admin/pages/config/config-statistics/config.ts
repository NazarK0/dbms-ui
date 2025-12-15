import { Settings, CheckCircle, RotateCcw } from 'lucide-react';
import type { StatisticCardConfig } from './types';

/**
 * Configuration for Total Parameters card
 */
export const totalParamsConfig: StatisticCardConfig = {
  icon: Settings,
  gradient: 'from-lime-500 to-green-600',
  title: 'Всього параметрів',
  description: 'Доступні налаштування',
  badgeVariant: 'secondary',
};

/**
 * Configuration for Changed Parameters card
 */
export const changedConfig: StatisticCardConfig = {
  icon: CheckCircle,
  gradient: 'from-yellow-500 to-lime-600',
  title: 'Змінених',
  description: 'Відрізняються від default',
  badgeVariant: 'secondary',
};

/**
 * Configuration for Requires Restart card
 */
export const requiresRestartConfig: StatisticCardConfig = {
  icon: RotateCcw,
  gradient: 'from-yellow-500 to-orange-600',
  title: 'Потрібен restart',
  description: 'Після зміни значення',
  badgeVariant: 'outline',
  borderClassName: 'border-yellow-200',
};
