/**
 * Parsing functions for Replica Clusters
 */

/**
 * Parse lag string to milliseconds
 */
export const parseLagMs = (lag: string): number => {
  const match = lag.match(/(\d+)ms/);
  return match ? parseInt(match[1]) : 0;
};
