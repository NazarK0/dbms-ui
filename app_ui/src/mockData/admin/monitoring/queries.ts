/**
 * Slow Queries
 * 
 * Mock data for slow query monitoring and analysis
 */

import type { SlowQuery } from './types';

export const slowQueries: SlowQuery[] = [
  { query: 'SELECT * FROM large_table WHERE complex_condition...', duration: '2.4с', calls: 145, database: 'production_db' },
  { query: 'UPDATE analytics SET processed = true WHERE...', duration: '1.8с', calls: 89, database: 'analytics_db' },
  { query: 'DELETE FROM logs WHERE created_at < NOW() - INTERVAL...', duration: '1.2с', calls: 34, database: 'production_db' },
];
