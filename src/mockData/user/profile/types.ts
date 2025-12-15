/**
 * TypeScript Types for User Profile Module
 * Represents user information, activity, and database access
 */

// Activity Statistics for dashboard
export interface ActivityStat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

// Grouped Databases with access info
export interface DatabaseGroup {
  group: string;
  databases: Array<{
    name: string;
    tables: number;
    role: string;
    lastAccess: string;
  }>;
}

// User Information
export interface UserInfo {
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
  lastLogin: string;
  status: 'active' | 'away' | 'offline';
}

// Recent Activity Entry
export interface RecentActivity {
  id: number;
  type: 'create' | 'update' | 'delete' | 'export' | 'query';
  description: string;
  database: string;
  table: string;
  timestamp: string;
  status: 'success' | 'error' | 'warning';
}

// Database Access Permissions
export interface DatabaseAccess {
  database: string;
  permissions: {
    read: boolean;
    write: boolean;
    delete: boolean;
    export: boolean;
  };
  tables: string[];
  grantedBy: string;
  grantedDate: string;
}
