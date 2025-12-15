/**
 * State checking functions for Replica Clusters
 */

/**
 * Check if replication is synchronous
 */
export const isSynchronous = (syncState: string): boolean => {
  return syncState === 'sync' || syncState === 'quorum';
};
