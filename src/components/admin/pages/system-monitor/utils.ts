/**
 * Utility functions for SystemMonitor components
 */

import type {
  ConnectionState,
  BadgeVariant,
  SystemStat,
  DatabaseStat,
  DatabaseConnection,
  SlowQuery,
  SystemMetrics,
  ConnectionSummary,
  SystemHealth,
  ConnectionFilter,
  SlowQueryFilter,
} from './types';
import {
  performanceThresholds,
  connectionStateBadgeVariants,
  cacheHitThresholds,
  tpsCategories,
  slowQueryThresholds,
} from './data';

/**
 * Get badge variant for connection state
 */
export const getStateBadge = (state: ConnectionState): BadgeVariant => {
  return connectionStateBadgeVariants[state] || 'secondary';
};

/**
 * Get connection state badge variant (compatibility)
 */
export const getConnectionStateBadge = (state: string): BadgeVariant => {
  const stateMap: Record<string, BadgeVariant> = {
    'активний': 'default',
    'очікує': 'secondary',
    'в транзакції': 'outline',
    'простій': 'secondary',
  };
  return stateMap[state] || 'secondary';
};

/**
 * Format percentage value
 */
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

/**
 * Parse memory string to bytes
 */
export const parseMemoryString = (memory: string): number => {
  const match = memory.match(/^([\d.]+)\s*(Б|КБ|МБ|ГБ|ТБ)$/i);
  if (!match) return 0;

  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  const multipliers: Record<string, number> = {
    'Б': 1,
    'КБ': 1024,
    'МБ': 1024 ** 2,
    'ГБ': 1024 ** 3,
    'ТБ': 1024 ** 4,
  };

  return value * (multipliers[unit] || 0);
};

/**
 * Format bytes to human-readable size
 */
