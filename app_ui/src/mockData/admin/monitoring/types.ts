/**
 * Type definitions for monitoring data
 */

// System Stats
export interface SystemStat {
  label: string;
  value: string;
  percentage: number;
  icon: any;
  color: string;
}

// Database Connections
export interface DatabaseConnection {
  pid: number;
  database: string;
  user: string;
  state: string;
  query: string;
  duration: string;
}

// Slow Queries
export interface SlowQuery {
  query: string;
  duration: string;
  calls: number;
  database: string;
}

// Database Statistics
export interface DatabaseStat {
  name: string;
  size: string;
  connections: number;
  tps: number;
  cache_hit: number;
}

// Replication Stats
export interface ReplicationStat {
  metric: string;
  value: string;
  icon: any;
  color: string;
}

// Replication Activity
export interface ReplicationActivity {
  replica: string;
  database: string;
  lag: string;
  status: string;
  lastSync: string;
}

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
