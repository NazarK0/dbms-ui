/**
 * Statistical calculation functions for PostgreSQL Configuration
 */

import type { ConfigParam, ConfigStatistics } from '../types';

/**
 * Calculate configuration statistics
 */
export const calculateStatistics = (params: ConfigParam[]): ConfigStatistics => {
  return {
    totalParams: params.length,
    changed: params.filter(p => p.value !== p.defaultValue).length,
    requiresRestart: params.filter(p => p.requiresRestart && p.value !== p.defaultValue).length,
  };
};

/**
 * Estimate memory usage from configuration
 */
export const estimateMemoryUsage = (params: ConfigParam[]): number => {
  let totalMB = 0;

  params.forEach(param => {
    if (param.category === 'memory' && param.unit) {
      const value = parseFloat(param.value);
      if (param.unit === 'GB') {
        totalMB += value * 1024;
      } else if (param.unit === 'MB') {
        totalMB += value;
      }
    }
  });

  return totalMB;
};
