/**
 * Utility functions for Table Browser components
 */

import type { ColumnSchema, TableDataRow, KeyType } from './types';

/**
 * Get badge variant for column key type
 */
export const getKeyBadgeVariant = (key: KeyType): 'default' | 'secondary' | 'outline' => {
  switch (key) {
    case 'PRI':
      return 'default';
    case 'UNI':
      return 'secondary';
    case 'FOR':
      return 'outline';
    default:
      return 'outline';
  }
};

/**
 * Get key type display text
 */
export const getKeyTypeText = (key: KeyType): string => {
  switch (key) {
    case 'PRI':
      return 'Primary Key';
    case 'UNI':
      return 'Unique';
    case 'FOR':
      return 'Foreign Key';
    default:
      return '';
  }
};

/**
 * Filter tables by search term
 */
export const filterTables = (tables: string[], searchTerm: string): string[] => {
  if (!searchTerm) return tables;
  return tables.filter((table) =>
    table.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Get column count for a table
 */
export const getColumnCount = (schema: ColumnSchema[]): number => {
  return schema.length;
};

/**
 * Check if column has a key constraint
 */
export const hasKeyConstraint = (column: ColumnSchema): boolean => {
  return column.key !== '';
};

/**
 * Get primary key columns
 */
export const getPrimaryKeyColumns = (schema: ColumnSchema[]): ColumnSchema[] => {
  return schema.filter(col => col.key === 'PRI');
};

/**
 * Get unique key columns
 */
export const getUniqueKeyColumns = (schema: ColumnSchema[]): ColumnSchema[] => {
  return schema.filter(col => col.key === 'UNI');
};

/**
 * Get foreign key columns
 */
export const getForeignKeyColumns = (schema: ColumnSchema[]): ColumnSchema[] => {
  return schema.filter(col => col.key === 'FOR');
};

/**
 * Get nullable columns
 */
export const getNullableColumns = (schema: ColumnSchema[]): ColumnSchema[] => {
  return schema.filter(col => col.nullable);
};

/**
 * Get non-nullable columns
 */
export const getNonNullableColumns = (schema: ColumnSchema[]): ColumnSchema[] => {
  return schema.filter(col => !col.nullable);
};

/**
 * Check if column is nullable
 */
export const isNullable = (column: ColumnSchema): boolean => {
  return column.nullable;
};

/**
 * Check if column has default value
 */
export const hasDefaultValue = (column: ColumnSchema): boolean => {
  return column.default !== null;
};

/**
 * Format column type for display
 */
export const formatColumnType = (type: string): string => {
  return type;
};

/**
 * Get column names from schema
 */
export const getColumnNames = (schema: ColumnSchema[]): string[] => {
  return schema.map(col => col.column);
};

/**
 * Get column by name
 */
export const getColumnByName = (schema: ColumnSchema[], columnName: string): ColumnSchema | undefined => {
  return schema.find(col => col.column === columnName);
};

/**
 * Check if table has data
 */
export const hasTableData = (data: TableDataRow[]): boolean => {
  return data && data.length > 0;
};

/**
 * Get row count
 */
export const getRowCount = (data: TableDataRow[]): number => {
  return data ? data.length : 0;
};

/**
 * Get table data keys (column names from data)
 */
export const getDataKeys = (data: TableDataRow[]): string[] => {
  if (!data || data.length === 0) return [];
  return Object.keys(data[0]);
};

/**
 * Limit table data rows
 */
export const limitTableData = (data: TableDataRow[], limit: number): TableDataRow[] => {
  return data.slice(0, limit);
};

/**
 * Format cell value for display
 */
export const formatCellValue = (value: any): string => {
  if (value === null || value === undefined) {
    return '—';
  }
  return String(value);
};

/**
 * Check if value is null
 */
export const isNullValue = (value: any): boolean => {
  return value === null || value === undefined;
};

/**
 * Get table statistics
 */
export const getTableStats = (
  schema: ColumnSchema[],
  data: TableDataRow[]
): {
  columns: number;
  rows: number;
  primaryKeys: number;
  foreignKeys: number;
  uniqueKeys: number;
  nullableColumns: number;
} => {
  return {
    columns: schema.length,
    rows: data.length,
    primaryKeys: getPrimaryKeyColumns(schema).length,
    foreignKeys: getForeignKeyColumns(schema).length,
    uniqueKeys: getUniqueKeyColumns(schema).length,
    nullableColumns: getNullableColumns(schema).length,
  };
};

/**
 * Sort columns by key type (PRI first, then UNI, FOR, others)
 */
export const sortColumnsByKey = (schema: ColumnSchema[]): ColumnSchema[] => {
  const keyOrder: Record<KeyType, number> = {
    'PRI': 1,
    'UNI': 2,
    'FOR': 3,
    '': 4,
  };
  
  return [...schema].sort((a, b) => {
    return keyOrder[a.key] - keyOrder[b.key];
  });
};

/**
 * Filter columns by type
 */
export const filterColumnsByType = (schema: ColumnSchema[], type: string): ColumnSchema[] => {
  return schema.filter(col => col.type.toLowerCase().includes(type.toLowerCase()));
};

/**
 * Get numeric columns
 */
export const getNumericColumns = (schema: ColumnSchema[]): ColumnSchema[] => {
  const numericTypes = ['integer', 'int', 'bigint', 'smallint', 'decimal', 'numeric', 'real', 'double', 'float'];
  return schema.filter(col => 
    numericTypes.some(type => col.type.toLowerCase().includes(type))
  );
};

/**
 * Get text columns
 */
export const getTextColumns = (schema: ColumnSchema[]): ColumnSchema[] => {
  const textTypes = ['varchar', 'char', 'text'];
  return schema.filter(col => 
    textTypes.some(type => col.type.toLowerCase().includes(type))
  );
};

/**
 * Get timestamp columns
 */
export const getTimestampColumns = (schema: ColumnSchema[]): ColumnSchema[] => {
  const timeTypes = ['timestamp', 'date', 'time'];
  return schema.filter(col => 
    timeTypes.some(type => col.type.toLowerCase().includes(type))
  );
};

/**
 * Validate table name
 */
export const isValidTableName = (name: string): boolean => {
  // PostgreSQL table name rules
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
};

/**
 * Generate CREATE TABLE SQL
 */
export const generateCreateTableSQL = (tableName: string, schema: ColumnSchema[]): string => {
  const columns = schema.map(col => {
    let sql = `  ${col.column} ${col.type}`;
    if (!col.nullable) sql += ' NOT NULL';
    if (col.default) sql += ` DEFAULT ${col.default}`;
    return sql;
  }).join(',\n');
  
  const primaryKeys = getPrimaryKeyColumns(schema).map(col => col.column);
  const pkConstraint = primaryKeys.length > 0 
    ? `,\n  PRIMARY KEY (${primaryKeys.join(', ')})`
    : '';
  
  return `CREATE TABLE ${tableName} (\n${columns}${pkConstraint}\n);`;
};

/**
 * Check if schema has primary key
 */
export const hasPrimaryKey = (schema: ColumnSchema[]): boolean => {
  return schema.some(col => col.key === 'PRI');
};

/**
 * Check if schema has foreign keys
 */
export const hasForeignKeys = (schema: ColumnSchema[]): boolean => {
  return schema.some(col => col.key === 'FOR');
};

/**
 * Get column type category
 */
export const getColumnTypeCategory = (type: string): 'numeric' | 'text' | 'timestamp' | 'boolean' | 'other' => {
  const lowerType = type.toLowerCase();
  
  if (/int|decimal|numeric|real|double|float/.test(lowerType)) {
    return 'numeric';
  } else if (/varchar|char|text/.test(lowerType)) {
    return 'text';
  } else if (/timestamp|date|time/.test(lowerType)) {
    return 'timestamp';
  } else if (/bool/.test(lowerType)) {
    return 'boolean';
  } else {
    return 'other';
  }
};

/**
 * Calculate estimated table size
 */
export const estimateTableSize = (schema: ColumnSchema[], rowCount: number): string => {
  // Rough estimation based on column types
  let bytesPerRow = 0;
  
  schema.forEach(col => {
    const type = col.type.toLowerCase();
    if (type.includes('integer')) bytesPerRow += 4;
    else if (type.includes('bigint')) bytesPerRow += 8;
    else if (type.includes('varchar')) {
      const match = type.match(/\((\d+)\)/);
      bytesPerRow += match ? parseInt(match[1]) : 255;
    }
    else if (type.includes('text')) bytesPerRow += 100; // average
    else if (type.includes('timestamp')) bytesPerRow += 8;
    else bytesPerRow += 20; // default
  });
  
  const totalBytes = bytesPerRow * rowCount;
  
  if (totalBytes < 1024) return `${totalBytes} B`;
  if (totalBytes < 1024 * 1024) return `${(totalBytes / 1024).toFixed(1)} KB`;
  if (totalBytes < 1024 * 1024 * 1024) return `${(totalBytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(totalBytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
};
