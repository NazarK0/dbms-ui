/**
 * TypeScript type definitions for Replica Clusters components
 */

export interface ReplicationStat {
  metric: string;
  value: string;
  icon: any;
  color: string;
}

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

export interface TopologyNode {
  id: string;
  name: string;
  type: 'primary' | 'replica';
  host: string;
  location: string;
  status: 'healthy' | 'warning' | 'error';
  lag?: string;
}

export interface AddReplicaFormData {
  name: string;
  host: string;
  port: number;
  location: string;
  replicationMode: 'async' | 'sync';
}
