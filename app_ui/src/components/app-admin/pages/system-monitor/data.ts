/**
 * Configuration data and constants for SystemMonitor components
 */

import type { PerformanceThresholds, MonitoringConfig, ConnectionState } from './types';

export const performanceThresholds: PerformanceThresholds = {
  cpu: {
    warning: 70,
    critical: 90,
  },
  memory: {
    warning: 75,
    critical: 90,
  },
  connections: {
    warning: 70,
    critical: 85,
  },
  disk: {
    warning: 80,
    critical: 90,
  },
};

export const defaultMonitoringConfig: MonitoringConfig = {
  refreshInterval: 5000, // 5 seconds
  showSystemStats: true,
  showDatabaseStats: true,
  showConnections: true,
  showSlowQueries: true,
  maxSlowQueries: 10,
  maxConnections: 50,
};

export const connectionStateColors: Record<ConnectionState, BadgeVariant> = {
  'активний': 'default',
  'очікує': 'secondary',
  'в транзакції': 'outline',
  'простій': 'secondary',
};

export const connectionStateBadgeVariants: Record<ConnectionState, string> = {
  'активний': 'default',
  'очікує': 'secondary',
  'в транзакції': 'outline',
  'простій': 'secondary',
};

export const systemStatLabels = {
  cpu: 'Використання CPU',
  memory: "Використання пам'яті",
  connections: "Активні з'єднання",
  disk: 'Використання диску',
};

export const databaseTableHeaders = [
  { key: 'name', label: 'База даних' },
  { key: 'size', label: 'Розмір' },
  { key: 'connections', label: "З'єднання" },
  { key: 'tps', label: 'TPS' },
  { key: 'cache_hit', label: 'Коеф. попадань кешу' },
];

export const connectionTableHeaders = [
  { key: 'pid', label: 'PID' },
  { key: 'database', label: 'База даних' },
  { key: 'user', label: 'Користувач' },
  { key: 'state', label: 'Стан' },
  { key: 'query', label: 'Запит' },
  { key: 'duration', label: 'Тривалість' },
];

export const slowQueryThresholds = {
  normal: 0.5, // 500ms
  warning: 1.0, // 1s
  critical: 2.0, // 2s
};

export const cacheHitThresholds = {
  excellent: 98,
  good: 95,
  acceptable: 90,
  poor: 85,
};

export const tpsCategories = {
  low: 100,
  medium: 300,
  high: 500,
  veryHigh: 1000,
};

export const refreshIntervals = {
  systemStats: 5000, // 5 seconds
  databaseStats: 10000, // 10 seconds
  connections: 3000, // 3 seconds
  slowQueries: 30000, // 30 seconds
};

export const monitoringColors = {
  success: 'text-green-600',
  warning: 'text-yellow-600',
  critical: 'text-red-600',
  info: 'text-blue-600',
  neutral: 'text-slate-600',
};

export const statCardLayouts = {
  gridColumns: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  iconSize: 'w-6 h-6',
  iconContainerSize: 'w-12 h-12',
  progressHeight: 'h-2',
};

export const queryDisplayLimits = {
  maxQueryLength: 100,
  maxSlowQueries: 10,
  maxConnections: 100,
};

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive';
