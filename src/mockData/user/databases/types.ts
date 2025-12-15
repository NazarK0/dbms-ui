/**
 * TypeScript Types for User Databases Module
 * Represents databases and tables accessible to end users
 */

// Table Information with permissions and RLS settings
export interface TableInfo {
  name: string;
  records: number;
  size: string;
  permissions: string[];
  rlsEnabled: boolean;
  description: string;
}

// Database with tables collection
export interface Database {
  id: number;
  name: string;
  description: string;
  tables: TableInfo[];
}
