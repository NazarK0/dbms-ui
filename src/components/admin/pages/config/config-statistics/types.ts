import type { LucideIcon } from 'lucide-react';

/**
 * Configuration for a single statistic card
 */
export interface StatisticCardConfig {
  icon: LucideIcon;
  gradient: string;
  title: string;
  description: string;
  badgeVariant?: 'default' | 'secondary' | 'outline' | 'destructive';
  borderClassName?: string;
}

/**
 * Props for StatisticCard component
 */
export interface StatisticCardProps {
  value: number;
  config: StatisticCardConfig;
}

/**
 * Props for ConfigStatistics component
 */
export interface ConfigStatisticsProps {
  totalParams: number;
  changed: number;
  requiresRestart: number;
}
