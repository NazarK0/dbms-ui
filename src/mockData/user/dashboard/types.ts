// User Dashboard Types

// Last Modified Records
export interface ModifiedRecord {
  id: number;
  title: string;
  table: string;
  database: string;
  action: 'created' | 'updated';
  timestamp: string;
  user: string;
}

// Last Accessed Tables
export interface AccessedTable {
  id: number;
  name: string;
  database: string;
  records: number;
  lastAccessed: string;
  accessType: 'read' | 'write';
  icon: string;
}

// Activity Records
export interface ActivityRecord {
  id: number;
  database: string;
  table: string;
  recordId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  field: string;
  timestamp: string;
}

// Table Access
export interface TableAccess {
  id: number;
  database: 'crm_database' | 'project_management' | 'analytics_db' | 'ecommerce_db' | 'content_db' | 'reports_db';
  table: string;
  records: number;
  lastAccess: string;
  permissions: string[];
}

// User Databases
export interface UserDatabase {
  id: number;
  name: string;
  description: string;
  tables: number;
  size: string;
  lastAccessed: string;
  color: string;
  icon: string;
}

// Database with Tables (for browser)
export interface DatabaseWithTables {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  tables: Array<{
    id: number;
    name: string;
    records: number;
    icon: string;
  }>;
}

// Dashboard Database (for grid view)
export interface DashboardDatabase {
  id: number;
  name: string;
  tables: number;
  records: number;
  lastAccess: string;
  permissions: string[];
  grantedByRoles: string[];
  color: string;
}
