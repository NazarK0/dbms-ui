/**
 * Status & Color Utility Functions
 * 
 * Functions for determining status levels and corresponding colors for various metrics.
 * 
 * @module utils/statusColors
 */

import {
  performanceThresholds,
  cacheHitThresholds,
  tpsCategories,
  slowQueryThresholds,
} from '../data';
import { parseQueryDuration } from './parsers';

/**
 * Get system metric status
 * 
 * Determines status level (normal/warning/critical) based on threshold configuration.
 * 
 * @param metricType - Type of metric (cpu, memory, connections, disk)
 * @param percentage - Current metric value as percentage
 * @returns Status level
 * 
 * @example
 * ```tsx
 * getMetricStatus('cpu', 45);    // 'normal'
 * getMetricStatus('cpu', 75);    // 'warning'
 * getMetricStatus('cpu', 95);    // 'critical'
 * ```
 */
export const getMetricStatus = (
  metricType: keyof typeof performanceThresholds,
  percentage: number
): 'normal' | 'warning' | 'critical' => {
  const thresholds = performanceThresholds[metricType];
  if (!thresholds) return 'normal';

  if (percentage >= thresholds.critical) return 'critical';
  if (percentage >= thresholds.warning) return 'warning';
  return 'normal';
};

/**
 * Get status color class
 * 
 * Returns Tailwind CSS color class for status level.
 * 
 * @param status - Status level
 * @returns Tailwind color class
 * 
 * @example
 * ```tsx
 * getStatusColor('normal');    // 'text-green-600'
 * getStatusColor('warning');   // 'text-yellow-600'
 * getStatusColor('critical');  // 'text-red-600'
 * ```
 */
export const getStatusColor = (
  status: 'normal' | 'warning' | 'critical'
): string => {
  const colors = {
    normal: 'text-green-600',
    warning: 'text-yellow-600',
    critical: 'text-red-600',
  };
  return colors[status];
};

/**
 * Get cache hit ratio status
 * 
 * Determines cache performance level based on hit ratio.
 * 
 * @param ratio - Cache hit ratio (0-100)
 * @returns Cache performance level
 * 
 * @example
 * ```tsx
 * getCacheHitStatus(99.5);  // 'excellent'
 * getCacheHitStatus(95);    // 'good'
 * getCacheHitStatus(85);    // 'acceptable'
 * getCacheHitStatus(70);    // 'poor'
 * ```
 */
export const getCacheHitStatus = (
  ratio: number
): 'excellent' | 'good' | 'acceptable' | 'poor' => {
  if (ratio >= cacheHitThresholds.excellent) return 'excellent';
  if (ratio >= cacheHitThresholds.good) return 'good';
  if (ratio >= cacheHitThresholds.acceptable) return 'acceptable';
  return 'poor';
};

/**
 * Get cache hit color
 * 
 * Returns Tailwind CSS color class for cache hit ratio.
 * 
 * @param ratio - Cache hit ratio (0-100)
 * @returns Tailwind color class
 * 
 * @example
 * ```tsx
 * getCacheHitColor(99.5);  // 'text-green-600'
 * getCacheHitColor(95);    // 'text-lime-600'
 * getCacheHitColor(85);    // 'text-yellow-600'
 * getCacheHitColor(70);    // 'text-red-600'
 * ```
 */
export const getCacheHitColor = (ratio: number): string => {
  const status = getCacheHitStatus(ratio);
  const colors = {
    excellent: 'text-green-600',
    good: 'text-lime-600',
    acceptable: 'text-yellow-600',
    poor: 'text-red-600',
  };
  return colors[status];
};

/**
 * Get TPS category
 * 
 * Categorizes transactions per second into performance tiers.
 * 
 * @param tps - Transactions per second
 * @returns TPS category level
 * 
 * @example
 * ```tsx
 * getTpsCategory(50);    // 'low'
 * getTpsCategory(150);   // 'medium'
 * getTpsCategory(350);   // 'high'
 * getTpsCategory(650);   // 'veryHigh'
 * ```
 */
export const getTpsCategory = (
  tps: number
): 'low' | 'medium' | 'high' | 'veryHigh' => {
  if (tps >= tpsCategories.veryHigh) return 'veryHigh';
  if (tps >= tpsCategories.high) return 'high';
  if (tps >= tpsCategories.medium) return 'medium';
  return 'low';
};

/**
 * Get TPS color
 * 
 * Returns Tailwind CSS color class for TPS category.
 * 
 * @param tps - Transactions per second
 * @returns Tailwind color class
 * 
 * @example
 * ```tsx
 * getTpsColor(50);    // 'text-slate-600'
 * getTpsColor(150);   // 'text-lime-600'
 * getTpsColor(350);   // 'text-green-600'
 * getTpsColor(650);   // 'text-emerald-600'
 * ```
 */
export const getTpsColor = (tps: number): string => {
  const category = getTpsCategory(tps);
  const colors = {
    low: 'text-slate-600',
    medium: 'text-lime-600',
    high: 'text-green-600',
    veryHigh: 'text-emerald-600',
  };
  return colors[category];
};

/**
 * Get slow query severity
 * 
 * Determines severity level for slow query based on duration.
 * 
 * @param duration - Query duration string (e.g., "2.4с")
 * @returns Severity level
 * 
 * @example
 * ```tsx
 * getSlowQuerySeverity("0.5с");   // 'normal'
 * getSlowQuerySeverity("2.5с");   // 'warning'
 * getSlowQuerySeverity("6.0с");   // 'critical'
 * ```
 */
export const getSlowQuerySeverity = (
  duration: string
): 'normal' | 'warning' | 'critical' => {
  const seconds = parseQueryDuration(duration);

  if (seconds >= slowQueryThresholds.critical) return 'critical';
  if (seconds >= slowQueryThresholds.warning) return 'warning';
  return 'normal';
};
