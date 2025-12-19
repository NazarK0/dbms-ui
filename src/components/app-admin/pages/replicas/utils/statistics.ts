/**
 * Statistical calculation functions for Replica Clusters
 */

import type { ClusterServer, ReplicationActivityRow } from '../types';
import { parseLagMs } from './parsers';

/**
 * Calculate average replication lag
 */
export const calculateAvgLag = (clusters: ClusterServer[]): number => {
  const replicas = clusters.filter(c => c.role === 'Replica');
  if (replicas.length === 0) return 0;
  
  const totalLag = replicas.reduce((sum, replica) => {
    return sum + parseLagMs(replica.replicationLag);
  }, 0);
  
  return Math.round(totalLag / replicas.length);
};

/**
 * Get cluster health status
 */
export const getClusterHealth = (clusters: ClusterServer[]): {
  healthy: number;
  warning: number;
  error: number;
  total: number;
} => {
  const health = {
    healthy: 0,
    warning: 0,
    error: 0,
    total: clusters.length,
  };
  
  clusters.forEach(cluster => {
    if (cluster.status === 'healthy') health.healthy++;
    else if (cluster.status === 'warning') health.warning++;
    else if (cluster.status === 'error') health.error++;
  });
  
  return health;
};

/**
 * Get total connections across all clusters
 */
export const getTotalConnections = (clusters: ClusterServer[]): number => {
  return clusters.reduce((sum, cluster) => sum + cluster.connections, 0);
};

/**
 * Get LSN lag between sent and flushed
 */
export const calculateLSNLag = (activity: ReplicationActivityRow): string => {
  // Simple comparison - in reality would parse LSN hex values
  if (activity.sentLSN === activity.flushLSN) {
    return '0 bytes';
  }
  return 'Calculating...';
};
