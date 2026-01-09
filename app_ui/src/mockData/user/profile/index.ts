/**
 * Central export for User Profile Module
 * User information, activity statistics, and database access permissions
 */

// Types
export type {
  ActivityStat,
  DatabaseGroup,
  UserInfo,
  RecentActivity,
  DatabaseAccess,
} from './types';

// Data exports
export { activityStats } from './activityStats';
export { groupedDatabases } from './groupedDatabases';
export { currentUserInfo } from './userInfo';
export { recentActivity } from './recentActivity';
export { databaseAccessPermissions } from './databaseAccess';
