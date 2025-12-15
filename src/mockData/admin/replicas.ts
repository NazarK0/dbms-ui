/**
 * Mock data for Replica Clusters
 * 
 * BACKEND INTEGRATION:
 * This data should be fetched from backend API endpoints:
 * 
 * - GET /api/replicas/clusters - Get all cluster servers (primary + replicas)
 * - GET /api/replicas/activity - Get replication activity and lag information
 * - GET /api/replicas/stats - Get replication statistics
 * - GET /api/replicas/topology - Get topology configuration for diagram
 * 
 * Database queries:
 * - pg_stat_replication - Active replication connections and lag
 * - pg_replication_slots - Replication slot status
 * - pg_stat_wal_receiver - WAL receiver status (on replicas)
 */

export interface ClusterServer {
  id: number;
  name: string;
  role: 'Primary' | 'Replica';
  status: 'healthy' | 'warning' | 'error';
  location: string;
  host: string;
  port: number;
  connections: number;
  replicationLag: string;
}

export interface ReplicationActivityRow {
  replica: string;
  state: string;
  syncState: string;
  sentLSN: string;
  writeLSN: string;
  flushLSN: string;
  lag: string;
}

export const clusters: ClusterServer[] = [
  {
    id: 1,
    name: 'Production Primary',
    role: 'Primary',
    status: 'healthy',
    location: 'US East (Virginia)',
    host: 'primary-db.example.com',
    port: 5432,
    connections: 245,
    replicationLag: '0ms',
  },
  {
    id: 2,
    name: 'Read Replica 1',
    role: 'Replica',
    status: 'healthy',
    location: 'US West (Oregon)',
    host: 'replica-1.example.com',
    port: 5432,
    connections: 87,
    replicationLag: '12ms',
  },
  {
    id: 3,
    name: 'Read Replica 2',
    role: 'Replica',
    status: 'healthy',
    location: 'EU (Ireland)',
    host: 'replica-2.example.com',
    port: 5432,
    connections: 54,
    replicationLag: '45ms',
  },
  {
    id: 4,
    name: 'Read Replica 3',
    role: 'Replica',
    status: 'warning',
    location: 'Asia Pacific (Singapore)',
    host: 'replica-3.example.com',
    port: 5432,
    connections: 23,
    replicationLag: '234ms',
  },
];

export const replicationActivity: ReplicationActivityRow[] = [
  {
    replica: 'replica-1.example.com',
    state: 'streaming',
    syncState: 'async',
    sentLSN: '0/3000060',
    writeLSN: '0/3000060',
    flushLSN: '0/3000060',
    lag: '12ms',
  },
  {
    replica: 'replica-2.example.com',
    state: 'streaming',
    syncState: 'async',
    sentLSN: '0/3000060',
    writeLSN: '0/3000058',
    flushLSN: '0/3000058',
    lag: '45ms',
  },
  {
    replica: 'replica-3.example.com',
    state: 'streaming',
    syncState: 'async',
    sentLSN: '0/3000060',
    writeLSN: '0/3000048',
    flushLSN: '0/3000045',
    lag: '234ms',
  },
];

export const replicationStats = {
  slots: '3',
  avgLag: '97мс',
  throughput: '12.5 МБ/с',
  syncState: '99.8%',
};