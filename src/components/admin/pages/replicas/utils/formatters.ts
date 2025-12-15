/**
 * Formatting functions for Replica Clusters
 */

import type { ClusterServer } from '../types';
import { parseLagMs } from './parsers';

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
 * Format connection string
 */
export const formatConnectionString = (cluster: ClusterServer): string => {
  return `postgresql://${cluster.host}:${cluster.port}`;
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
