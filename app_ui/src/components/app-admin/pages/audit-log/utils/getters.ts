/**
 * Getter functions for unique values from Audit Log entries
 */

import type { AuditEntry, ActionType, AuditCategory } from '../types';

/**
 * Get unique users
 */
export const getUniqueUsers = (entries: AuditEntry[]): string[] => {
  return [...new Set(entries.map(entry => entry.user))];
};

/**
 * Get unique categories
 */
export const getUniqueCategories = (entries: AuditEntry[]): AuditCategory[] => {
  return [...new Set(entries.map(entry => entry.category))];
};

/**
 * Get unique action types
 */
export const getUniqueActions = (entries: AuditEntry[]): ActionType[] => {
  return [...new Set(entries.map(entry => entry.action))];
};

/**
 * Get IP addresses
 */
export const getUniqueIPs = (entries: AuditEntry[]): string[] => {
  return [...new Set(entries.map(entry => entry.ip))];
};
