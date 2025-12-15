/**
 * Database Connections
 * 
 * Mock data for active database connections monitoring
 */

import type { DatabaseConnection } from './types';

export const connections: DatabaseConnection[] = [
  { pid: 12345, database: 'production_db', user: 'app_user', state: 'активний', query: 'SELECT * FROM orders WHERE...', duration: '00:00:12' },
  { pid: 12346, database: 'analytics_db', user: 'analyst', state: 'очікує', query: 'IDLE', duration: '00:15:34' },
  { pid: 12347, database: 'production_db', user: 'app_user', state: 'активний', query: 'UPDATE products SET stock = stock - 1...', duration: '00:00:03' },
  { pid: 12348, database: 'test_db', user: 'developer', state: 'активний', query: 'CREATE INDEX idx_user_email ON users(email)', duration: '00:01:23' },
  { pid: 12349, database: 'analytics_db', user: 'analyst', state: 'очікує', query: 'IDLE', duration: '00:45:12' },
];
