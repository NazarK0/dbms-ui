/**
 * Column Utilities for Table Browser
 * 
 * Загальні допоміжні функції для роботи з колонками
 */

import type { ColumnSchema, KeyType } from '../types';

/**
 * Get column count for a table
 * 
 * @param schema - Table schema
 * @returns Number of columns in the table
 * 
 * @example
 * ```typescript
 * getColumnCount(schema); // 5
 * ```
 */
export const getColumnCount = (schema: ColumnSchema[]): number => {
  return schema.length;
};

/**
 * Get column names from schema
 * 
 * @param schema - Table schema
 * @returns Array of column names
 * 
 * @example
 * ```typescript
 * getColumnNames(schema);
 * // ['id', 'first_name', 'last_name', 'email', 'created_at']
 * ```
 */
export const getColumnNames = (schema: ColumnSchema[]): string[] => {
  return schema.map(col => col.column);
};

/**
 * Get column by name
 * 
 * @param schema - Table schema
 * @param columnName - Name of the column to find
 * @returns Column schema or undefined if not found
 * 
 * @example
 * ```typescript
 * const emailColumn = getColumnByName(schema, 'email');
 * // { column: 'email', type: 'VARCHAR(255)', ... }
 * ```
 */
export const getColumnByName = (schema: ColumnSchema[], columnName: string): ColumnSchema | undefined => {
  return schema.find(col => col.column === columnName);
};

/**
 * Sort columns by key type (PRI first, then UNI, FOR, others)
 * 
 * @param schema - Table schema
 * @returns New array with columns sorted by key importance
 * 
 * @example
 * ```typescript
 * const sorted = sortColumnsByKey(schema);
 * // Primary keys first, then unique, then foreign, then regular columns
 * ```
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
 * Get column type category
 * 
 * @param type - Column data type
 * @returns Category of the data type
 * 
 * @example
 * ```typescript
 * getColumnTypeCategory('INTEGER');        // 'numeric'
 * getColumnTypeCategory('VARCHAR(255)');   // 'text'
 * getColumnTypeCategory('TIMESTAMP');      // 'timestamp'
 * getColumnTypeCategory('BOOLEAN');        // 'boolean'
 * getColumnTypeCategory('JSON');           // 'other'
 * ```
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
