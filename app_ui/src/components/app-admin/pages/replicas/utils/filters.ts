/**
 * Filtering and sorting functions for Replica Clusters
 */

import type { ClusterServer } from '../types';

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
