/**
 * Sorting functions for Audit Log entries
 */

import type { AuditEntry } from '../types';

/**
 * Sort entries by timestamp (newest first)
 */
export const sortByTimestampDesc = (entries: AuditEntry[]): AuditEntry[] => {
  return [...entries].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
};

/**
 * Sort entries by timestamp (oldest first)
 */
export const sortByTimestampAsc = (entries: AuditEntry[]): AuditEntry[] => {
  return [...entries].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
};

/**
 * Sort entries by user
 */
export const sortByUser = (entries: AuditEntry[], ascending: boolean = true): AuditEntry[] => {
  return [...entries].sort((a, b) => {
    const comparison = a.user.localeCompare(b.user);
    return ascending ? comparison : -comparison;
  });
};

/**
 * Sort entries by action
 */
export const sortByAction = (entries: AuditEntry[], ascending: boolean = true): AuditEntry[] => {
  return [...entries].sort((a, b) => {
    const comparison = a.action.localeCompare(b.action);
    return ascending ? comparison : -comparison;
  });
};
