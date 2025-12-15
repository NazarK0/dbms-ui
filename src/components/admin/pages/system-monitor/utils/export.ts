/**
 * Export Utility Functions
 * 
 * Functions for exporting monitoring data in various formats.
 * 
 * @module utils/export
 */

import type { SystemStat, DatabaseStat, DatabaseConnection, SlowQuery } from '../types';

/**
 * Export monitoring data to JSON
 * 
 * Exports complete monitoring snapshot as formatted JSON string.
 * Includes timestamp and all monitoring data categories.
 * 
 * @param stats - System statistics
 * @param databases - Database statistics
 * @param connections - Active connections
 * @param queries - Slow queries
 * @returns Formatted JSON string
 * 
 * @example
 * ```tsx
 * const json = exportMonitoringData(stats, databases, connections, queries);
 * 
 * // Download as file
 * const blob = new Blob([json], { type: 'application/json' });
 * const url = URL.createObjectURL(blob);
 * const link = document.createElement('a');
 * link.href = url;
 * link.download = `monitoring-${Date.now()}.json`;
 * link.click();
 * 
 * // Or copy to clipboard
 * navigator.clipboard.writeText(json);
 * ```
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
