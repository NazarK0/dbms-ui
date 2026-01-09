/**
 * User Query Utilities
 * 
 * Functions for querying and filtering users by specific criteria.
 * 
 * @module utils/queries
 */

import type { User, UserStatus, UserType } from '../types';

/**
 * Get unique roles from users
 * 
 * Extracts all unique roles from user list, sorted alphabetically.
 * 
 * @param users - Array of users
 * @returns Sorted array of unique roles
 * 
 * @example
 * ```tsx
 * const roles = getUniqueRoles(users);
 * // ['Data Analyst', 'Developer', 'Superadmin', 'Viewer']
 * 
 * // Use in filter dropdown
 * <select>
 *   {roles.map(role => (
 *     <option key={role} value={role}>{role}</option>
 *   ))}
 * </select>
 * ```
 */
export const getUniqueRoles = (users: User[]): string[] => {
  const roles = new Set<string>();
  users.forEach((user) => roles.add(user.role));
  return Array.from(roles).sort();
};

/**
 * Get unique timezones from users
 * 
 * Extracts all unique timezones from user list, sorted alphabetically.
 * 
 * @param users - Array of users
 * @returns Sorted array of unique timezones
 * 
 * @example
 * ```tsx
 * const timezones = getUniqueTimezones(users);
 * // ['America/New_York', 'Asia/Tokyo', 'Europe/Kyiv', 'Europe/London']
 * 
 * // Use in filter dropdown
 * <select>
 *   {timezones.map(tz => (
 *     <option key={tz} value={tz}>{tz}</option>
 *   ))}
 * </select>
 * ```
 */
export const getUniqueTimezones = (users: User[]): string[] => {
  const timezones = new Set<string>();
  users.forEach((user) => timezones.add(user.timezone));
  return Array.from(timezones).sort();
};

/**
 * Get users by role
 * 
 * Filters users by specific role.
 * 
 * @param users - Array of users
 * @param role - Role to filter by
 * @returns Users with specified role
 * 
 * @example
 * ```tsx
 * const developers = getUsersByRole(users, 'Developer');
 * console.log(`${developers.length} developers found`);
 * 
 * // Get multiple roles
 * const roles = ['Developer', 'Data Analyst'];
 * const techUsers = roles.flatMap(role => getUsersByRole(users, role));
 * ```
 */
export const getUsersByRole = (users: User[], role: string): User[] => {
  return users.filter((user) => user.role === role);
};

/**
 * Get users by timezone
 * 
 * Filters users by specific timezone.
 * 
 * @param users - Array of users
 * @param timezone - Timezone to filter by
 * @returns Users in specified timezone
 * 
 * @example
 * ```tsx
 * const kyivUsers = getUsersByTimezone(users, 'Europe/Kyiv');
 * console.log(`${kyivUsers.length} users in Kyiv timezone`);
 * 
 * // Get users in multiple timezones
 * const timezones = ['Europe/Kyiv', 'Europe/London'];
 * const europeUsers = timezones.flatMap(tz => getUsersByTimezone(users, tz));
 * ```
 */
export const getUsersByTimezone = (users: User[], timezone: string): User[] => {
  return users.filter((user) => user.timezone === timezone);
};

/**
 * Get users by status
 * 
 * Filters users by account status (active/inactive).
 * 
 * @param users - Array of users
 * @param status - Status to filter by
 * @returns Users with specified status
 * 
 * @example
 * ```tsx
 * const activeUsers = getUsersByStatus(users, 'active');
 * const inactiveUsers = getUsersByStatus(users, 'inactive');
 * 
 * console.log(`Active: ${activeUsers.length}, Inactive: ${inactiveUsers.length}`);
 * ```
 */
export const getUsersByStatus = (
  users: User[],
  status: UserStatus
): User[] => {
  return users.filter((user) => user.status === status);
};

/**
 * Count users by type
 * 
 * Counts users by type (admin or end user).
 * Determines type based on role (admin roles vs user roles).
 * 
 * @param users - Array of users
 * @param type - User type ('admin' or 'endUser')
 * @returns Count of users of specified type
 * 
 * @example
 * ```tsx
 * const adminCount = countUsersByType(users, 'admin');
 * const userCount = countUsersByType(users, 'endUser');
 * 
 * console.log(`Admins: ${adminCount}, Users: ${userCount}`);
 * 
 * // Calculate percentage
 * const total = users.length;
 * const adminPercent = Math.round((adminCount / total) * 100);
 * console.log(`${adminPercent}% are admins`);
 * ```
 * 
 * @remarks
 * Admin roles: Superadmin, Database Admin, Developer, Analyst, Viewer
 * Other roles are considered end users.
 * 
 * TODO: Replace with proper user type field from backend
 */
export const countUsersByType = (users: User[], type: UserType): number => {
  // In this implementation, we assume administrators have admin roles
  // and end users have user roles
  // This is a simplified version; in production, you'd have a proper field
  const adminRoles = ['Superadmin', 'Database Admin', 'Developer', 'Analyst', 'Viewer'];
  
  if (type === 'admin') {
    return users.filter((user) => adminRoles.includes(user.role)).length;
  }
  
  return users.filter((user) => !adminRoles.includes(user.role)).length;
};
