/**
 * Search functions for Audit Log entries
 */

import type { AuditEntry } from '../types';

/**
 * Search entries by text
 */
export const searchEntries = (entries: AuditEntry[], searchTerm: string): AuditEntry[] => {
  if (!searchTerm) return entries;
  
  const term = searchTerm.toLowerCase();
  return entries.filter(entry =>
    entry.user.toLowerCase().includes(term) ||
    entry.target.toLowerCase().includes(term) ||
    entry.details.toLowerCase().includes(term) ||
    entry.category.toLowerCase().includes(term) ||
    entry.ip.includes(term)
  );
};
