/**
 * TypeScript type definitions for SystemMonitor components
 */

import type { LucideIcon } from 'lucide-react';

export type ConnectionState = 'активний' | 'очікує' | 'в транзакції' | 'простій';
export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive';

export interface SystemStat {
  label: string;
  value: string;
  percentage: number;
  icon: LucideIcon;
  color: string;
}

export interface DatabaseStat {
  name: string;
  size: string;
  connections: number;
  tps: number;
  cache_hit: number;
}

export interface DatabaseConnection {
  pid: number;
  database: string;
  user: string;
  state: ConnectionState;
  query: string;
  duration: string;
}

export interface SlowQuery {
  query: string;
  duration: string;
  calls: number;
  database: string;
}

export interface SystemMonitorHeaderProps {
  title?: string;
  description?: string;
}

export interface SystemStatsGridProps {
  stats: SystemStat[];
}

export interface SystemStatCardProps {
  stat: SystemStat;
}

export interface DatabaseStatsTableProps {
  databases: DatabaseStat[];
}

export interface DatabaseStatsRowProps {
  database: DatabaseStat;
}

export interface ActiveConnectionsTableProps {
  connections: DatabaseConnection[];
}

export interface ConnectionRowProps {
  connection: DatabaseConnection;
}

export interface SlowQueriesCardProps {
  queries: SlowQuery[];
}

export interface SlowQueryItemProps {
  query: SlowQuery;
  index: number;
}

export interface SystemMetrics {
  cpuUsage: number;
  memoryUsed: string;
  memoryTotal: string;
  activeConnections: number;
  maxConnections: number;
  diskUsed: string;
  diskTotal: string;
}

export interface PerformanceThresholds {
  cpu: {
    warning: number;
    critical: number;
  };
  memory: {
    warning: number;
    critical: number;
  };
  connections: {
    warning: number;
    critical: number;
  };
  disk: {
    warning: number;
    critical: number;
  };
}

export interface ConnectionFilter {
  database?: string;
  user?: string;
  state?: ConnectionState;
  minDuration?: number;
}

export interface SlowQueryFilter {
  database?: string;
  minDuration?: number;
  minCalls?: number;
}

export interface MonitoringConfig {
  refreshInterval: number;
  showSystemStats: boolean;
  showDatabaseStats: boolean;
  showConnections: boolean;
  showSlowQueries: boolean;
  maxSlowQueries: number;
  maxConnections: number;
}

export interface ConnectionSummary {
  total: number;
  active: number;
  idle: number;
  inTransaction: number;
  byDatabase: Record<string, number>;
  byUser: Record<string, number>;
}

export interface DatabasePerformance {
  name: string;
  tps: number;
  cacheHitRatio: number;
  activeQueries: number;
  longRunningQueries: number;
  blockedQueries: number;
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  cpu: 'normal' | 'warning' | 'critical';
  memory: 'normal' | 'warning' | 'critical';
  disk: 'normal' | 'warning' | 'critical';
  connections: 'normal' | 'warning' | 'critical';
  issues: string[];
  recommendations: string[];
}
