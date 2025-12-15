/**
 * System Metrics Utility Functions
 * 
 * Functions for parsing and extracting system-level metrics.
 * 
 * @module utils/systemMetrics
 */

import type { SystemStat, SystemMetrics } from '../types';

/**
 * Parse system metrics from stats
 * 
 * Extracts and parses system-level metrics (CPU, memory, connections, disk) from stats array.
 * 
 * @param stats - Array of system statistics
 * @returns Parsed system metrics
 * 
 * @example
 * ```tsx
 * const metrics = parseSystemMetrics(stats);
 * // {
 * //   cpuUsage: 45.2,
 * //   memoryUsed: "8.5 ГБ",
 * //   memoryTotal: "16 ГБ",
 * //   activeConnections: 125,
 * //   maxConnections: 200,
 * //   diskUsed: "45.3 ГБ",
 * //   diskTotal: "100 ГБ"
 * // }
 * ```
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
