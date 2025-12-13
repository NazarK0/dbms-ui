/**
 * Utility functions for Replica Clusters components
 */

import type { ClusterServer, ReplicationActivityRow } from './types';

/**
 * Get status badge variant based on cluster status
 */
export const getStatusVariant = (status: 'healthy' | 'warning' | 'error'): 'default' | 'secondary' | 'destructive' => {
  switch (status) {
    case 'healthy':
      return 'default';
    case 'warning':
      return 'secondary';
    case 'error':
      return 'destructive';
    default:
      return 'secondary';
  }
};

/**
 * Get status text for display
 */
export const getStatusText = (status: 'healthy' | 'warning' | 'error'): string => {
  switch (status) {
    case 'healthy':
      return 'Healthy';
    case 'warning':
      return 'Warning';
    case 'error':
      return 'Error';
    default:
      return 'Unknown';
  }
};

/**
 * Get lag badge variant based on lag value
 */
export const getLagVariant = (lag: string): 'default' | 'secondary' | 'destructive' => {
  const lagValue = parseInt(lag);
  
  if (lagValue === 0 || isNaN(lagValue)) {
    return 'default';
  } else if (lagValue > 100) {
    return 'destructive';
  } else {
    return 'secondary';
  }
};

/**
 * Parse lag string to milliseconds
 */
export const parseLagMs = (lag: string): number => {
  const match = lag.match(/(\d+)ms/);
  return match ? parseInt(match[1]) : 0;
};

/**
 * Format lag for display
 */
export const formatLag = (lag: string): string => {
  const lagValue = parseLagMs(lag);
  
  if (lagValue === 0) {
    return 'No lag';
  } else if (lagValue < 1000) {
    return `${lagValue}ms`;
  } else {
    return `${(lagValue / 1000).toFixed(2)}s`;
  }
};

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
 * Get location display name
 */
export const getLocationDisplay = (location: string): string => {
  const locationMap: Record<string, string> = {
    'us-east': 'US East (Virginia)',
    'us-west': 'US West (Oregon)',
    'eu-west': 'EU (Ireland)',
    'ap-southeast': 'Asia Pacific (Singapore)',
    'ap-northeast': 'Asia Pacific (Tokyo)',
  };
  
  return locationMap[location] || location;
};

/**
 * Get all available locations
 */
export const getAvailableLocations = (): Array<{ value: string; label: string }> => {
  return [
    { value: 'us-east', label: 'US East (Virginia)' },
    { value: 'us-west', label: 'US West (Oregon)' },
    { value: 'eu-west', label: 'EU (Ireland)' },
    { value: 'ap-southeast', label: 'Asia Pacific (Singapore)' },
    { value: 'ap-northeast', label: 'Asia Pacific (Tokyo)' },
  ];
};

/**
 * Validate replica configuration
 */
export const validateReplicaConfig = (data: {
  name: string;
  host: string;
  port: number;
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data.name || data.name.trim() === '') {
    errors.push('Назва репліки обов\'язкова');
  }
  
  if (!data.host || data.host.trim() === '') {
    errors.push('Host обов\'язковий');
  } else if (!/^[a-zA-Z0-9.-]+$/.test(data.host)) {
    errors.push('Неправильний формат host');
  }
  
  if (!data.port || data.port < 1 || data.port > 65535) {
    errors.push('Port має бути в діапазоні 1-65535');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Check if cluster is primary
 */
export const isPrimary = (cluster: ClusterServer): boolean => {
  return cluster.role === 'Primary';
};

/**
 * Check if cluster is replica
 */
export const isReplica = (cluster: ClusterServer): boolean => {
  return cluster.role === 'Replica';
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
 * Sort clusters by role (Primary first)
 */
export const sortClustersByRole = (clusters: ClusterServer[]): ClusterServer[] => {
  return [...clusters].sort((a, b) => {
    if (a.role === 'Primary' && b.role !== 'Primary') return -1;
    if (a.role !== 'Primary' && b.role === 'Primary') return 1;
    return 0;
  });
};

/**
 * Filter replicas by status
 */
export const filterReplicasByStatus = (
  clusters: ClusterServer[],
  status: 'healthy' | 'warning' | 'error'
): ClusterServer[] => {
  return clusters.filter(c => c.role === 'Replica' && c.status === status);
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

/**
 * Check if replication is synchronous
 */
export const isSynchronous = (syncState: string): boolean => {
  return syncState === 'sync' || syncState === 'quorum';
};

/**
 * Format connection string
 */
export const formatConnectionString = (cluster: ClusterServer): string => {
  return `postgresql://${cluster.host}:${cluster.port}`;
};

/**
 * Get replica count
 */
export const getReplicaCount = (clusters: ClusterServer[]): number => {
  return clusters.filter(c => c.role === 'Replica').length;
};

/**
 * Get primary cluster
 */
export const getPrimaryCluster = (clusters: ClusterServer[]): ClusterServer | undefined => {
  return clusters.find(c => c.role === 'Primary');
};

/**
 * Get replica clusters
 */
export const getReplicaClusters = (clusters: ClusterServer[]): ClusterServer[] => {
  return clusters.filter(c => c.role === 'Replica');
};
