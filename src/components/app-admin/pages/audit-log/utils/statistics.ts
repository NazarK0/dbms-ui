/**
 * Statistical calculation functions for Audit Log
 */

import type { 
  AuditEntry, 
  AuditStatistics, 
  ActionTypeStatistics 
} from '../types';

/**
 * Calculate audit statistics
 */
export const calculateStatistics = (entries: AuditEntry[]): AuditStatistics => {
  return {
    total: entries.length,
    today: entries.filter(e => e.timestamp.startsWith('2024-12-12')).length,
    success: entries.filter(e => e.status === 'success').length,
    failed: entries.filter(e => e.status === 'failed').length,
  };
};

/**
 * Calculate action type statistics
 */
export const calculateActionTypeStats = (entries: AuditEntry[]): ActionTypeStatistics => {
  return {
    create: entries.filter(e => e.action === 'create').length,
    update: entries.filter(e => e.action === 'update').length,
    delete: entries.filter(e => e.action === 'delete').length,
    query: entries.filter(e => e.action === 'select').length,
  };
};

/**
 * Get entries count by user
 */
export const countEntriesByUser = (entries: AuditEntry[]): Record<string, number> => {
  return entries.reduce((acc, entry) => {
    acc[entry.user] = (acc[entry.user] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Get entries count by category
 */
export const countEntriesByCategory = (entries: AuditEntry[]): Record<string, number> => {
  return entries.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Get entries count by action
 */
export const countEntriesByAction = (entries: AuditEntry[]): Record<string, number> => {
  return entries.reduce((acc, entry) => {
    acc[entry.action] = (acc[entry.action] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Calculate success rate
 */
export const calculateSuccessRate = (entries: AuditEntry[]): number => {
  if (entries.length === 0) return 0;
  const successCount = entries.filter(e => e.status === 'success').length;
  return (successCount / entries.length) * 100;
};
