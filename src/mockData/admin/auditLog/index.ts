/**
 * Audit log mock data - central export
 */

// Types
export type { ActionType, AuditEntry } from './types';

// Data
export { auditEntries } from './auditEntries';

// Filter options
export { users, categories, actions } from './filters';

// Import for local use
import { users, categories, actions } from './filters';
import { auditEntries } from './auditEntries';

// Combined filters object for API compatibility
export const auditFilters = {
  users,
  categories,
  actions,
};

// Calculate statistics from audit entries
export const auditStatistics = {
  totalEntries: auditEntries.length,
  successCount: auditEntries.filter(e => e.status === 'success').length,
  failureCount: auditEntries.filter(e => e.status === 'failure').length,
  warningCount: auditEntries.filter(e => e.status === 'warning').length,
  uniqueUsers: new Set(auditEntries.map(e => e.user)).size,
  categoriesCount: new Set(auditEntries.map(e => e.category)).size,
};

// Calculate action type statistics
export const actionTypeStats = [
  {
    action: 'create',
    count: auditEntries.filter(e => e.action === 'create').length,
  },
  {
    action: 'update',
    count: auditEntries.filter(e => e.action === 'update').length,
  },
  {
    action: 'delete',
    count: auditEntries.filter(e => e.action === 'delete').length,
  },
  {
    action: 'select',
    count: auditEntries.filter(e => e.action === 'select').length,
  },
  {
    action: 'grant',
    count: auditEntries.filter(e => e.action === 'grant').length,
  },
  {
    action: 'revoke',
    count: auditEntries.filter(e => e.action === 'revoke').length,
  },
  {
    action: 'login',
    count: auditEntries.filter(e => e.action === 'login').length,
  },
  {
    action: 'backup',
    count: auditEntries.filter(e => e.action === 'backup').length,
  },
].filter(stat => stat.count > 0); // Only include actions that have entries