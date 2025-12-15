/**
 * Query Statistics
 * 
 * Mock data for query performance statistics and metrics
 */

import type { QueryStat } from './types';

export const queryStats: QueryStat[] = [
  {
    query: 'SELECT * FROM orders WHERE user_id = $1 AND status = $2',
    calls: 15234,
    totalTime: '45.2с',
    avgTime: '2.97мс',
    minTime: '0.8мс',
    maxTime: '125мс',
    rows: 152340,
    hitRatio: 98.5,
  },
  {
    query: 'UPDATE users SET last_login = NOW() WHERE id = $1',
    calls: 8521,
    totalTime: '12.4с',
    avgTime: '1.45мс',
    minTime: '0.5мс',
    maxTime: '45мс',
    rows: 8521,
    hitRatio: 99.2,
  },
  {
    query: 'SELECT p.*, c.name as category FROM products p JOIN categories c ON...',
    calls: 3421,
    totalTime: '28.7с',
    avgTime: '8.39мс',
    minTime: '2.1мс',
    maxTime: '234мс',
    rows: 68420,
    hitRatio: 85.3,
  },
  {
    query: 'INSERT INTO logs (level, message, created_at) VALUES ($1, $2, $3)',
    calls: 42134,
    totalTime: '18.9с',
    avgTime: '0.45мс',
    minTime: '0.2мс',
    maxTime: '12мс',
    rows: 42134,
    hitRatio: 100,
  },
  {
    query: 'SELECT COUNT(*) FROM order_items WHERE order_id IN (SELECT...)',
    calls: 1234,
    totalTime: '156.8с',
    avgTime: '127.1мс',
    minTime: '45мс',
    maxTime: '1.2с',
    rows: 1234,
    hitRatio: 45.2,
  },
];
