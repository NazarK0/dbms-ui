/**
 * Mock database data for DatabaseBrowser component
 * В production це буде API запит
 */

import type { Database } from './types';

// Re-export from centralized mock data
export { userDatabases as mockDatabases, type Database } from '../../../mockData/user/databases';