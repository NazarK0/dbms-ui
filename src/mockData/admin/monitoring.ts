import { Cpu, HardDrive, Activity, Server, Clock, Zap } from 'lucide-react';

// System Stats
export interface SystemStat {
  label: string;
  value: string;
  percentage: number;
  icon: any;
  color: string;
}

export const systemStats: SystemStat[] = [
  { label: 'Використання CPU', value: '34%', percentage: 34, icon: Cpu, color: 'from-lime-500 to-green-600' },
  { label: 'Використання пам\'яті', value: '2.1 ГБ / 8 ГБ', percentage: 26, icon: HardDrive, color: 'from-green-500 to-lime-600' },
  { label: 'Активні з\'єднання', value: '45 / 200', percentage: 23, icon: Activity, color: 'from-yellow-500 to-lime-600' },
  { label: 'Використання диску', value: '125 ГБ / 500 ГБ', percentage: 25, icon: Server, color: 'from-lime-600 to-yellow-600' },
];

// Database Connections
export interface DatabaseConnection {
  pid: number;
  database: string;
  user: string;
  state: string;
  query: string;
  duration: string;
}

export const connections: DatabaseConnection[] = [
  { pid: 12345, database: 'production_db', user: 'app_user', state: 'активний', query: 'SELECT * FROM orders WHERE...', duration: '00:00:12' },
  { pid: 12346, database: 'analytics_db', user: 'analyst', state: 'очікує', query: 'IDLE', duration: '00:15:34' },
  { pid: 12347, database: 'production_db', user: 'app_user', state: 'активний', query: 'UPDATE products SET stock = stock - 1...', duration: '00:00:03' },
  { pid: 12348, database: 'test_db', user: 'developer', state: 'активний', query: 'CREATE INDEX idx_user_email ON users(email)', duration: '00:01:23' },
  { pid: 12349, database: 'analytics_db', user: 'analyst', state: 'очікує', query: 'IDLE', duration: '00:45:12' },
];

// Slow Queries
export interface SlowQuery {
  query: string;
  duration: string;
  calls: number;
  database: string;
}

export const slowQueries: SlowQuery[] = [
  { query: 'SELECT * FROM large_table WHERE complex_condition...', duration: '2.4с', calls: 145, database: 'production_db' },
  { query: 'UPDATE analytics SET processed = true WHERE...', duration: '1.8с', calls: 89, database: 'analytics_db' },
  { query: 'DELETE FROM logs WHERE created_at < NOW() - INTERVAL...', duration: '1.2с', calls: 34, database: 'production_db' },
];

// Database Statistics
export interface DatabaseStat {
  name: string;
  size: string;
  connections: number;
  tps: number;
  cache_hit: number;
}

export const databaseStats: DatabaseStat[] = [
  { name: 'production_db', size: '1.2 ГБ', connections: 18, tps: 450, cache_hit: 98.5 },
  { name: 'analytics_db', size: '720 МБ', connections: 8, tps: 120, cache_hit: 95.2 },
  { name: 'test_db', size: '340 МБ', connections: 3, tps: 45, cache_hit: 92.8 },
  { name: 'staging_db', size: '890 МБ', connections: 12, tps: 280, cache_hit: 96.7 },
];

// Replication Stats
export interface ReplicationStat {
  metric: string;
  value: string;
  icon: any;
  color: string;
}

export const replicationStats: ReplicationStat[] = [
  { metric: 'Слоти реплікації', value: '3', icon: Server, color: 'from-lime-500 to-green-600' },
  { metric: 'Середня затримка', value: '97мс', icon: Clock, color: 'from-green-500 to-lime-600' },
  { metric: 'Швидкість передачі', value: '12.5 МБ/с', icon: Zap, color: 'from-yellow-500 to-lime-600' },
  { metric: 'Стан синхронізації', value: '99.8%', icon: Activity, color: 'from-lime-600 to-yellow-600' },
];

// Replication Activity
export interface ReplicationActivity {
  replica: string;
  database: string;
  lag: string;
  status: string;
  lastSync: string;
}

export const replicationActivity: ReplicationActivity[] = [
  {
    replica: 'Read Replica 1',
    database: 'production_db',
    lag: '45ms',
    status: 'Синхронізовано',
    lastSync: '2 сек тому',
  },
  {
    replica: 'Read Replica 2',
    database: 'production_db',
    lag: '123ms',
    status: 'Синхронізовано',
    lastSync: '5 сек тому',
  },
  {
    replica: 'Standby Replica',
    database: 'production_db',
    lag: '0ms',
    status: 'Синхронний',
    lastSync: 'Real-time',
  },
];

// Replica Clusters
export interface ReplicaCluster {
  id: number;
  name: string;
  primary: {
    host: string;
    port: number;
    status: string;
  };
  replicas: Array<{
    id: number;
    name: string;
    host: string;
    port: number;
    type: string;
    lag: string;
    status: string;
  }>;
  stats: {
    totalSize: string;
    totalConnections: number;
    avgReplicationLag: string;
  };
}

export const clusters: ReplicaCluster[] = [
  {
    id: 1,
    name: 'Production Cluster',
    primary: {
      host: 'primary-db-01.example.com',
      port: 5432,
      status: 'Активний',
    },
    replicas: [
      {
        id: 1,
        name: 'Read Replica 1',
        host: 'replica-01.example.com',
        port: 5432,
        type: 'Асинхронна',
        lag: '45ms',
        status: 'Синхронізовано',
      },
      {
        id: 2,
        name: 'Read Replica 2',
        host: 'replica-02.example.com',
        port: 5432,
        type: 'Асинхронна',
        lag: '123ms',
        status: 'Синхронізовано',
      },
      {
        id: 3,
        name: 'Standby Replica',
        host: 'standby-01.example.com',
        port: 5432,
        type: 'Синхронна',
        lag: '0ms',
        status: 'Синхронний',
      },
    ],
    stats: {
      totalSize: '3.8 ТБ',
      totalConnections: 245,
      avgReplicationLag: '56ms',
    },
  },
  {
    id: 2,
    name: 'Analytics Cluster',
    primary: {
      host: 'analytics-primary.example.com',
      port: 5432,
      status: 'Активний',
    },
    replicas: [
      {
        id: 4,
        name: 'Analytics Replica',
        host: 'analytics-replica-01.example.com',
        port: 5432,
        type: 'Асинхронна',
        lag: '234ms',
        status: 'Синхронізовано',
      },
    ],
    stats: {
      totalSize: '1.2 ТБ',
      totalConnections: 87,
      avgReplicationLag: '234ms',
    },
  },
];
