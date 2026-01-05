/**
 * Performance Utility Functions
 * 
 * Handles performance metric calculations and analysis including:
 * - Status evaluation
 * - Statistical calculations
 * - Sorting and filtering
 * 
 * @module performance.utils
 */

import type { PerformanceMetric } from '../types';


/**
 * Calculate average metric value
 * 
 * Computes the mean value of performance metrics.
 * Returns 0 for empty arrays.
 * 
 * @param metrics - Array of performance metrics
 * @returns Average value (rounded to integer)
 * 
 * @example
 * ```ts
 * const metrics = [
 *   { label: 'CPU', value: 45, color: '...' },
 *   { label: 'Memory', value: 60, color: '...' }
 * ];
 * calculateAverageMetric(metrics) // 53
 * ```
 */
export const calculateAverageMetric = (
  metrics: PerformanceMetric[]
): number => {
  if (metrics.length === 0) return 0;
  const sum = metrics.reduce((acc, metric) => acc + metric.value, 0);
  return Math.round(sum / metrics.length);
};

/**
 * Get highest metric
 * 
 * Finds the metric with the highest value.
 * Returns null for empty arrays.
 * 
 * @param metrics - Array of performance metrics
 * @returns Metric with highest value or null
 * 
 * @example
 * ```ts
 * const highest = getHighestMetric(metrics);
 * console.log(highest.label); // "Memory"
 * console.log(highest.value); // 87
 * ```
 */
export const getHighestMetric = (
  metrics: PerformanceMetric[]
): PerformanceMetric | null => {
  if (metrics.length === 0) return null;
  return metrics.reduce((max, metric) =>
    metric.value > max.value ? metric : max
  );
};

/**
 * Get lowest metric
 * 
 * Finds the metric with the lowest value.
 * Returns null for empty arrays.
 * 
 * @param metrics - Array of performance metrics
 * @returns Metric with lowest value or null
 * 
 * @example
 * ```ts
 * const lowest = getLowestMetric(metrics);
 * console.log(lowest.label); // "CPU"
 * console.log(lowest.value); // 23
 * ```
 */
export const getLowestMetric = (
  metrics: PerformanceMetric[]
): PerformanceMetric | null => {
  if (metrics.length === 0) return null;
  return metrics.reduce((min, metric) =>
    metric.value < min.value ? metric : min
  );
};

/**
 * Sort metrics by value
 * 
 * Sorts metrics in ascending or descending order by value.
 * Returns a new array (does not mutate original).
 * 
 * @param metrics - Array of performance metrics
 * @param ascending - Sort direction (default: true)
 * @returns Sorted array
 * 
 * @example
 * ```ts
 * sortMetricsByValue(metrics, true)  // Low to high
 * sortMetricsByValue(metrics, false) // High to low
 * ```
 */
export const sortMetricsByValue = (
  metrics: PerformanceMetric[],
  ascending: boolean = true
): PerformanceMetric[] => {
  return [...metrics].sort((a, b) =>
    ascending ? a.value - b.value : b.value - a.value
  );
};

/**
 * Filter metrics by threshold
 * 
 * Filters metrics that meet or exceed a minimum value.
 * 
 * @param metrics - Array of performance metrics
 * @param minValue - Minimum threshold value
 * @returns Filtered array
 * 
 * @example
 * ```ts
 * const highMetrics = filterMetricsByThreshold(metrics, 70);
 * // Returns only metrics with value >= 70
 * ```
 */
export const filterMetricsByThreshold = (
  metrics: PerformanceMetric[],
  minValue: number
): PerformanceMetric[] => {
  return metrics.filter((metric) => metric.value >= minValue);
};
