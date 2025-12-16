/**
 * Data Utilities for Table Browser
 * 
 * Функції для роботи з даними таблиць та фільтрації
 */

import type { TableDataRow, TableInfo } from '../types';

/**
 * Filter tables by search term
 * 
 * @param tables - Array of table info objects
 * @param searchTerm - Search string to filter by
 * @returns Filtered array of table info objects
 * 
 * @example
 * ```typescript
 * const tables = [{ name: 'users' }, { name: 'user_profiles' }, { name: 'posts' }];
 * filterTables(tables, 'user');
 * // [{ name: 'users' }, { name: 'user_profiles' }]
 * ```
 */
export const filterTables = (tables: TableInfo[], searchTerm: string): TableInfo[] => {
  if (!searchTerm) return tables;
  return tables.filter((table) =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Check if table has data
 * 
 * @param data - Table data rows
 * @returns True if table has at least one row
 * 
 * @example
 * ```typescript
 * hasTableData([]); // false
 * hasTableData([{ id: 1, name: 'John' }]); // true
 * ```
 */
export const hasTableData = (data: TableDataRow[]): boolean => {
  return data && data.length > 0;
};

/**
 * Get row count
 * 
 * @param data - Table data rows
 * @returns Number of rows in the table
 * 
 * @example
 * ```typescript
 * getRowCount(data); // 150
 * ```
 */
export const getRowCount = (data: TableDataRow[]): number => {
  return data ? data.length : 0;
};

/**
 * Get table data keys (column names from data)
 * 
 * @param data - Table data rows
 * @returns Array of column names from the first row
 * 
 * @example
 * ```typescript
 * const data = [{ id: 1, name: 'John', email: 'john@example.com' }];
 * getDataKeys(data);
 * // ['id', 'name', 'email']
 * ```
 */
export const getDataKeys = (data: TableDataRow[]): string[] => {
  if (!data || data.length === 0) return [];
  return Object.keys(data[0]);
};

/**
 * Limit table data rows
 * 
 * @param data - Table data rows
 * @param limit - Maximum number of rows to return
 * @returns Sliced array with limited rows
 * 
 * @example
 * ```typescript
 * const limited = limitTableData(data, 100);
 * // Returns first 100 rows
 * ```
 */
export const limitTableData = (data: TableDataRow[], limit: number): TableDataRow[] => {
  return data.slice(0, limit);
};

/**
 * Check if value is null
 * 
 * @param value - Value to check
 * @returns True if value is null or undefined
 * 
 * @example
 * ```typescript
 * isNullValue(null);      // true
 * isNullValue(undefined); // true
 * isNullValue(0);         // false
 * isNullValue('');        // false
 * ```
 */
export const isNullValue = (value: any): boolean => {
  return value === null || value === undefined;
};