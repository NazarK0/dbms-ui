/**
 * Grouping Utilities
 * 
 * Functions for grouping users by various criteria (role, status, timezone).
 * 
 * @module utils/grouping
 */

import type {
  User,
  UserStatus,
  UsersByRole,
  UsersByStatus,
  UsersByTimezone,
} from '../types';

/**
 * Group users by role
 * 
 * Groups users by their role and counts them.
 * Includes role color from first user in group.
 * 
 * @param users - Array of users to group
 * @returns Array of role groups with counts and colors
 * 
 * @example
 * ```tsx
 * const roleGroups = groupUsersByRole(users);
 * // [
 * //   {
 * //     role: 'Developer',
 * //     count: 25,
 * //     users: [...],
 * //     color: 'from-violet-400 to-violet-500'
 * //   },
 * //   {
 * //     role: 'Data Analyst',
 * //     count: 15,
 * //     users: [...],
 * //     color: 'from-blue-400 to-blue-500'
 * //   },
 * //   ...
 * // ]
 * ```
 */
export const groupUsersByRole = (users: User[]): UsersByRole[] => {
  const roleMap = new Map<string, User[]>();

  users.forEach((user) => {
    const existing = roleMap.get(user.role) || [];
    roleMap.set(user.role, [...existing, user]);
  });

  return Array.from(roleMap.entries()).map(([role, roleUsers]) => ({
    role,
    count: roleUsers.length,
    users: roleUsers,
    color: roleUsers[0]?.roleColor || 'from-slate-400 to-slate-500',
  }));
};

/**
 * Group users by status
 * 
 * Groups users by their status (active/inactive) and counts them.
 * 
 * @param users - Array of users to group
 * @returns Array of status groups with counts
 * 
 * @example
 * ```tsx
 * const statusGroups = groupUsersByStatus(users);
 * // [
 * //   {
 * //     status: 'active',
 * //     count: 85,
 * //     users: [...]
 * //   },
 * //   {
 * //     status: 'inactive',
 * //     count: 15,
 * //     users: [...]
 * //   }
 * // ]
 * ```
 */
export const groupUsersByStatus = (users: User[]): UsersByStatus[] => {
  const statusMap = new Map<UserStatus, User[]>();

  users.forEach((user) => {
    const existing = statusMap.get(user.status) || [];
    statusMap.set(user.status, [...existing, user]);
  });

  return Array.from(statusMap.entries()).map(([status, statusUsers]) => ({
    status,
    count: statusUsers.length,
    users: statusUsers,
  }));
};

/**
 * Group users by timezone
 * 
 * Groups users by their timezone and counts them.
 * 
 * @param users - Array of users to group
 * @returns Array of timezone groups with counts
 * 
 * @example
 * ```tsx
 * const timezoneGroups = groupUsersByTimezone(users);
 * // [
 * //   {
 * //     timezone: 'Europe/Kyiv',
 * //     count: 45,
 * //     users: [...]
 * //   },
 * //   {
 * //     timezone: 'America/New_York',
 * //     count: 30,
 * //     users: [...]
 * //   },
 * //   {
 * //     timezone: 'Asia/Tokyo',
 * //     count: 25,
 * //     users: [...]
 * //   }
 * // ]
 * ```
 */
export const groupUsersByTimezone = (users: User[]): UsersByTimezone[] => {
  const timezoneMap = new Map<string, User[]>();

  users.forEach((user) => {
    const existing = timezoneMap.get(user.timezone) || [];
    timezoneMap.set(user.timezone, [...existing, user]);
  });

  return Array.from(timezoneMap.entries()).map(([timezone, tzUsers]) => ({
    timezone,
    count: tzUsers.length,
    users: tzUsers,
  }));
};

/**
 * Get top roles by user count
 * 
 * Returns the most popular roles by user count.
 * 
 * @param users - Array of users
 * @param limit - Maximum number of roles to return (default: 5)
 * @returns Top roles sorted by count
 * 
 * @example
 * ```tsx
 * const topRoles = getTopRoles(users, 3);
 * // [
 * //   { role: 'Developer', count: 45, users: [...], color: '...' },
 * //   { role: 'Data Analyst', count: 30, users: [...], color: '...' },
 * //   { role: 'Content Manager', count: 25, users: [...], color: '...' }
 * // ]
 * ```
 */
export const getTopRoles = (
  users: User[],
  limit: number = 5
): UsersByRole[] => {
  const roleGroups = groupUsersByRole(users);
  return roleGroups.sort((a, b) => b.count - a.count).slice(0, limit);
};

/**
 * Get top timezones by user count
 * 
 * Returns the most popular timezones by user count.
 * 
 * @param users - Array of users
 * @param limit - Maximum number of timezones to return (default: 5)
 * @returns Top timezones sorted by count
 * 
 * @example
 * ```tsx
 * const topTimezones = getTopTimezones(users, 3);
 * // [
 * //   { timezone: 'Europe/Kyiv', count: 45, users: [...] },
 * //   { timezone: 'America/New_York', count: 30, users: [...] },
 * //   { timezone: 'Asia/Tokyo', count: 25, users: [...] }
 * // ]
 * ```
 */
export const getTopTimezones = (
  users: User[],
  limit: number = 5
): UsersByTimezone[] => {
  const timezoneGroups = groupUsersByTimezone(users);
  return timezoneGroups.sort((a, b) => b.count - a.count).slice(0, limit);
};
