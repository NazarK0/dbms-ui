/**
 * Connection Utility Functions
 * 
 * Functions for analyzing, filtering, and sorting database connections.
 * 
 * @module utils/connections
 */

import type {
  DatabaseConnection,
  ConnectionSummary,
  ConnectionFilter,
} from '../types';
import { parseDuration } from './parsers';

/**
 * Calculate connection usage percentage
 * 
 * Calculates percentage of active connections relative to maximum.
 * 
 * @param active - Number of active connections
 * @param max - Maximum allowed connections
 * @returns Usage percentage (rounded)
 * 
 * @example
 * ```tsx
 * calculateConnectionUsage(50, 100);  // 50
 * calculateConnectionUsage(75, 100);  // 75
 * calculateConnectionUsage(0, 100);   // 0
 * ```
 */
export const calculateConnectionUsage = (
  active: number,
  max: number
): number => {
  return Math.round((active / max) * 100);
};

/**
 * Get connection summary
 * 
 * Aggregates connection statistics by state, database, and user.
 * 
 * @param connections - Array of database connections
 * @returns Summary statistics
 * 
 * @example
 * ```tsx
 * const summary = getConnectionSummary(connections);
 * // {
 * //   total: 150,
 * //   active: 45,
 * //   idle: 80,
 * //   inTransaction: 25,
 * //   byDatabase: { 'prod_db': 100, 'test_db': 50 },
 * //   byUser: { 'app_user': 120, 'admin': 30 }
 * // }
 * ```
 */
export const getConnectionSummary = (
  connections: DatabaseConnection[]
): ConnectionSummary => {
  const summary: ConnectionSummary = {
    total: connections.length,
    active: 0,
    idle: 0,
    inTransaction: 0,
    byDatabase: {},
    byUser: {},
  };

  connections.forEach((conn) => {
    // Count by state
    if (conn.state === 'активний') summary.active++;
    else if (conn.state === 'очікує') summary.idle++;
    else if (conn.state === 'в транзакції') summary.inTransaction++;

    // Count by database
    summary.byDatabase[conn.database] =
      (summary.byDatabase[conn.database] || 0) + 1;

    // Count by user
    summary.byUser[conn.user] = (summary.byUser[conn.user] || 0) + 1;
  });

  return summary;
};

/**
 * Filter connections
 * 
 * Filters connections based on multiple criteria.
 * 
 * @param connections - Array of database connections
 * @param filter - Filter criteria
 * @returns Filtered connections
 * 
 * @example
 * ```tsx
 * const filtered = filterConnections(connections, {
 *   database: 'prod_db',
 *   state: 'активний',
 *   minDuration: 60
 * });
 * ```
 */
export const filterConnections = (
  connections: DatabaseConnection[],
  filter: ConnectionFilter
): DatabaseConnection[] => {
  return connections.filter((conn) => {
    if (filter.database && conn.database !== filter.database) return false;
    if (filter.user && conn.user !== filter.user) return false;
    if (filter.state && conn.state !== filter.state) return false;
    if (filter.minDuration) {
      const duration = parseDuration(conn.duration);
      if (duration < filter.minDuration) return false;
    }
    return true;
  });
};

/**
 * Sort connections by duration
 * 
 * Sorts connections by duration in ascending or descending order.
 * 
 * @param connections - Array of database connections
 * @param descending - Sort in descending order (default: true)
 * @returns Sorted connections (new array)
 * 
 * @example
 * ```tsx
 * // Longest running first
 * const sorted = sortConnectionsByDuration(connections);
 * 
 * // Shortest running first
 * const sorted = sortConnectionsByDuration(connections, false);
 * ```
 */
export const sortConnectionsByDuration = (
  connections: DatabaseConnection[],
  descending: boolean = true
): DatabaseConnection[] => {
  return [...connections].sort((a, b) => {
    const durationA = parseDuration(a.duration);
    const durationB = parseDuration(b.duration);
    return descending ? durationB - durationA : durationA - durationB;
  });
};

/**
 * Get long-running connections
 * 
 * Filters connections that have been running longer than threshold.
 * 
 * @param connections - Array of database connections
 * @param minSeconds - Minimum duration in seconds (default: 60)
 * @returns Long-running connections
 * 
 * @example
 * ```tsx
 * // Connections running > 60 seconds
 * const longRunning = getLongRunningConnections(connections);
 * 
 * // Connections running > 5 minutes
 * const veryLongRunning = getLongRunningConnections(connections, 300);
 * ```
 */
export const getLongRunningConnections = (
  connections: DatabaseConnection[],
  minSeconds: number = 60
): DatabaseConnection[] => {
  return connections.filter((conn) => {
    const duration = parseDuration(conn.duration);
    return duration >= minSeconds;
  });
};

/**
 * Get active queries
 * 
 * Filters connections with actively executing queries (not IDLE).
 * 
 * @param connections - Array of database connections
 * @returns Active query connections
 * 
 * @example
 * ```tsx
 * const activeQueries = getActiveQueries(connections);
 * console.log(`${activeQueries.length} queries currently executing`);
 * ```
 */
export const getActiveQueries = (
  connections: DatabaseConnection[]
): DatabaseConnection[] => {
  return connections.filter(
    (conn) => conn.state === 'активний' && conn.query !== 'IDLE'
  );
};
