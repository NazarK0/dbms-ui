/**
 * TypeScript Types for Table Schemas Module
 * Defines structure for table columns, records, and schemas
 */

// Column definition for a table
export interface TableColumn {
  name: string;
  type: string;
  nullable?: boolean;
  required?: boolean;
  autoIncrement?: boolean;
  primaryKey?: boolean;
  enumValues?: string[]; // For enum types
  min?: number; // For numeric types
  max?: number; // For numeric types
  systemGenerated?: boolean; // For system-generated fields like created_at, updated_at
}

// Generic table record with ID and dynamic properties
export interface TableRecord {
  id: number;
  [key: string]: any;
}

// Complete table schema with columns and data
export interface TableSchema {
  columns: TableColumn[];
  data: TableRecord[];
}
