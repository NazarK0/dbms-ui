/**
 * Central export for User Databases Module
 * Mock database data for user database browser
 * Synchronized with dashboard databases for consistency
 */

// Types
export type { TableInfo, Database } from './types';

// Individual databases
export { crmDatabase } from './crmDatabase';
export { projectManagementDatabase } from './projectManagementDatabase';
export { analyticsDatabase } from './analyticsDatabase';
export { ecommerceDatabase } from './ecommerceDatabase';
export { contentDatabase } from './contentDatabase';
export { reportsDatabase } from './reportsDatabase';

// Combined databases array (для зворотної сумісності)
import { crmDatabase } from './crmDatabase';
import { projectManagementDatabase } from './projectManagementDatabase';
import { analyticsDatabase } from './analyticsDatabase';
import { ecommerceDatabase } from './ecommerceDatabase';
import { contentDatabase } from './contentDatabase';
import { reportsDatabase } from './reportsDatabase';

export const userDatabases = [
  crmDatabase,
  projectManagementDatabase,
  analyticsDatabase,
  ecommerceDatabase,
  contentDatabase,
  reportsDatabase,
];
