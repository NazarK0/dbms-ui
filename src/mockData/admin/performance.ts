// Performance Analyzer Data

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

// Slow Queries with details
export interface SlowQueryDetail {
  query: string;
  avgTime: string;
  calls: number;
  recommendation: string;
  impact: string;
}

export const slowQueryDetails: SlowQueryDetail[] = [
  {
    query: 'SELECT * FROM large_table WHERE unindexed_column = $1',
    avgTime: '2.4с',
    calls: 145,
    recommendation: 'Створіть індекс для unindexed_column',
    impact: 'Висока',
  },
  {
    query: 'SELECT * FROM orders o JOIN users u ON o.user_id = u.id WHERE...',
    avgTime: '1.8с',
    calls: 89,
    recommendation: 'Оптимізуйте JOIN, використовуйте індекси',
    impact: 'Середня',
  },
  {
    query: 'UPDATE inventory SET quantity = quantity - $1 WHERE product_id...',
    avgTime: '950мс',
    calls: 234,
    recommendation: 'Розгляньте використання партіонування',
    impact: 'Середня',
  },
];

// Cache Statistics
export interface CacheStat {
  metric: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

export const cacheStats: CacheStat[] = [
  { metric: 'Коефіцієнт попадань', value: '98.2%', trend: 'up', percentage: 98.2 },
  { metric: 'Блоки з диску', value: '1.2M', trend: 'down', percentage: 45 },
  { metric: 'Блоки з кешу', value: '58.4M', trend: 'up', percentage: 92 },
  { metric: 'Блоки записані', value: '850K', trend: 'stable', percentage: 68 },
];

// Index Usage
export interface IndexUsage {
  table: string;
  index: string;
  size: string;
  scans: number;
  rowsRead: number;
  usage: number;
}

export const indexUsage: IndexUsage[] = [
  {
    table: 'orders',
    index: 'idx_orders_user_id',
    size: '45 МБ',
    scans: 15234,
    rowsRead: 245678,
    usage: 98,
  },
  {
    table: 'orders',
    index: 'idx_orders_status',
    size: '23 МБ',
    scans: 8945,
    rowsRead: 156789,
    usage: 87,
  },
  {
    table: 'users',
    index: 'idx_users_email',
    size: '12 МБ',
    scans: 23456,
    rowsRead: 23456,
    usage: 100,
  },
  {
    table: 'products',
    index: 'idx_products_category',
    size: '8 МБ',
    scans: 12456,
    rowsRead: 67890,
    usage: 67,
  },
  {
    table: 'sessions',
    index: 'idx_sessions_expires',
    size: '34 МБ',
    scans: 234,
    rowsRead: 156789,
    usage: 8,
  },
];

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

export const tableStatistics: TableStat[] = [
  {
    name: 'orders',
    rows: '1.2M',
    size: '450 МБ',
    index_size: '123 МБ',
    seq_scans: 45,
    idx_scans: 15234,
    dead_tuples: 1234,
    last_vacuum: '2 год тому',
    last_analyze: '1 год тому',
  },
  {
    name: 'users',
    rows: '45K',
    size: '12 МБ',
    index_size: '8 МБ',
    seq_scans: 123,
    idx_scans: 23456,
    dead_tuples: 234,
    last_vacuum: '30 хв тому',
    last_analyze: '15 хв тому',
  },
  {
    name: 'products',
    rows: '234K',
    size: '89 МБ',
    index_size: '34 МБ',
    seq_scans: 234,
    idx_scans: 12456,
    dead_tuples: 567,
    last_vacuum: '1 год тому',
    last_analyze: '45 хв тому',
  },
  {
    name: 'audit_logs',
    rows: '5.6M',
    size: '1.2 ГБ',
    index_size: '234 МБ',
    seq_scans: 12,
    idx_scans: 234,
    dead_tuples: 45678,
    last_vacuum: '12 год тому',
    last_analyze: '6 год тому',
  },
];

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

// Wait Events
export interface WaitEvent {
  event_type: string;
  event: string;
  count: number;
  total_wait_time: string;
  avg_wait_time: string;
}

export const waitEvents: WaitEvent[] = [
  {
    event_type: 'IO',
    event: 'DataFileRead',
    count: 15234,
    total_wait_time: '2.4г',
    avg_wait_time: '12мс',
  },
  {
    event_type: 'Lock',
    event: 'relation',
    count: 234,
    total_wait_time: '45хв',
    avg_wait_time: '115мс',
  },
  {
    event_type: 'IO',
    event: 'WALWrite',
    count: 45678,
    total_wait_time: '1.8г',
    avg_wait_time: '4мс',
  },
];