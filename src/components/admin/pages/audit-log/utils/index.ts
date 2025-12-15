/**
 * Centralized export for all Audit Log utilities
 * 
 * This index file provides a single entry point for importing
 * utility functions organized by category.
 */

// UI Helpers - Icons, badges, colors, and styling
export {
  getCategoryIcon,
  getActionBadge,
  getActionColor,
  getStatusBadgeClass,
  getTableRowClass,
  getActionLabel,
} from './uiHelpers';

// Statistics - Calculations and counting
export {
  calculateStatistics,
  calculateActionTypeStats,
  countEntriesByUser,
  countEntriesByCategory,
  countEntriesByAction,
  calculateSuccessRate,
} from './statistics';

// Filters - Filtering audit entries
export {
  filterAuditEntries,
  filterByUser,
  filterByAction,
  filterByCategory,
  filterByStatus,
  filterByDate,
  filterByIP,
  getSuccessfulEntries,
  getFailedEntries,
  getTodayEntries,
} from './filters';

// Getters - Retrieving unique values
export {
  getUniqueUsers,
  getUniqueCategories,
  getUniqueActions,
  getUniqueIPs,
} from './getters';

// Sorting - Sorting audit entries
export {
  sortByTimestampDesc,
  sortByTimestampAsc,
  sortByUser,
  sortByAction,
} from './sorting';

// Search - Search functionality
export {
  searchEntries,
} from './search';

// Analytics - Analytics and insights
export {
  getMostActiveUsers,
  getMostCommonCategories,
  getEntriesInTimeRange,
  getEntriesByHour,
  getHourlyActivity,
} from './analytics';

// Grouping - Grouping entries
export {
  groupEntriesByDate,
  groupEntriesByUser,
} from './grouping';

// Exporters - Export and download functionality
export {
  exportToCSV,
  exportToJSON,
  downloadFile,
} from './exporters';

// Formatters - Formatting functions
export {
  formatTimestamp,
} from './formatters';

// Validators - Validation functions
export {
  isValidAuditEntry,
  isRecentEntry,
} from './validators';
