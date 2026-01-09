/**
 * Lock Information
 * 
 * Mock data for database lock monitoring and analysis
 */

import type { LockInfo } from './types';

export const lockInformation: LockInfo[] = [
  {
    pid: 12345,
    database: 'production_db',
    relation: 'orders',
    mode: 'RowExclusiveLock',
    granted: true,
    query: 'UPDATE orders SET status = $1 WHERE id = $2',
    duration: '00:00:03',
  },
  {
    pid: 12346,
    database: 'production_db',
    relation: 'orders',
    mode: 'RowExclusiveLock',
    granted: false,
    query: 'UPDATE orders SET status = $1 WHERE id = $3',
    duration: '00:00:45',
  },
  {
    pid: 12347,
    database: 'production_db',
    relation: 'users',
    mode: 'AccessShareLock',
    granted: true,
    query: 'SELECT * FROM users WHERE id = $1',
    duration: '00:00:01',
  },
];
