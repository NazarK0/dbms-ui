/**
 * Central export for Table Schemas Module
 * Combines all database table schemas into a single export
 */

// Types
export type { TableColumn, TableRecord, TableSchema } from './types';

// Import all schema groups
import { crmSchemas } from './crm';
import { projectSchemas } from './projects';
import { analyticsSchemas } from './analytics';
import { ecommerceSchemas } from './ecommerce';
import { contentSchemas } from './content';
import { reportsSchemas } from './reports';
import { systemSchemas } from './system';
import type { TableSchema, TableColumn } from './types';

// Combine all schemas into single object for backward compatibility
export const tableSchemas: Record<string, TableSchema> = {
  ...crmSchemas,
  ...projectSchemas,
  ...analyticsSchemas,
  ...ecommerceSchemas,
  ...contentSchemas,
  ...reportsSchemas,
  ...systemSchemas,
};

// Export individual schema groups for granular imports
export {
  crmSchemas,
  projectSchemas,
  analyticsSchemas,
  ecommerceSchemas,
  contentSchemas,
  reportsSchemas,
  systemSchemas,
};

// Simple table schema for CreateRecord and EditRecord components
export const simpleTableSchema: TableColumn[] = [
  { name: 'id', type: 'integer', nullable: false, autoIncrement: true, primaryKey: true },
  { name: 'title', type: 'varchar(255)', nullable: false, autoIncrement: false, primaryKey: false },
  { name: 'description', type: 'text', nullable: true, autoIncrement: false, primaryKey: false },
  { name: 'status', type: 'enum', nullable: false, autoIncrement: false, primaryKey: false, enumValues: ['draft', 'active', 'pending', 'completed', 'archived'] },
  { name: 'priority', type: 'enum', nullable: true, autoIncrement: false, primaryKey: false, enumValues: ['low', 'medium', 'high', 'urgent'] },
  { name: 'price', type: 'decimal', nullable: true, autoIncrement: false, primaryKey: false, min: 0 },
  { name: 'quantity', type: 'integer', nullable: true, autoIncrement: false, primaryKey: false, min: 0, max: 1000 },
  { name: 'is_active', type: 'boolean', nullable: false, autoIncrement: false, primaryKey: false },
  { name: 'start_date', type: 'date', nullable: true, autoIncrement: false, primaryKey: false },
  { name: 'end_date', type: 'date', nullable: true, autoIncrement: false, primaryKey: false },
  { name: 'created_at', type: 'timestamp', nullable: true, autoIncrement: false, primaryKey: false, systemGenerated: true },
];

// Default schema for unknown tables
export const defaultTableSchema: TableSchema = {
  columns: [
    { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
    { name: 'data', type: 'text', required: false },
  ],
  data: [],
};
