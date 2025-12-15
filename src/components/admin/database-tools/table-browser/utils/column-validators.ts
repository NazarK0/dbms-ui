/**
 * Column Validators for Table Browser
 * 
 * Функції для перевірки властивостей колонок та схем
 */

import type { ColumnSchema } from '../types';

/**
 * Check if column has a key constraint
 * 
 * @param column - Column schema to check
 * @returns True if column has any key constraint (PRI, UNI, or FOR)
 * 
 * @example
 * ```typescript
 * hasKeyConstraint({ column: 'id', key: 'PRI', ... }); // true
 * hasKeyConstraint({ column: 'name', key: '', ... });  // false
 * ```
 */
export const hasKeyConstraint = (column: ColumnSchema): boolean => {
  return column.key !== '';
};

/**
 * Check if column is nullable
 * 
 * @param column - Column schema to check
 * @returns True if column allows NULL values
 * 
 * @example
 * ```typescript
 * isNullable({ column: 'middle_name', nullable: true, ... });  // true
 * isNullable({ column: 'first_name', nullable: false, ... }); // false
 * ```
 */
export const isNullable = (column: ColumnSchema): boolean => {
  return column.nullable;
};

/**
 * Check if column has default value
 * 
 * @param column - Column schema to check
 * @returns True if column has a default value defined
 * 
 * @example
 * ```typescript
 * hasDefaultValue({ column: 'status', default: 'active', ... }); // true
 * hasDefaultValue({ column: 'name', default: null, ... });       // false
 * ```
 */
export const hasDefaultValue = (column: ColumnSchema): boolean => {
  return column.default !== null;
};

/**
 * Check if schema has primary key
 * 
 * @param schema - Table schema to check
 * @returns True if at least one column has primary key constraint
 * 
 * @example
 * ```typescript
 * hasPrimaryKey(schema); // true if any column.key === 'PRI'
 * ```
 */
export const hasPrimaryKey = (schema: ColumnSchema[]): boolean => {
  return schema.some(col => col.key === 'PRI');
};

/**
 * Check if schema has foreign keys
 * 
 * @param schema - Table schema to check
 * @returns True if at least one column has foreign key constraint
 * 
 * @example
 * ```typescript
 * hasForeignKeys(schema); // true if any column.key === 'FOR'
 * ```
 */
export const hasForeignKeys = (schema: ColumnSchema[]): boolean => {
  return schema.some(col => col.key === 'FOR');
};
