/**
 * Analytics for Table Browser
 * 
 * Функції для аналізу та статистики таблиць
 */

import type { ColumnSchema, TableDataRow } from '../types';
import { getPrimaryKeyColumns, getUniqueKeyColumns, getForeignKeyColumns, getNullableColumns } from './column-filters';

/**
 * Get table statistics
 * 
 * @param schema - Table schema
 * @param data - Table data rows
 * @returns Object with various table statistics
 * 
 * @example
 * ```typescript
 * const stats = getTableStats(schema, data);
 * // {
 * //   columns: 8,
 * //   rows: 1523,
 * //   primaryKeys: 1,
 * //   foreignKeys: 2,
 * //   uniqueKeys: 1,
 * //   nullableColumns: 4
 * // }
 * ```
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
 * Calculate estimated table size
 * 
 * @param schema - Table schema
 * @param rowCount - Number of rows in the table
 * @returns Formatted string with estimated size (B, KB, MB, GB)
 * 
 * @description
 * Rough estimation based on column types:
 * - INTEGER: 4 bytes
 * - BIGINT: 8 bytes
 * - VARCHAR(n): n bytes
 * - TEXT: 100 bytes average
 * - TIMESTAMP: 8 bytes
 * - Other: 20 bytes default
 * 
 * @example
 * ```typescript
 * estimateTableSize(schema, 1000);
 * // '45.2 KB'
 * 
 * estimateTableSize(schema, 1000000);
 * // '45.2 MB'
 * ```
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
