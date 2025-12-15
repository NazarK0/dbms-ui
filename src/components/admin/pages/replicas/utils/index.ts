/**
 * Centralized export for all Replica Clusters utilities
 * 
 * This index file provides a single entry point for importing
 * utility functions organized by category.
 */

// UI Helpers - Status variants and display helpers
export {
  getStatusVariant,
  getStatusText,
  getLagVariant,
} from './uiHelpers';

// Formatters - Value formatting
export {
  formatLag,
  formatConnectionString,
  getLocationDisplay,
} from './formatters';

// Parsers - Data parsing
export {
  parseLagMs,
} from './parsers';

// Statistics - Calculations and metrics
export {
  calculateAvgLag,
  getClusterHealth,
  getTotalConnections,
  calculateLSNLag,
} from './statistics';

// Validators - Configuration validation
export {
  validateReplicaConfig,
} from './validators';

// Filters - Filtering and sorting
export {
  sortClustersByRole,
  filterReplicasByStatus,
} from './filters';

// Getters - Data retrieval and checking
export {
  getAvailableLocations,
  isPrimary,
  isReplica,
  getReplicaCount,
  getPrimaryCluster,
  getReplicaClusters,
} from './getters';

// Checkers - State checking
export {
  isSynchronous,
} from './checkers';
