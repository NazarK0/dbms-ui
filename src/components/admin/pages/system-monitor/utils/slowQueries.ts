/**
 * Slow Query Utility Functions
 * 
 * Functions for filtering and sorting slow queries.
 * 
 * @module utils/slowQueries
 */

import type { SlowQuery, SlowQueryFilter } from '../types';
import { parseQueryDuration } from './parsers';

/**
 * Filter slow queries
 * 
 * Filters slow queries based on database, call count, and duration criteria.
 * 
 * @param queries - Array of slow queries
 * @param filter - Filter criteria
 * @returns Filtered slow queries
 * 
 * @example
 * ```tsx
 * const filtered = filterSlowQueries(queries, {
 *   database: 'prod_db',
 *   minCalls: 100,
 *   minDuration: 2.0
 * });
 * ```
 */
export const filterSlowQueries = (
  queries: SlowQuery[],
  filter: SlowQueryFilter
): SlowQuery[] => {
  return queries.filter((query) => {
    if (filter.database && query.database !== filter.database) return false;
    if (filter.minCalls && query.calls < filter.minCalls) return false;
    if (filter.minDuration) {
      const duration = parseQueryDuration(query.duration);
      if (duration < filter.minDuration) return false;
    }
    return true;
  });
};

/**
 * Sort slow queries by duration
 * 
 * Sorts slow queries by execution duration in ascending or descending order.
 * 
 * @param queries - Array of slow queries
 * @param descending - Sort in descending order (default: true)
 * @returns Sorted slow queries (new array)
 * 
 * @example
 * ```tsx
 * // Slowest queries first
 * const sorted = sortSlowQueriesByDuration(queries);
 * 
 * // Fastest queries first
 * const sorted = sortSlowQueriesByDuration(queries, false);
 * ```
 */
export const sortSlowQueriesByDuration = (
  queries: SlowQuery[],
  descending: boolean = true
): SlowQuery[] => {
  return [...queries].sort((a, b) => {
    const durationA = parseQueryDuration(a.duration);
    const durationB = parseQueryDuration(b.duration);
    return descending ? durationB - durationA : durationA - durationB;
  });
};

/**
 * Sort slow queries by calls
 * 
 * Sorts slow queries by number of calls in ascending or descending order.
 * 
 * @param queries - Array of slow queries
 * @param descending - Sort in descending order (default: true)
 * @returns Sorted slow queries (new array)
 * 
 * @example
 * ```tsx
 * // Most called queries first
 * const sorted = sortSlowQueriesByCalls(queries);
 * 
 * // Least called queries first
 * const sorted = sortSlowQueriesByCalls(queries, false);
 * ```
 */
export const sortSlowQueriesByCalls = (
  queries: SlowQuery[],
  descending: boolean = true
): SlowQuery[] => {
  return [...queries].sort((a, b) =>
    descending ? b.calls - a.calls : a.calls - b.calls
  );
};
