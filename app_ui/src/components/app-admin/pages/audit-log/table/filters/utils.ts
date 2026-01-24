/**
 * Filtering functions for Audit Log entries
 */

import type { AuditEntry, ActionType, AuditCategory } from '../types';

/**
 * Filter audit entries
 */
export const filterAuditEntries = (
  entries: AuditEntry[],
  searchQuery: string,
  filterUser: string,
  filterAction: string,
  filterCategory: string
): AuditEntry[] => {
  return entries.filter(entry => {
    const matchesSearch =
      entry.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.user.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUser = filterUser === 'all' || entry.user === filterUser;
    const matchesAction = filterAction === 'all' || entry.action === filterAction;
    const matchesCategory = filterCategory === 'all' || entry.category === filterCategory;

    return matchesSearch && matchesUser && matchesAction && matchesCategory;
  });
};

/**
 * Filter entries by user
 */
export const filterByUser = (entries: AuditEntry[], user: string): AuditEntry[] => {
  return entries.filter(entry => entry.user === user);
};

/**
 * Filter entries by action type
 */
export const filterByAction = (entries: AuditEntry[], action: ActionType): AuditEntry[] => {
  return entries.filter(entry => entry.action === action);
};

/**
 * Filter entries by category
 */
export const filterByCategory = (entries: AuditEntry[], category: AuditCategory): AuditEntry[] => {
  return entries.filter(entry => entry.category === category);
};

/**
 * Filter entries by status
 */
export const filterByStatus = (entries: AuditEntry[], status: 'success' | 'failed'): AuditEntry[] => {
  return entries.filter(entry => entry.status === status);
};

/**
 * Filter entries by date
 */
export const filterByDate = (entries: AuditEntry[], date: string): AuditEntry[] => {
  return entries.filter(entry => entry.time.startsWith(date));
};

/**
 * Filter entries by IP address
 */
export const filterByIP = (entries: AuditEntry[], ip: string): AuditEntry[] => {
  return entries.filter(entry => entry.ipAddress.includes(ip));
};

/**
 * Get successful entries
 */
export const getSuccessfulEntries = (entries: AuditEntry[]): AuditEntry[] => {
  return filterByStatus(entries, 'success');
};

/**
 * Get failed entries
 */
export const getFailedEntries = (entries: AuditEntry[]): AuditEntry[] => {
  return filterByStatus(entries, 'failed');
};

/**
 * Get today's entries
 */
export const getTodayEntries = (entries: AuditEntry[]): AuditEntry[] => {
  const today = new Date().toISOString().split('T')[0];
  return filterByDate(entries, today);
};
