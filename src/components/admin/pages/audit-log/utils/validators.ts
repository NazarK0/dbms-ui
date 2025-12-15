/**
 * Validation functions for Audit Log
 */

import type { AuditEntry } from '../types';

/**
 * Validate audit entry
 */
export const isValidAuditEntry = (entry: Partial<AuditEntry>): entry is AuditEntry => {
  return !!(
    entry.id &&
    entry.timestamp &&
    entry.user &&
    entry.action &&
    entry.category &&
    entry.target &&
    entry.details &&
    entry.ip &&
    entry.status
  );
};

/**
 * Check if entry is recent (within last hour)
 */
export const isRecentEntry = (entry: AuditEntry): boolean => {
  // Mock implementation - in real app would compare timestamps
  return true;
};
