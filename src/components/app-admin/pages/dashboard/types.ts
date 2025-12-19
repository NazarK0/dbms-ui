/**
 * TypeScript type definitions for Dashboard components
 */

import type { LucideIcon } from 'lucide-react';

export type TrendDirection = 'up' | 'down';
export type ActivityType = 'success' | 'info' | 'warning' | 'error';
export type DashboardCategory = 'stats' | 'performance' | 'activity';

export interface StatData {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  change: string;
  trend: TrendDirection;
}

export interface StatCardProps extends StatData {
  visible?: boolean;
}

export interface ActivityData {
  action: string;
  details: string;
  user: string;
  time: string;
  type: ActivityType;
}

export interface ConnectionData {
  database: string;
  user: string;
  state: string;
  duration: string;
  queries: number;
}

export interface PerformanceMetric {
  label: string;
  value: number;
  color: string;
}

export interface DashboardCard {
  id: string;
  name: string;
  description: string;
  visible: boolean;
  category: DashboardCategory;
}

export interface DashboardHeaderProps {
  visibleCount: number;
  totalCount: number;
  onCustomizeClick: () => void;
}

export interface CustomizeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  visibleCards: DashboardCard[];
  onToggleVisibility: (cardId: string) => void;
}

export interface StatsGridProps {
  stats: StatData[];
  isCardVisible: (id: string) => boolean;
}

export interface PerformanceOverviewProps {
  metrics: PerformanceMetric[];
  visible: boolean;
}

export interface RecentActivityCardProps {
  activities: ActivityData[];
  visible: boolean;
}

export interface ActiveConnectionsCardProps {
  connections: ConnectionData[];
  visible: boolean;
}

export interface CategoryConfig {
  id: DashboardCategory;
  label: string;
  cards: DashboardCard[];
}

export interface DashboardStats {
  totalDatabases: number;
  totalAdmins: number;
  totalUsers: number;
  totalTables: number;
  storageUsed: string;
}

export interface DashboardFilters {
  period?: 'hour' | 'day' | 'week' | 'month';
  category?: DashboardCategory;
  searchTerm?: string;
}

export interface MetricThreshold {
  warning: number;
  critical: number;
}

export interface PerformanceThresholds {
  cpu: MetricThreshold;
  memory: MetricThreshold;
  diskIO: MetricThreshold;
  network: MetricThreshold;
}
