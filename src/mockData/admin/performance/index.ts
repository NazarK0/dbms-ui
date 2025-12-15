/**
 * Performance Analyzer Data
 * 
 * Central export for all performance-related mock data.
 * Includes query statistics, slow queries, cache stats, index usage,
 * table statistics, lock information, and wait events.
 */

// Types
export * from './types';

// Data
export * from './queryStats';
export * from './slowQueries';
export * from './cacheStats';
export * from './indexUsage';
export * from './tableStats';
export * from './locks';
export * from './waitEvents';
