/**
 * Analytics functions for Audit Log
 */

import type { AuditEntry, UserInfo, CategoryInfo, AuditCategory } from '../types';
import { countEntriesByUser, countEntriesByCategory } from './statistics';

/**
 * Get most active users
 */
export const getMostActiveUsers = (entries: AuditEntry[], limit: number = 5): UserInfo[] => {
  const counts = countEntriesByUser(entries);
  return Object.entries(counts)
    .map(([username, count]) => ({ username, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

/**
 * Get most common categories
 */
export const getMostCommonCategories = (entries: AuditEntry[], limit: number = 5): CategoryInfo[] => {
  const counts = countEntriesByCategory(entries);
  return Object.entries(counts)
    .map(([category, count]) => ({ category: category as AuditCategory, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

/**
 * Get entries within time range
 */
export const getEntriesInTimeRange = (
  entries: AuditEntry[],
  start: string,
  end: string
): AuditEntry[] => {
  return entries.filter(entry => 
    entry.timestamp >= start && entry.timestamp <= end
  );
};

/**
 * Get entries by time of day
 */
export const getEntriesByHour = (entries: AuditEntry[]): Record<number, number> => {
  return entries.reduce((acc, entry) => {
    const hour = parseInt(entry.timestamp.split(' ')[1].split(':')[0]);
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
};

/**
 * Get hourly activity
 */
export const getHourlyActivity = (entries: AuditEntry[]): { hour: number; count: number }[] => {
  const hourCounts = getEntriesByHour(entries);
  return Object.entries(hourCounts)
    .map(([hour, count]) => ({ hour: parseInt(hour), count }))
    .sort((a, b) => a.hour - b.hour);
};
