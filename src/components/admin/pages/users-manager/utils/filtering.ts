/**
 * Filtering & Sorting Utilities
 * 
 * Functions for filtering and sorting user lists.
 * 
 * @module utils/filtering
 */

import type { User, UserFilter, UserSort } from '../types';

/**
 * Filter users by search query
 * 
 * Searches users by name, email, role, and timezone.
 * Requires minimum 2 characters for search to activate.
 * 
 * @param users - Array of users to filter
 * @param searchQuery - Search query string
 * @returns Filtered users
 * 
 * @example
 * ```tsx
 * const results = filterUsersBySearch(users, 'john');
 * // Returns users with 'john' in name, email, role, or timezone
 * 
 * filterUsersBySearch(users, 'a');  // Returns all (query too short)
 * filterUsersBySearch(users, '');   // Returns all (empty query)
 * ```
 */
export const filterUsersBySearch = (
  users: User[],
  searchQuery: string
): User[] => {
  if (!searchQuery || searchQuery.trim().length < 2) {
    return users;
  }

  const query = searchQuery.toLowerCase().trim();

  return users.filter((user) => {
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query) ||
      user.timezone.toLowerCase().includes(query)
    );
  });
};

/**
 * Filter users by criteria
 * 
 * Applies multiple filters (search, role, status, timezone) to user list.
 * Filters are applied in sequence.
 * 
 * @param users - Array of users to filter
 * @param filter - Filter criteria object
 * @returns Filtered users
 * 
 * @example
 * ```tsx
 * // Filter by role only
 * const devs = filterUsers(users, { role: 'Developer' });
 * 
 * // Filter by multiple criteria
 * const activeDevs = filterUsers(users, {
 *   role: 'Developer',
 *   status: 'active',
 *   timezone: 'Europe/Kyiv'
 * });
 * 
 * // Filter with search
 * const results = filterUsers(users, {
 *   search: 'john',
 *   status: 'active'
 * });
 * ```
 */
export const filterUsers = (users: User[], filter: UserFilter): User[] => {
  let filtered = [...users];

  // Search
  if (filter.search) {
    filtered = filterUsersBySearch(filtered, filter.search);
  }

  // Role
  if (filter.role) {
    filtered = filtered.filter((user) => user.role === filter.role);
  }

  // Status
  if (filter.status) {
    filtered = filtered.filter((user) => user.status === filter.status);
  }

  // Timezone
  if (filter.timezone) {
    filtered = filtered.filter((user) => user.timezone === filter.timezone);
  }

  return filtered;
};

/**
 * Sort users
 * 
 * Sorts users by specified field and direction.
 * Handles strings (with Ukrainian locale) and numbers.
 * 
 * @param users - Array of users to sort
 * @param sort - Sort configuration (field and direction)
 * @returns Sorted users
 * 
 * @example
 * ```tsx
 * // Sort by name ascending
 * const sorted = sortUsers(users, { field: 'name', direction: 'asc' });
 * 
 * // Sort by email descending
 * const sorted = sortUsers(users, { field: 'email', direction: 'desc' });
 * 
 * // Sort by last active (recent first)
 * const sorted = sortUsers(users, { field: 'lastActive', direction: 'desc' });
 * ```
 */
export const sortUsers = (users: User[], sort: UserSort): User[] => {
  const sorted = [...users];

  sorted.sort((a, b) => {
    let aValue: any = a[sort.field];
    let bValue: any = b[sort.field];

    // Handle undefined values
    if (aValue === undefined) aValue = '';
    if (bValue === undefined) bValue = '';

    // String comparison
    if (typeof aValue === 'string') {
      const comparison = aValue.localeCompare(bValue, 'uk-UA');
      return sort.direction === 'asc' ? comparison : -comparison;
    }

    // Number comparison
    if (typeof aValue === 'number') {
      const comparison = aValue - bValue;
      return sort.direction === 'asc' ? comparison : -comparison;
    }

    return 0;
  });

  return sorted;
};
