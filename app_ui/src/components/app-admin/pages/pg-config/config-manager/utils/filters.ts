/**
 * Filtering and grouping functions for PostgreSQL Configuration
 */

import type { ConfigParam } from '../types';

/**
 * Get unique categories from config parameters
 */
export const getCategories = (params: ConfigParam[]): string[] => {
  return Array.from(new Set(params.map(p => p.category)));
};

/**
 * Filter parameters by category
 */
export const getParamsByCategory = (params: ConfigParam[], category: string): ConfigParam[] => {
  return params.filter(p => p.category === category);
};
