/**
 * System Monitor Utilities
 * 
 * Central export point for all system monitoring utility functions.
 * 
 * @module utils
 */

// Badge utilities
export { getStateBadge, getConnectionStateBadge } from './badges';

// Formatting utilities
export {
  formatPercentage,
  formatBytes,
  formatDuration,
  formatNumber,
  truncateQuery,
} from './formatters';

// Parsing utilities
export {
  parseMemoryString,
  parseDuration,
  parseQueryDuration,
} from './parsers';

// Status & color utilities
export {
  getMetricStatus,
  getStatusColor,
  getCacheHitStatus,
  getCacheHitColor,
  getTpsCategory,
  getTpsColor,
  getSlowQuerySeverity,
} from './statusColors';

// Connection utilities
export {
  calculateConnectionUsage,
  getConnectionSummary,
  filterConnections,
  sortConnectionsByDuration,
  getLongRunningConnections,
  getActiveQueries,
} from './connections';

// Slow query utilities
export {
  filterSlowQueries,
  sortSlowQueriesByDuration,
  sortSlowQueriesByCalls,
} from './slowQueries';

// Database statistics utilities
export {
  getTopDatabasesBySize,
  getTopDatabasesByConnections,
  getTopDatabasesByTps,
  calculateAverageTps,
  calculateAverageCacheHit,
  calculateTotalDatabaseSize,
} from './databaseStats';

// System metrics utilities
export { parseSystemMetrics } from './systemMetrics';

// System health utilities
export { getSystemHealth } from './systemHealth';

// Export utilities
export { exportMonitoringData } from './export';
