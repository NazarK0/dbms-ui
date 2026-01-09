/**
 * User UI Preview Utilities
 * 
 * Central export point for all user UI preview utility functions.
 * 
 * @module utils
 */

// Role utilities
export {
  getPermissionsForRole,
  getRoleById,
  getRoleName,
  getRoleColor,
  getAllRoles,
} from './roles';

// Permission utilities
export {
  countEnabledPermissions,
  countDisabledPermissions,
  getPermissionPercentage,
  hasPermission,
  getEnabledPermissions,
  getDisabledPermissions,
  getPermissionSummary,
  getDefaultPermissions,
} from './permissions';

// Permission operations
export {
  compareRolePermissions,
  arePermissionsEqual,
  mergePermissions,
  intersectPermissions,
} from './permissionOps';

// Device utilities
export {
  getDeviceSize,
  getDeviceDisplayName,
  shouldShowNavigation,
  getActionGridCols,
} from './devices';

// Styling utilities
export {
  getActionButtonClass,
  getActionIconClass,
  getPermissionBadgeVariant,
  getPermissionBadgeText,
} from './styling';

// Formatters
export {
  formatPermissionLabel,
  formatActionLabel,
} from './formatters';

// Role queries
export {
  getRolesWithPermission,
  countRolesWithPermission,
} from './roleQueries';

// Role ranking
export {
  getRolesByPermissionCount,
  getMostPermissiveRole,
  getLeastPermissiveRole,
} from './roleRanking';

// Statistics & matrix
export {
  generatePermissionMatrix,
  getPermissionStatistics,
} from './statistics';

// Export utilities
export {
  exportPermissionsToJSON,
  exportAllRolesPermissionsToJSON,
} from './export';

// Validators
export {
  isValidDeviceType,
  isValidRoleId,
} from './validators';
