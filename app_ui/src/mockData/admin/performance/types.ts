/**
 * Type definitions for performance analyzer data
 */

// Query Statistics
export interface QueryStat {
  query: string;
  calls: number;
  totalTime: string;
  avgTime: string;
  minTime: string;
  maxTime: string;
  rows: number;
  hitRatio: number;
}

// Slow Queries with details
export interface SlowQueryDetail {
  query: string;
  avgTime: string;
  calls: number;
  recommendation: string;
  impact: string;
}

// Cache Statistics
export interface CacheStat {
  metric: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

// Index Usage
export interface IndexUsage {
  table: string;
  index: string;
  size: string;
  scans: number;
  rowsRead: number;
  usage: number;
}

// Table Statistics
export interface TableStat {
  name: string;
  rows: string;
  size: string;
  index_size: string;
  seq_scans: number;
  idx_scans: number;
  dead_tuples: number;
  last_vacuum: string;
  last_analyze: string;
}

// Lock Information
export interface LockInfo {
  pid: number;
  database: string;
  relation: string;
  mode: string;
  granted: boolean;
  query: string;
  duration: string;
}

// Wait Events
export interface WaitEvent {
  event_type: string;
  event: string;
  count: number;
  total_wait_time: string;
  avg_wait_time: string;
}
