/**
 * Utility functions for DatabaseBrowser component
 */

import type { Database } from './types';

/**
 * Filters databases by search term
 * Searches in database names and table names
 */
export function filterDatabases(databases: Database[], searchTerm: string): Database[] {
  if (!searchTerm) return databases;

  const term = searchTerm.toLowerCase();

  return databases.filter(
    (db) =>
      db.name.toLowerCase().includes(term) ||
      db.tables.some((table) => table.name.toLowerCase().includes(term))
  );
}

/**
 * Filters tables by search term
 * Searches in table names and descriptions
 */
export function filterTables(
  tables: { name: string; description: string }[],
  searchTerm: string
): typeof tables {
  if (!searchTerm) return tables;

  const term = searchTerm.toLowerCase();

  return tables.filter(
    (table) =>
      table.name.toLowerCase().includes(term) ||
      table.description.toLowerCase().includes(term)
  );
}
