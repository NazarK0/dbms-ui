/**
 * Activity Tracking Utilities
 * 
 * Functions for tracking and analyzing user activity status.
 * 
 * @module utils/activity
 */

import type { User } from '../types';
import { userActivityThresholds } from '../data';

/**
 * Parse last active time to minutes ago
 * 
 * Calculates the number of minutes since user's last activity.
 * 
 * @param lastActive - ISO date string of last activity
 * @returns Minutes since last active, or null if not available
 * 
 * @example
 * ```tsx
 * parseLastActive('2024-12-15T10:30:00Z');  // e.g., 15 (minutes ago)
 * parseLastActive('2024-12-14T10:30:00Z');  // e.g., 1440 (24 hours ago)
 * parseLastActive(undefined);               // null
 * ```
 */
export const parseLastActive = (lastActive?: string): number | null => {
  if (!lastActive) return null;

  const lastActiveDate = new Date(lastActive);
  const now = new Date();
  const diffMs = now.getTime() - lastActiveDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  return diffMinutes;
};

/**
 * Check if user is online
 * 
 * Determines if user is currently online based on activity threshold.
 * Online threshold is defined in userActivityThresholds.online.
 * 
 * @param user - User object
 * @returns True if user is online
 * 
 * @example
 * ```tsx
 * isUserOnline(user);  // true if active within last 5 minutes
 * 
 * // Check online users
 * const onlineUsers = users.filter(isUserOnline);
 * ```
 */
export const isUserOnline = (user: User): boolean => {
  const minutesAgo = parseLastActive(user.lastActive);
  if (minutesAgo === null) return false;

  return minutesAgo <= userActivityThresholds.online;
};

/**
 * Check if user is recently active
 * 
 * Determines if user was recently active based on activity threshold.
 * Recent threshold is defined in userActivityThresholds.recent.
 * 
 * @param user - User object
 * @returns True if user is recently active
 * 
 * @example
 * ```tsx
 * isUserRecentlyActive(user);  // true if active within last 30 minutes
 * 
 * // Check recently active users
 * const recentUsers = users.filter(isUserRecentlyActive);
 * ```
 */
export const isUserRecentlyActive = (user: User): boolean => {
  const minutesAgo = parseLastActive(user.lastActive);
  if (minutesAgo === null) return false;

  return minutesAgo <= userActivityThresholds.recent;
};

/**
 * Get recently active users
 * 
 * Returns users sorted by last activity time (most recent first).
 * 
 * @param users - Array of users
 * @param limit - Maximum number of users to return (default: 10)
 * @returns Recently active users
 * 
 * @example
 * ```tsx
 * const recent = getRecentlyActiveUsers(users, 5);
 * // [
 * //   { name: 'John', lastActive: '2024-12-15T10:55:00Z', ... },
 * //   { name: 'Jane', lastActive: '2024-12-15T10:50:00Z', ... },
 * //   ...
 * // ]
 * ```
 */
export const getRecentlyActiveUsers = (
  users: User[],
  limit: number = 10
): User[] => {
  return users
    .filter((user) => user.lastActive)
    .sort((a, b) => {
      const aTime = new Date(a.lastActive || 0).getTime();
      const bTime = new Date(b.lastActive || 0).getTime();
      return bTime - aTime;
    })
    .slice(0, limit);
};

/**
 * Get active users (active status)
 * 
 * Filters users with active status.
 * 
 * @param users - Array of users
 * @returns Users with active status
 * 
 * @example
 * ```tsx
 * const activeUsers = getActiveUsers(users);
 * console.log(`${activeUsers.length} active users`);
 * ```
 */
export const getActiveUsers = (users: User[]): User[] => {
  return users.filter((user) => user.status === 'active');
};

/**
 * Get inactive users
 * 
 * Filters users with inactive status.
 * 
 * @param users - Array of users
 * @returns Users with inactive status
 * 
 * @example
 * ```tsx
 * const inactiveUsers = getInactiveUsers(users);
 * console.log(`${inactiveUsers.length} inactive users`);
 * ```
 */
export const getInactiveUsers = (users: User[]): User[] => {
  return users.filter((user) => user.status === 'inactive');
};

/**
 * Get user activity status
 * 
 * Determines user's current activity status (online, recent, or inactive).
 * 
 * @param user - User object
 * @returns Activity status
 * 
 * @example
 * ```tsx
 * getUserActivityStatus(user);  // 'online' | 'recent' | 'inactive'
 * 
 * // Use in component
 * const status = getUserActivityStatus(user);
 * const color = getActivityStatusColor(status);
 * const label = getActivityStatusLabel(status);
 * ```
 */
export const getUserActivityStatus = (
  user: User
): 'online' | 'recent' | 'inactive' => {
  if (user.status === 'inactive') return 'inactive';

  const minutesAgo = parseLastActive(user.lastActive);
  if (minutesAgo === null) return 'inactive';

  if (minutesAgo <= userActivityThresholds.online) return 'online';
  if (minutesAgo <= userActivityThresholds.recent) return 'recent';
  return 'inactive';
};

/**
 * Get activity status color
 * 
 * Returns Tailwind CSS class for activity status indicator.
 * 
 * @param status - Activity status
 * @returns Tailwind background color class
 * 
 * @example
 * ```tsx
 * getActivityStatusColor('online');    // 'bg-green-500'
 * getActivityStatusColor('recent');    // 'bg-yellow-500'
 * getActivityStatusColor('inactive');  // 'bg-slate-300'
 * 
 * // Use in component
 * <div className={`h-2 w-2 rounded-full ${getActivityStatusColor(status)}`} />
 * ```
 */
export const getActivityStatusColor = (
  status: 'online' | 'recent' | 'inactive'
): string => {
  const colors = {
    online: 'bg-green-500',
    recent: 'bg-yellow-500',
    inactive: 'bg-slate-300',
  };
  return colors[status];
};

/**
 * Get activity status label
 * 
 * Returns Ukrainian label for activity status.
 * 
 * @param status - Activity status
 * @returns Ukrainian status label
 * 
 * @example
 * ```tsx
 * getActivityStatusLabel('online');    // 'Онлайн'
 * getActivityStatusLabel('recent');    // 'Нещодавно'
 * getActivityStatusLabel('inactive');  // 'Неактивний'
 * 
 * // Use in component
 * <Badge>{getActivityStatusLabel(status)}</Badge>
 * ```
 */
export const getActivityStatusLabel = (
  status: 'online' | 'recent' | 'inactive'
): string => {
  const labels = {
    online: 'Онлайн',
    recent: 'Нещодавно',
    inactive: 'Неактивний',
  };
  return labels[status];
};
