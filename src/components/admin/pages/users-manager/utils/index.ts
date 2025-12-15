/**
 * Users Manager Utilities
 * 
 * Central export point for all user management utility functions.
 * 
 * @module utils
 */

// Statistics & Metrics
export {
  calculateUserStats,
  formatStatsValue,
  calculateUserMetrics,
} from './statistics';

// Filtering & Sorting
export {
  filterUsersBySearch,
  filterUsers,
  sortUsers,
} from './filtering';

// Grouping
export {
  groupUsersByRole,
  groupUsersByStatus,
  groupUsersByTimezone,
  getTopRoles,
  getTopTimezones,
} from './grouping';

// Activity Tracking
export {
  parseLastActive,
  isUserOnline,
  isUserRecentlyActive,
  getRecentlyActiveUsers,
  getActiveUsers,
  getInactiveUsers,
  getUserActivityStatus,
  getActivityStatusColor,
  getActivityStatusLabel,
} from './activity';

// Registration Tracking
export {
  parseRegistered,
  getRecentlyRegisteredUsers,
  getUsersRegisteredThisMonth,
} from './registration';

// Formatters
export {
  formatLastActive,
  formatRegistered,
  formatPercentage,
} from './formatters';

// Avatars
export {
  getUserInitials,
  getAvatarColor,
} from './avatars';

// Validators
export {
  validateEmail,
  validateUserName,
} from './validators';

// Search
export {
  searchUsers,
} from './search';

// Queries
export {
  getUniqueRoles,
  getUniqueTimezones,
  getUsersByRole,
  getUsersByTimezone,
  getUsersByStatus,
  countUsersByType,
} from './queries';

// Export
export {
  exportUsersToCSV,
  exportUsersToJSON,
} from './export';

// Calculations
export {
  calculatePercentage,
} from './calculations';
