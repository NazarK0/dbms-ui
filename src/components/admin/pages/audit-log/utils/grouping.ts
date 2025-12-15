/**
 * Grouping functions for Audit Log entries
 */

import type { AuditEntry } from '../types';

/**
 * Group entries by date
 */
export const groupEntriesByDate = (entries: AuditEntry[]): Record<string, AuditEntry[]> => {
  return entries.reduce((acc, entry) => {
    const date = entry.timestamp.split(' ')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, AuditEntry[]>);
};

/**
 * Group entries by user
 */
export const groupEntriesByUser = (entries: AuditEntry[]): Record<string, AuditEntry[]> => {
  return entries.reduce((acc, entry) => {
    if (!acc[entry.user]) {
      acc[entry.user] = [];
    }
    acc[entry.user].push(entry);
    return acc;
  }, {} as Record<string, AuditEntry[]>);
};
