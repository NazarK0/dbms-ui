/**
 * Getter functions for Replica Clusters data
 */

import type { ClusterServer } from '../types';

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
