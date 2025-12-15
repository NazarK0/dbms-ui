// Central export for User Dashboard mock data

// Types
export type {
  ModifiedRecord,
  AccessedTable,
  ActivityRecord,
  TableAccess,
  UserDatabase,
  DatabaseWithTables,
  DashboardDatabase,
} from './types';

// Modified Records
export { lastModifiedRecords } from './modifiedRecords';

// Accessed Tables
export { lastAccessedTables } from './accessedTables';

// Activity Records and Table Access
export { activityRecords, tableAccess } from './activityRecords';

// My Databases
export { myDatabases } from './myDatabases';

// Databases with Tables
export { databasesWithTables } from './databasesWithTables';

// Dashboard Databases
export { dashboardDatabases } from './dashboardDatabases';
