/**
 * Databases mock data - central export
 */

// Types
export type { Database, TemplateDatabase, AdminDatabase } from './types';

// Database collections
export { userDatabases } from './userDatabases';
export { templateDatabases } from './templateDatabases';
export { adminDatabases } from './adminDatabases';

// Combined collection
import { userDatabases } from './userDatabases';
import { templateDatabases } from './templateDatabases';
import { adminDatabases } from './adminDatabases';

export const allDatabases = [
  ...userDatabases,
  ...templateDatabases.map(db => ({ ...db, owner: 'postgres' })),
  ...adminDatabases.map(db => ({ ...db, owner: 'postgres' })),
];