export const formatBytes = (bytes: number): string => {
  const units = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

/**
 * Parse duration string (HH:MM:SS) to seconds
 */
export const parseDuration = (duration: string): number => {
  const parts = duration.split(':').map(Number);
  if (parts.length !== 3) return 0;

  const [hours, minutes, seconds] = parts;
  return hours * 3600 + minutes * 60 + seconds;
};

/**
 * Format seconds to HH:MM:SS
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Parse query duration (e.g., "2.4с") to seconds
 */
export const parseQueryDuration = (duration: string): number => {
  const match = duration.match(/^([\d.]+)(с|ms)$/);
  if (!match) return 0;

  const value = parseFloat(match[1]);
  const unit = match[2];

  return unit === 'с' ? value : value / 1000;
};

/**
 * Get system metric status
 */
export const getMetricStatus = (
  metricType: keyof typeof performanceThresholds,
  percentage: number
): 'normal' | 'warning' | 'critical' => {
  const thresholds = performanceThresholds[metricType];
  if (!thresholds) return 'normal';

  if (percentage >= thresholds.critical) return 'critical';
  if (percentage >= thresholds.warning) return 'warning';
  return 'normal';
};

/**
 * Get status color class
 */
export const getStatusColor = (
  status: 'normal' | 'warning' | 'critical'
): string => {
  const colors = {
    normal: 'text-green-600',
    warning: 'text-yellow-600',
    critical: 'text-red-600',
  };
  return colors[status];
};

/**
 * Get cache hit ratio status
 */
export const getCacheHitStatus = (
  ratio: number
): 'excellent' | 'good' | 'acceptable' | 'poor' => {
  if (ratio >= cacheHitThresholds.excellent) return 'excellent';
  if (ratio >= cacheHitThresholds.good) return 'good';
  if (ratio >= cacheHitThresholds.acceptable) return 'acceptable';
  return 'poor';
};

/**
 * Get cache hit color
 */
export const getCacheHitColor = (ratio: number): string => {
  const status = getCacheHitStatus(ratio);
  const colors = {
    excellent: 'text-green-600',
    good: 'text-lime-600',
    acceptable: 'text-yellow-600',
    poor: 'text-red-600',
  };
  return colors[status];
};

/**
 * Get TPS category
 */
export const getTpsCategory = (
  tps: number
): 'low' | 'medium' | 'high' | 'veryHigh' => {
  if (tps >= tpsCategories.veryHigh) return 'veryHigh';
  if (tps >= tpsCategories.high) return 'high';
  if (tps >= tpsCategories.medium) return 'medium';
  return 'low';
};

/**
 * Get TPS color
 */
export const getTpsColor = (tps: number): string => {
  const category = getTpsCategory(tps);
  const colors = {
    low: 'text-slate-600',
    medium: 'text-lime-600',
    high: 'text-green-600',
    veryHigh: 'text-emerald-600',
  };
  return colors[category];
};

/**
 * Get slow query severity
 */
export const getSlowQuerySeverity = (
  duration: string
): 'normal' | 'warning' | 'critical' => {
  const seconds = parseQueryDuration(duration);

  if (seconds >= slowQueryThresholds.critical) return 'critical';
  if (seconds >= slowQueryThresholds.warning) return 'warning';
  return 'normal';
};

/**
 * Truncate query string
 */
export const truncateQuery = (query: string, maxLength: number = 100): string => {
  if (query.length <= maxLength) return query;
  return query.substring(0, maxLength) + '...';
};

/**
 * Calculate connection usage percentage
 */
export const calculateConnectionUsage = (
  active: number,
  max: number
): number => {
  return Math.round((active / max) * 100);
};

/**
 * Parse system metrics from stats
 */
export const parseSystemMetrics = (stats: SystemStat[]): SystemMetrics => {
  const cpuStat = stats.find((s) => s.label.includes('CPU'));
  const memoryStat = stats.find((s) => s.label.includes("пам'яті"));
  const connectionsStat = stats.find((s) => s.label.includes("з'єднання"));
  const diskStat = stats.find((s) => s.label.includes('диску'));

  const parseMemoryValue = (value: string) => {
    const parts = value.split(' / ');
    return { used: parts[0] || '0', total: parts[1] || '0' };
  };

  const parseConnectionValue = (value: string) => {
    const parts = value.split(' / ').map((v) => parseInt(v) || 0);
    return { active: parts[0] || 0, max: parts[1] || 0 };
  };

  const memory = parseMemoryValue(memoryStat?.value || '0 / 0');
  const connections = parseConnectionValue(connectionsStat?.value || '0 / 0');
  const disk = parseMemoryValue(diskStat?.value || '0 / 0');

  return {
    cpuUsage: cpuStat?.percentage || 0,
    memoryUsed: memory.used,
    memoryTotal: memory.total,
    activeConnections: connections.active,
    maxConnections: connections.max,
    diskUsed: disk.used,
    diskTotal: disk.total,
  };
};

/**
 * Get connection summary
 */
export const getConnectionSummary = (
  connections: DatabaseConnection[]
): ConnectionSummary => {
  const summary: ConnectionSummary = {
    total: connections.length,
    active: 0,
    idle: 0,
    inTransaction: 0,
    byDatabase: {},
    byUser: {},
  };

  connections.forEach((conn) => {
    // Count by state
    if (conn.state === 'активний') summary.active++;
    else if (conn.state === 'очікує') summary.idle++;
    else if (conn.state === 'в транзакції') summary.inTransaction++;

    // Count by database
    summary.byDatabase[conn.database] =
      (summary.byDatabase[conn.database] || 0) + 1;

    // Count by user
    summary.byUser[conn.user] = (summary.byUser[conn.user] || 0) + 1;
  });

  return summary;
};

/**
 * Filter connections
 */
export const filterConnections = (
  connections: DatabaseConnection[],
  filter: ConnectionFilter
): DatabaseConnection[] => {
  return connections.filter((conn) => {
    if (filter.database && conn.database !== filter.database) return false;
    if (filter.user && conn.user !== filter.user) return false;
    if (filter.state && conn.state !== filter.state) return false;
    if (filter.minDuration) {
      const duration = parseDuration(conn.duration);
      if (duration < filter.minDuration) return false;
    }
    return true;
  });
};

/**
 * Sort connections by duration
 */
export const sortConnectionsByDuration = (
  connections: DatabaseConnection[],
  descending: boolean = true
): DatabaseConnection[] => {
  return [...connections].sort((a, b) => {
    const durationA = parseDuration(a.duration);
    const durationB = parseDuration(b.duration);
    return descending ? durationB - durationA : durationA - durationB;
  });
};

/**
 * Filter slow queries
 */
export const filterSlowQueries = (
  queries: SlowQuery[],
  filter: SlowQueryFilter
): SlowQuery[] => {
  return queries.filter((query) => {
    if (filter.database && query.database !== filter.database) return false;
    if (filter.minCalls && query.calls < filter.minCalls) return false;
    if (filter.minDuration) {
      const duration = parseQueryDuration(query.duration);
      if (duration < filter.minDuration) return false;
    }
    return true;
  });
};

/**
 * Sort slow queries by duration
 */
export const sortSlowQueriesByDuration = (
  queries: SlowQuery[],
  descending: boolean = true
): SlowQuery[] => {
  return [...queries].sort((a, b) => {
    const durationA = parseQueryDuration(a.duration);
    const durationB = parseQueryDuration(b.duration);
    return descending ? durationB - durationA : durationA - durationB;
  });
};

/**
 * Sort slow queries by calls
 */
export const sortSlowQueriesByCalls = (
  queries: SlowQuery[],
  descending: boolean = true
): SlowQuery[] => {
  return [...queries].sort((a, b) =>
    descending ? b.calls - a.calls : a.calls - b.calls
  );
};

/**
 * Get system health status
 */
export const getSystemHealth = (
  stats: SystemStat[],
  connections: DatabaseConnection[],
  databases: DatabaseStat[]
): SystemHealth => {
  const metrics = parseSystemMetrics(stats);

  const cpuStatus = getMetricStatus('cpu', metrics.cpuUsage);
  const memoryUsage =
    (parseMemoryString(metrics.memoryUsed) /
      parseMemoryString(metrics.memoryTotal)) *
    100;
  const memoryStatus = getMetricStatus('memory', memoryUsage);
  const connectionUsage = calculateConnectionUsage(
    metrics.activeConnections,
    metrics.maxConnections
  );
  const connectionStatus = getMetricStatus('connections', connectionUsage);
  const diskUsage =
    (parseMemoryString(metrics.diskUsed) /
      parseMemoryString(metrics.diskTotal)) *
    100;
  const diskStatus = getMetricStatus('disk', diskUsage);

  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check CPU
  if (cpuStatus === 'critical') {
    issues.push('Критичне навантаження на CPU');
    recommendations.push('Розгляньте можливість оптимізації запитів або масштабування');
  } else if (cpuStatus === 'warning') {
    issues.push('Підвищене навантаження на CPU');
    recommendations.push('Моніторте навантаження та підготуйтеся до масштабування');
  }

  // Check memory
  if (memoryStatus === 'critical') {
    issues.push("Критичне використання пам'яті");
    recommendations.push("Збільште пам'ять або оптимізуйте запити");
  } else if (memoryStatus === 'warning') {
    issues.push("Підвищене використання пам'яті");
    recommendations.push("Моніторте використання пам'яті");
  }

  // Check connections
  if (connectionStatus === 'critical') {
    issues.push("Критична кількість з'єднань");
    recommendations.push("Збільште max_connections або оптимізуйте пул з'єднань");
  } else if (connectionStatus === 'warning') {
    issues.push("Підвищена кількість з'єднань");
    recommendations.push("Розгляньте збільшення max_connections");
  }

  // Check disk
  if (diskStatus === 'critical') {
    issues.push('Критичне використання диску');
    recommendations.push('Терміново звільніть місце або розширте сховище');
  } else if (diskStatus === 'warning') {
    issues.push('Підвищене використання диску');
    recommendations.push('Розгляньте архівацію старих даних');
  }

  // Check cache hit ratios
  const poorCacheDbs = databases.filter(
    (db) => db.cache_hit < cacheHitThresholds.acceptable
  );
  if (poorCacheDbs.length > 0) {
    issues.push(`Низький коефіцієнт кешу для ${poorCacheDbs.length} БД`);
    recommendations.push("Розгляньте збільшення shared_buffers");
  }

  // Determine overall status
  let status: 'healthy' | 'warning' | 'critical' = 'healthy';
  if (
    cpuStatus === 'critical' ||
    memoryStatus === 'critical' ||
    connectionStatus === 'critical' ||
    diskStatus === 'critical'
  ) {
    status = 'critical';
  } else if (
    cpuStatus === 'warning' ||
    memoryStatus === 'warning' ||
    connectionStatus === 'warning' ||
    diskStatus === 'warning'
  ) {
    status = 'warning';
  }

  return {
    status,
    cpu: cpuStatus,
    memory: memoryStatus,
    disk: diskStatus,
    connections: connectionStatus,
    issues,
    recommendations,
  };
};

/**
 * Format number with thousand separators
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('uk-UA');
};

/**
 * Get top databases by size
 */
export const getTopDatabasesBySize = (
  databases: DatabaseStat[],
  limit: number = 5
): DatabaseStat[] => {
  return [...databases]
    .sort((a, b) => parseMemoryString(b.size) - parseMemoryString(a.size))
    .slice(0, limit);
};

/**
 * Get top databases by connections
 */
export const getTopDatabasesByConnections = (
  databases: DatabaseStat[],
  limit: number = 5
): DatabaseStat[] => {
  return [...databases]
    .sort((a, b) => b.connections - a.connections)
    .slice(0, limit);
};

/**
 * Get top databases by TPS
 */
export const getTopDatabasesByTps = (
  databases: DatabaseStat[],
  limit: number = 5
): DatabaseStat[] => {
  return [...databases].sort((a, b) => b.tps - a.tps).slice(0, limit);
};

/**
 * Calculate average TPS
 */
export const calculateAverageTps = (databases: DatabaseStat[]): number => {
  if (databases.length === 0) return 0;
  const total = databases.reduce((sum, db) => sum + db.tps, 0);
  return Math.round(total / databases.length);
};

/**
 * Calculate average cache hit ratio
 */
export const calculateAverageCacheHit = (databases: DatabaseStat[]): number => {
  if (databases.length === 0) return 0;
  const total = databases.reduce((sum, db) => sum + db.cache_hit, 0);
  return parseFloat((total / databases.length).toFixed(2));
};

/**
 * Calculate total database size
 */
export const calculateTotalDatabaseSize = (databases: DatabaseStat[]): string => {
  const totalBytes = databases.reduce(
    (sum, db) => sum + parseMemoryString(db.size),
    0
  );
  return formatBytes(totalBytes);
};

/**
 * Get long-running connections
 */
export const getLongRunningConnections = (
  connections: DatabaseConnection[],
  minSeconds: number = 60
): DatabaseConnection[] => {
  return connections.filter((conn) => {
    const duration = parseDuration(conn.duration);
    return duration >= minSeconds;
  });
};

/**
 * Get active queries
 */
export const getActiveQueries = (
  connections: DatabaseConnection[]
): DatabaseConnection[] => {
  return connections.filter(
    (conn) => conn.state === 'активний' && conn.query !== 'IDLE'
  );
};

/**
 * Export monitoring data to JSON
 */
export const exportMonitoringData = (
  stats: SystemStat[],
  databases: DatabaseStat[],
  connections: DatabaseConnection[],
  queries: SlowQuery[]
): string => {
  const data = {
    timestamp: new Date().toISOString(),
    systemStats: stats,
    databaseStats: databases,
    activeConnections: connections,
    slowQueries: queries,
  };
  return JSON.stringify(data, null, 2);
};
