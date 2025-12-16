/**
 * TypeScript type definitions for Table Browser components
 */

export interface TableInfo {
  name: string;
  owner?: string;
  rowCount?: number;
  size?: string;
  lastModified?: string;
}

export interface ColumnSchema {
  column: string;
  type: string;
  nullable: boolean;
  default: string | null;
  key: 'PRI' | 'UNI' | 'FOR' | '';
}

export interface TableSchema {
  [tableName: string]: ColumnSchema[];
}

export interface TableDataRow {
  [columnName: string]: any;
}

export interface TableData {
  [tableName: string]: TableDataRow[];
}

export type KeyType = 'PRI' | 'UNI' | 'FOR' | '';

export interface TableBrowserProps {
  selectedDatabase?: string;
}

export interface TableListSidebarProps {
  tables: TableInfo[];
  selectedTable: string | null;
  selectedDatabase?: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onTableSelect: (table: string) => void;
}

export interface TableHeaderCardProps {
  tableName: string;
  databaseName?: string;
  columnCount: number;
  owner?: string;
}

export interface TableSchemaViewProps {
  schema: ColumnSchema[];
}

export interface TableDataPreviewProps {
  data: TableDataRow[];
  limit?: number;
  canViewData?: boolean;
}

export interface EmptyTableStateProps {
  message?: string;
  description?: string;
}