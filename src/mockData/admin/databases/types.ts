/**
 * TypeScript types for databases
 */

export interface Database {
  name: string;
  owner: string;
  size: string;
  tables: number;
  encoding: string;
  collation: string;
  description?: string;
  type: 'user' | 'template' | 'admin';
}

export interface TemplateDatabase {
  name: string;
  description: string;
  size: string;
  tables: number;
  encoding: string;
  collation: string;
  allowCloning: boolean;
  type: 'template';
}

export interface AdminDatabase {
  name: string;
  owner?: string;
  description: string;
  size: string;
  tables: number;
  encoding: string;
  collation: string;
  type: 'admin';
}