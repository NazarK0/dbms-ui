/**
 * Statistics & User Metrics Utilities
 * 
 * Functions for calculating user statistics and comprehensive metrics.
 * 
 * @module utils/statistics
 */

import type { User, UserStats, UserMetrics } from '../types';
import { getActiveUsers, getInactiveUsers } from './activity';
import { groupUsersByRole, groupUsersByTimezone } from './grouping';
import { getRecentlyActiveUsers } from './activity';
import { getRecentlyRegisteredUsers } from './registration';

/**
 * Calculate user statistics
 * 
 * Calculates basic user counts including total, admins, end users, and new users.
 * 
 * @param administrators - Array of admin users
 * @param endUsers - Array of end users
 * @param newThisMonth - Count of new users this month
 * @returns User statistics object
 * 
 * @example
 * ```tsx
 * const stats = calculateUserStats(admins, users, 15);
 * // {
 * //   totalUsers: 120,
 * //   administrators: 20,
 * //   endUsers: 100,
 * //   newThisMonth: 15
 * // }
 * ```
 */
export const calculateUserStats = (
  administrators: User[],
  endUsers: User[],
  newThisMonth: number
): UserStats => {
  return {
    totalUsers: administrators.length + endUsers.length,
    administrators: administrators.length,
    endUsers: endUsers.length,
    newThisMonth,
  };
};

/**
 * Format user stats value
 * 
 * Formats numeric statistics with Ukrainian locale and optional prefix.
 * 
 * @param value - Numeric value to format
 * @param prefix - Optional prefix (e.g., '+' for growth)
 * @returns Formatted string
 * 
 * @example
 * ```tsx
 * formatStatsValue(1234);      // "1 234"
 * formatStatsValue(15, '+');   // "+15"
 * formatStatsValue(5000);      // "5 000"
 * ```
 */
export const formatStatsValue = (value: number, prefix?: string): string => {
  if (prefix === '+') {
    return `+${value.toLocaleString('uk-UA')}`;
  }
  return value.toLocaleString('uk-UA');
};

/**
 * Calculate user metrics
 * 
 * Calculates comprehensive user metrics including counts, activity status,
 * distribution by roles/timezones, and recent activity/registration.
 * 
 * @param administrators - Array of admin users
 * @param endUsers - Array of end users
 * @returns Comprehensive user metrics
 * 
 * @example
 * ```tsx
 * const metrics = calculateUserMetrics(admins, users);
 * // {
 * //   totalAdmins: 20,
 * //   totalUsers: 100,
 * //   activeAdmins: 18,
 * //   activeUsers: 85,
 * //   inactiveAdmins: 2,
 * //   inactiveUsers: 15,
 * //   rolesDistribution: [...],
 * //   timezonesDistribution: [...],
 * //   recentlyActive: [...],
 * //   recentlyRegistered: [...]
 * // }
 * ```
 */
export const calculateUserMetrics = (
  administrators: User[],
  endUsers: User[]
): UserMetrics => {
  const allUsers = [...administrators, ...endUsers];

  return {
    totalAdmins: administrators.length,
    totalUsers: endUsers.length,
    activeAdmins: getActiveUsers(administrators).length,
    activeUsers: getActiveUsers(endUsers).length,
    inactiveAdmins: getInactiveUsers(administrators).length,
    inactiveUsers: getInactiveUsers(endUsers).length,
    rolesDistribution: groupUsersByRole(allUsers),
    timezonesDistribution: groupUsersByTimezone(allUsers),
    recentlyActive: getRecentlyActiveUsers(allUsers),
    recentlyRegistered: getRecentlyRegisteredUsers(allUsers),
  };
};
