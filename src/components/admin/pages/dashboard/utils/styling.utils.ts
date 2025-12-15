/**
 * Styling Utility Functions
 * 
 * Provides CSS class names and icon mappings for dashboard components.
 * Handles activity types, connection states, trends, and performance status.
 * 
 * @module styling.utils
 */

import type { ActivityType, TrendDirection } from '../types';

/**
 * Get activity type color class
 * 
 * Returns Tailwind CSS classes for activity type badges.
 * 
 * @param type - Activity type
 * @returns Tailwind CSS classes
 * 
 * @example
 * ```ts
 * const classes = getActivityTypeColor('success');
 * // "bg-green-100 text-green-700"
 * ```
 */
export const getActivityTypeColor = (type: ActivityType): string => {
  const colors: Record<ActivityType, string> = {
    success: 'bg-green-100 text-green-700',
    info: 'bg-blue-100 text-blue-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
  };
  return colors[type] || colors.info;
};

/**
 * Get activity type icon name
 * 
 * Returns Lucide icon component name for activity type.
 * 
 * @param type - Activity type
 * @returns Icon component name
 * 
 * @example
 * ```ts
 * const iconName = getActivityTypeIcon('success');
 * // "CheckCircle2"
 * ```
 */
export const getActivityTypeIcon = (type: ActivityType): string => {
  const icons: Record<ActivityType, string> = {
    success: 'CheckCircle2',
    info: 'Info',
    warning: 'AlertTriangle',
    error: 'XCircle',
  };
  return icons[type] || icons.info;
};

/**
 * Get connection state color class
 * 
 * Returns Tailwind CSS classes for connection state badges.
 * Supports Ukrainian state names (case-insensitive).
 * 
 * @param state - Connection state (Ukrainian)
 * @returns Tailwind CSS classes
 * 
 * @example
 * ```ts
 * getConnectionStateColor('активний') // "bg-green-100 text-green-700"
 * getConnectionStateColor('очікує')   // "bg-yellow-100 text-yellow-700"
 * getConnectionStateColor('помилка')  // "bg-red-100 text-red-700"
 * ```
 */
export const getConnectionStateColor = (state: string): string => {
  const stateMap: Record<string, string> = {
    активний: 'bg-green-100 text-green-700',
    очікує: 'bg-yellow-100 text-yellow-700',
    простій: 'bg-slate-100 text-slate-700',
    помилка: 'bg-red-100 text-red-700',
  };
  return stateMap[state.toLowerCase()] || 'bg-slate-100 text-slate-700';
};

/**
 * Get trend icon component name
 * 
 * Returns Lucide icon name for trend direction.
 * 
 * @param trend - Trend direction
 * @returns Icon component name
 * 
 * @example
 * ```ts
 * getTrendIcon('up')   // "ArrowUp"
 * getTrendIcon('down') // "ArrowDown"
 * ```
 */
export const getTrendIcon = (trend: TrendDirection): string => {
  return trend === 'up' ? 'ArrowUp' : 'ArrowDown';
};

/**
 * Get trend color variant
 * 
 * Returns UI variant for trend badges.
 * 
 * @param trend - Trend direction
 * @returns Badge variant
 * 
 * @example
 * ```ts
 * getTrendVariant('up')   // "default"
 * getTrendVariant('down') // "secondary"
 * ```
 */
export const getTrendVariant = (
  trend: TrendDirection
): 'default' | 'secondary' => {
  return trend === 'up' ? 'default' : 'secondary';
};

/**
 * Get performance status color
 * 
 * Returns Tailwind CSS text color class for performance status.
 * 
 * @param status - Performance status
 * @returns Tailwind CSS color class
 * 
 * @example
 * ```ts
 * getPerformanceStatusColor('normal')   // "text-green-600"
 * getPerformanceStatusColor('warning')  // "text-yellow-600"
 * getPerformanceStatusColor('critical') // "text-red-600"
 * ```
 */
export const getPerformanceStatusColor = (
  status: 'normal' | 'warning' | 'critical'
): string => {
  const colors = {
    normal: 'text-green-600',
    warning: 'text-yellow-600',
    critical: 'text-red-600',
  };
  return colors[status];
};
