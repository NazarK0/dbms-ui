/**
 * System Health Analysis Functions
 * 
 * Functions for comprehensive system health analysis and diagnostics.
 * 
 * @module utils/systemHealth
 */

import type { SystemStat, DatabaseConnection, DatabaseStat, SystemHealth } from '../types';
import { cacheHitThresholds } from '../data';
import { parseSystemMetrics } from './systemMetrics';
import { getMetricStatus } from './statusColors';
import { parseMemoryString } from './parsers';
import { calculateConnectionUsage } from './connections';

/**
 * Get system health status
 * 
 * Performs comprehensive system health analysis including:
 * - CPU usage status
 * - Memory usage status
 * - Connection pool status
 * - Disk usage status
 * - Cache hit ratio analysis
 * 
 * Returns overall health status with issues and recommendations.
 * 
 * @param stats - System statistics
 * @param connections - Active database connections
 * @param databases - Database statistics
 * @returns Complete system health analysis
 * 
 * @example
 * ```tsx
 * const health = getSystemHealth(stats, connections, databases);
 * 
 * console.log(`System Status: ${health.status}`);
 * // "System Status: warning"
 * 
 * health.issues.forEach(issue => console.log(`⚠️ ${issue}`));
 * // ⚠️ Підвищене навантаження на CPU
 * // ⚠️ Підвищена кількість з'єднань
 * 
 * health.recommendations.forEach(rec => console.log(`💡 ${rec}`));
 * // 💡 Моніторте навантаження та підготуйтеся до масштабування
 * // 💡 Розгляньте збільшення max_connections
 * ```
 */
export const getSystemHealth = (
  stats: SystemStat[],
  connections: DatabaseConnection[],
  databases: DatabaseStat[]
): SystemHealth => {
  const metrics = parseSystemMetrics(stats);

  // Calculate CPU status
  const cpuStatus = getMetricStatus('cpu', metrics.cpuUsage);

  // Calculate memory status
  const memoryUsage =
    (parseMemoryString(metrics.memoryUsed) /
      parseMemoryString(metrics.memoryTotal)) *
    100;
  const memoryStatus = getMetricStatus('memory', memoryUsage);

  // Calculate connection status
  const connectionUsage = calculateConnectionUsage(
    metrics.activeConnections,
    metrics.maxConnections
  );
  const connectionStatus = getMetricStatus('connections', connectionUsage);

  // Calculate disk status
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
