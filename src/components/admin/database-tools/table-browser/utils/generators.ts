/**
 * SQL Generators for Table Browser
 * 
 * Функції для генерації SQL запитів
 */

import type { ColumnSchema } from '../types';
import { getPrimaryKeyColumns } from './column-filters';

/**
 * Generate CREATE TABLE SQL
 * 
 * @param tableName - Name of the table to create
 * @param schema - Table schema with column definitions
 * @returns SQL CREATE TABLE statement
 * 
 * @description
 * Generates a PostgreSQL CREATE TABLE statement with:
 * - Column definitions (name, type)
 * - NOT NULL constraints
 * - DEFAULT values
 * - PRIMARY KEY constraint
 * 
 * @example
 * ```typescript
 * const sql = generateCreateTableSQL('users', schema);
 * // Output:
 * // CREATE TABLE users (
 * //   id INTEGER NOT NULL,
 * //   first_name VARCHAR(100) NOT NULL,
 * //   last_name VARCHAR(100) NOT NULL,
 * //   email VARCHAR(255) NOT NULL,
 * //   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 * //   PRIMARY KEY (id)
 * // );
 * ```
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
