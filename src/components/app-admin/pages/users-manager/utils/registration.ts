/**
 * Registration Tracking Utilities
 * 
 * Functions for tracking and analyzing user registration dates.
 * 
 * @module utils/registration
 */

import type { User } from '../types';

/**
 * Parse registration date to days ago
 * 
 * Calculates the number of days since user registration.
 * 
 * @param registered - ISO date string of registration
 * @returns Days since registration, or null if not available
 * 
 * @example
 * ```tsx
 * parseRegistered('2024-12-15T10:30:00Z');  // e.g., 0 (today)
 * parseRegistered('2024-12-01T10:30:00Z');  // e.g., 14 (14 days ago)
 * parseRegistered(undefined);               // null
 * ```
 */
export const parseRegistered = (registered?: string): number | null => {
  if (!registered) return null;

  const registeredDate = new Date(registered);
  const now = new Date();
  const diffMs = now.getTime() - registeredDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
};

/**
 * Get recently registered users
 * 
 * Returns users sorted by registration date (most recent first).
 * 
 * @param users - Array of users
 * @param limit - Maximum number of users to return (default: 10)
 * @returns Recently registered users
 * 
 * @example
 * ```tsx
 * const newUsers = getRecentlyRegisteredUsers(users, 5);
 * // [
 * //   { name: 'Alice', registered: '2024-12-15T09:00:00Z', ... },
 * //   { name: 'Bob', registered: '2024-12-14T15:30:00Z', ... },
 * //   ...
 * // ]
 * ```
 */
export const getRecentlyRegisteredUsers = (
  users: User[],
  limit: number = 10
): User[] => {
  return users
    .filter((user) => user.registered)
    .sort((a, b) => {
      const aTime = new Date(a.registered || 0).getTime();
      const bTime = new Date(b.registered || 0).getTime();
      return bTime - aTime;
    })
    .slice(0, limit);
};

/**
 * Get users registered this month
 * 
 * Filters users who registered in the current month.
 * 
 * @param users - Array of users
 * @returns Users registered this month
 * 
 * @example
 * ```tsx
 * const thisMonth = getUsersRegisteredThisMonth(users);
 * console.log(`${thisMonth.length} new users this month`);
 * 
 * // Use in statistics
 * const stats = {
 *   total: users.length,
 *   newThisMonth: getUsersRegisteredThisMonth(users).length
 * };
 * ```
 */
export const getUsersRegisteredThisMonth = (users: User[]): User[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return users.filter((user) => {
    if (!user.registered) return false;

    const registeredDate = new Date(user.registered);
    return (
      registeredDate.getMonth() === currentMonth &&
      registeredDate.getFullYear() === currentYear
    );
  });
};
