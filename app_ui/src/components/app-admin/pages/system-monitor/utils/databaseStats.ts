/**
 * Database Statistics Utility Functions
 * 
 * Functions for analyzing and aggregating database statistics.
 * 
 * @module utils/databaseStats
 */

import type { DatabaseStat } from '../types';
import { parseMemoryString } from './parsers';
import { formatBytes } from './formatters';

/**
 * Get top databases by size
 * 
 * Returns databases sorted by size (largest first), limited to specified count.
 * 
 * @param databases - Array of database statistics
 * @param limit - Maximum number of results (default: 5)
 * @returns Top databases by size
 * 
 * @example
 * ```tsx
 * const topDbs = getTopDatabasesBySize(databases, 3);
 * // Returns 3 largest databases
 * ```
 */
export const getTopDatabasesBySize = (
  databases: DatabaseStat[],
  limit: number = 5
): DatabaseStat[] => {
  return [...databases]
    .sort((a, b) => parseMemoryString(b.size) - parseMemoryString(a.size))
    .slice(0, limit);
};

/**
 * Get top databases by connections
 * 
 * Returns databases sorted by connection count (most first), limited to specified count.
 * 
 * @param databases - Array of database statistics
 * @param limit - Maximum number of results (default: 5)
 * @returns Top databases by connections
 * 
 * @example
 * ```tsx
 * const topDbs = getTopDatabasesByConnections(databases, 3);
 * // Returns 3 databases with most connections
 * ```
 */
export const getTopDatabasesByConnections = (
  databases: DatabaseStat[],
  limit: number = 5
): DatabaseStat[] => {
  return [...databases]
    .sort((a, b) => b.connections - a.connections)
    .slice(0, limit);
};

/**
 * Get top databases by TPS
 * 
 * Returns databases sorted by transactions per second (highest first), limited to specified count.
 * 
 * @param databases - Array of database statistics
 * @param limit - Maximum number of results (default: 5)
 * @returns Top databases by TPS
 * 
 * @example
 * ```tsx
 * const topDbs = getTopDatabasesByTps(databases, 3);
 * // Returns 3 databases with highest TPS
 * ```
 */
export const getTopDatabasesByTps = (
  databases: DatabaseStat[],
  limit: number = 5
): DatabaseStat[] => {
  return [...databases].sort((a, b) => b.tps - a.tps).slice(0, limit);
};

/**
 * Calculate average TPS
 * 
 * Calculates average transactions per second across all databases.
 * 
 * @param databases - Array of database statistics
 * @returns Average TPS (rounded)
 * 
 * @example
 * ```tsx
 * const avgTps = calculateAverageTps(databases);
 * console.log(`Average TPS: ${avgTps}`);
 * ```
 */
export const calculateAverageTps = (databases: DatabaseStat[]): number => {
  if (databases.length === 0) return 0;
  const total = databases.reduce((sum, db) => sum + db.tps, 0);
  return Math.round(total / databases.length);
};

/**
 * Calculate average cache hit ratio
 * 
 * Calculates average cache hit ratio across all databases.
 * 
 * @param databases - Array of database statistics
 * @returns Average cache hit ratio (0-100, 2 decimal places)
 * 
 * @example
 * ```tsx
 * const avgCache = calculateAverageCacheHit(databases);
 * console.log(`Average Cache Hit: ${avgCache}%`);
 * ```
 */
export const calculateAverageCacheHit = (databases: DatabaseStat[]): number => {
  if (databases.length === 0) return 0;
  const total = databases.reduce((sum, db) => sum + db.cache_hit, 0);
  return parseFloat((total / databases.length).toFixed(2));
};

/**
 * Calculate total database size
 * 
 * Sums all database sizes and returns formatted total.
 * 
 * @param databases - Array of database statistics
 * @returns Formatted total size string (e.g., "15.3 ГБ")
 * 
 * @example
 * ```tsx
 * const totalSize = calculateTotalDatabaseSize(databases);
 * console.log(`Total Size: ${totalSize}`);
 * // "Total Size: 15.3 ГБ"
 * ```
 */
export const calculateTotalDatabaseSize = (databases: DatabaseStat[]): string => {
  const totalBytes = databases.reduce(
    (sum, db) => sum + parseMemoryString(db.size),
    0
  );
  return formatBytes(totalBytes);
};
