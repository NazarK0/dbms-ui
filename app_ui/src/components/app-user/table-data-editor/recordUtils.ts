/**
 * Record utility functions for filtering and pagination
 */

import type { TableRecord } from './types';

/**
 * Filters records by search term
 * Searches across all record values
 */
export function filterRecords(records: TableRecord[], searchTerm: string): TableRecord[] {
  if (!searchTerm) return records;

  const term = searchTerm.toLowerCase();

  return records.filter((record) =>
    Object.values(record).some((value) =>
      String(value).toLowerCase().includes(term)
    )
  );
}

/**
 * Calculates pagination metadata
 */
export function getPaginationData(
  totalRecords: number,
  currentPage: number,
  itemsPerPage: number
) {
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    totalPages,
    startIndex,
    endIndex,
  };
}

/**
 * Paginates an array of records
 */
export function paginateRecords<T>(
  records: T[],
  currentPage: number,
  itemsPerPage: number
): T[] {
  const { startIndex, endIndex } = getPaginationData(records.length, currentPage, itemsPerPage);
  return records.slice(startIndex, endIndex);
}

/**
 * Gets editable columns (excludes auto-increment and primary keys)
 */
export function getEditableColumns(columns: any[]): any[] {
  return columns.filter((col) => !col.autoIncrement && !col.primaryKey);
}

/**
 * Generates a new record ID (max + 1)
 */
export function generateNewRecordId(records: TableRecord[]): number {
  if (records.length === 0) return 1;
  return Math.max(...records.map((r) => r.id)) + 1;
}
