/**
 * Column Filters for Table Browser
 * 
 * Функції для фільтрації колонок за різними критеріями
 */

import type { ColumnSchema } from '../types';

/**
 * Get primary key columns
 * 
 * @param schema - Table schema
 * @returns Array of primary key columns
 * 
 * @example
 * ```typescript
 * const pkColumns = getPrimaryKeyColumns(schema);
 * // [{ column: 'id', type: 'INTEGER', key: 'PRI', ... }]
 * ```
 */
export const getPrimaryKeyColumns = (schema: ColumnSchema[]): ColumnSchema[] => {
  return schema.filter(col => col.key === 'PRI');
};

/**
 * Get unique key columns
 * 
 * @param schema - Table schema
 * @returns Array of unique key columns
 * 
 * @example
 * ```typescript
 * const uniqueColumns = getUniqueKeyColumns(schema);
 * // [{ column: 'email', type: 'VARCHAR', key: 'UNI', ... }]
 * ```
 */
export const getUniqueKeyColumns = (schema: ColumnSchema[]): ColumnSchema[] => {
  return schema.filter(col => col.key === 'UNI');
};

/**
 * Get foreign key columns
 * 
 * @param schema - Table schema
 * @returns Array of foreign key columns
 * 
 * @example
 * ```typescript
 * const fkColumns = getForeignKeyColumns(schema);
 * // [{ column: 'user_id', type: 'INTEGER', key: 'FOR', ... }]
 * ```
 */
export const getForeignKeyColumns = (schema: ColumnSchema[]): ColumnSchema[] => {
  return schema.filter(col => col.key === 'FOR');
};

/**
 * Get nullable columns
 * 
 * @param schema - Table schema
 * @returns Array of nullable columns
 * 
 * @example
 * ```typescript
 * const nullableColumns = getNullableColumns(schema);
 * // [{ column: 'middle_name', nullable: true, ... }]
 * ```
 */
export const getNullableColumns = (schema: ColumnSchema[]): ColumnSchema[] => {
  return schema.filter(col => col.nullable);
};

/**
 * Get non-nullable columns
 * 
 * @param schema - Table schema
 * @returns Array of non-nullable columns
 * 
 * @example
 * ```typescript
 * const requiredColumns = getNonNullableColumns(schema);
 * // [{ column: 'first_name', nullable: false, ... }]
 * ```
 */
export const getNonNullableColumns = (schema: ColumnSchema[]): ColumnSchema[] => {
  return schema.filter(col => !col.nullable);
};

/**
 * Filter columns by type
 * 
 * @param schema - Table schema
 * @param type - Type to filter by (case-insensitive partial match)
 * @returns Array of columns matching the type
 * 
 * @example
 * ```typescript
 * const intColumns = filterColumnsByType(schema, 'integer');
 * const varcharColumns = filterColumnsByType(schema, 'varchar');
 * ```
 */
export const filterColumnsByType = (schema: ColumnSchema[], type: string): ColumnSchema[] => {
  return schema.filter(col => col.type.toLowerCase().includes(type.toLowerCase()));
};

/**
 * Get numeric columns
 * 
 * @param schema - Table schema
 * @returns Array of columns with numeric types
 * 
 * @example
 * ```typescript
 * const numericColumns = getNumericColumns(schema);
 * // Includes: INTEGER, BIGINT, DECIMAL, NUMERIC, FLOAT, etc.
 * ```
 */
export const getNumericColumns = (schema: ColumnSchema[]): ColumnSchema[] => {
  const numericTypes = ['integer', 'int', 'bigint', 'smallint', 'decimal', 'numeric', 'real', 'double', 'float'];
  return schema.filter(col => 
    numericTypes.some(type => col.type.toLowerCase().includes(type))
  );
};

/**
 * Get text columns
 * 
 * @param schema - Table schema
 * @returns Array of columns with text types
 * 
 * @example
 * ```typescript
 * const textColumns = getTextColumns(schema);
 * // Includes: VARCHAR, CHAR, TEXT
 * ```
 */
export const getTextColumns = (schema: ColumnSchema[]): ColumnSchema[] => {
  const textTypes = ['varchar', 'char', 'text'];
  return schema.filter(col => 
    textTypes.some(type => col.type.toLowerCase().includes(type))
  );
};

/**
 * Get timestamp columns
 * 
 * @param schema - Table schema
 * @returns Array of columns with timestamp/date types
 * 
 * @example
 * ```typescript
 * const timeColumns = getTimestampColumns(schema);
 * // Includes: TIMESTAMP, DATE, TIME
 * ```
 */
export const getTimestampColumns = (schema: ColumnSchema[]): ColumnSchema[] => {
  const timeTypes = ['timestamp', 'date', 'time'];
  return schema.filter(col => 
    timeTypes.some(type => col.type.toLowerCase().includes(type))
  );
};
