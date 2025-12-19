/**
 * TypeScript types for DatabaseBrowser component
 */

// Re-export types from centralized mock data
export type { TableInfo as Table, Database } from '../../../mockData/user/databases';

export interface DatabaseBrowserHeaderProps {
  propSelectedDatabase?: string | null;
  onBack?: () => void;
}

export interface DatabaseBrowserTablesViewProps {
  database: string;
  tables: import('../../../mockData/user/databases').TableInfo[];
  searchTerm: string;
  copied: boolean;
  onTableSelect: (database: string, table: string, permissions: string[]) => void;
  onCopy: (text: string) => void;
}

export interface DatabaseBrowserGridViewProps {
  databases: Database[];
  selectedDatabase: string | null;
  searchTerm: string;
  copied: boolean;
  onDatabaseSelect: (dbName: string) => void;
  onTableSelect: (database: string, table: string, permissions: string[]) => void;
  onCopy: (text: string) => void;
}