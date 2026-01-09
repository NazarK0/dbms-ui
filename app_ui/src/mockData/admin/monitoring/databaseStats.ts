/**
 * Database Statistics
 * 
 * Mock data for per-database performance metrics
 */

import type { DatabaseStat } from './types';

export const databaseStats: DatabaseStat[] = [
  { name: 'production_db', size: '1.2 ГБ', connections: 18, tps: 450, cache_hit: 98.5 },
  { name: 'analytics_db', size: '720 МБ', connections: 8, tps: 120, cache_hit: 95.2 },
  { name: 'test_db', size: '340 МБ', connections: 3, tps: 45, cache_hit: 92.8 },
  { name: 'staging_db', size: '890 МБ', connections: 12, tps: 280, cache_hit: 96.7 },
];
