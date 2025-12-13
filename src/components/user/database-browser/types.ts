/**
 * TypeScript types for DatabaseBrowser component
 */

export interface Table {
  name: string;
  records: number;
  size: string;
  permissions: string[];
  rlsEnabled: boolean;
  description: string;
}

export interface Database {
  id: number;
  name: string;
  description: string;
  tables: Table[];
}

export interface DatabaseBrowserHeaderProps {
  propSelectedDatabase?: string | null;
  onBack?: () => void;
}

export interface DatabaseBrowserTablesViewProps {
  database: string;
  tables: Table[];
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
