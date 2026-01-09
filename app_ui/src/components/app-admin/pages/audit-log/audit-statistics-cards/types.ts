import type { LucideIcon } from 'lucide-react';

/**
 * Badge variant types from shadcn/ui
 */
export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

/**
 * Gradient color configuration
 */
export interface GradientConfig {
  from: string;
  to: string;
}

/**
 * Statistics card configuration
 */
export interface StatisticCardConfig {
  key: string;
  icon: LucideIcon;
  gradient: GradientConfig;
  badgeVariant: BadgeVariant;
  title: string;
  description: string;
  borderColor?: string;
}

/**
 * Props for StatisticCard component
 */
export interface StatisticCardProps {
  config: StatisticCardConfig;
  value: number;
}
