/**
 * Utility functions for Audit Log components
 */

import { 
  Database, 
  Table as TableIcon, 
  FileCode, 
  Shield, 
  Copy, 
  Activity, 
  User 
} from 'lucide-react';
import type { 
  AuditEntry, 
  AuditStatistics, 
  ActionTypeStatistics, 
  ActionBadgeConfig,
  ActionType,
  AuditCategory,
  UserInfo,
  CategoryInfo,
} from './types';

/**
 * Get icon component for audit category
 */
export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'База даних':
      return Database;
    case 'Таблиця':
      return TableIcon;
    case 'Запит':
      return FileCode;
    case 'Права доступу':
      return Shield;
    case 'Резервна копія':
      return Copy;
    case 'Функція':
      return Activity;
    case 'Тригер':
      return Activity;
    case 'Користувач':
      return User;
    case 'Автентифікація':
      return Shield;
    default:
      return Activity;
  }
};

/**
 * Get badge configuration for action type
 */
export const getActionBadge = (action: ActionType): ActionBadgeConfig => {
  const badges: Record<ActionType, ActionBadgeConfig> = {
    create: { 
      variant: 'default', 
      label: 'Створення', 
      color: 'from-green-500 to-lime-600' 
    },
    update: { 
      variant: 'secondary', 
      label: 'Оновлення', 
      color: 'from-yellow-500 to-lime-600' 
    },
    delete: { 
      variant: 'destructive', 
      label: 'Видалення', 
      color: 'from-red-500 to-red-600' 
    },
    select: { 
      variant: 'outline', 
      label: 'Вибірка', 
      color: 'from-slate-500 to-slate-600' 
    },
    grant: { 
      variant: 'default', 
      label: 'Надання прав', 
      color: 'from-lime-500 to-green-600' 
    },
    revoke: { 
      variant: 'destructive', 
      label: 'Відкликання', 
      color: 'from-orange-500 to-red-600' 
    },
    login: { 
      variant: 'outline', 
      label: 'Вхід', 
      color: 'from-blue-500 to-blue-600' 
    },
    backup: { 
      variant: 'secondary', 
      label: 'Резервування', 
      color: 'from-lime-600 to-yellow-600' 
    },
  };
  return badges[action];
};

/**
 * Calculate audit statistics
 */
export const calculateStatistics = (entries: AuditEntry[]): AuditStatistics => {
  return {
    total: entries.length,
    today: entries.filter(e => e.timestamp.startsWith('2024-12-12')).length,
    success: entries.filter(e => e.status === 'success').length,
    failed: entries.filter(e => e.status === 'failed').length,
  };
};

/**
 * Calculate action type statistics
 */
export const calculateActionTypeStats = (entries: AuditEntry[]): ActionTypeStatistics => {
  return {
    create: entries.filter(e => e.action === 'create').length,
    update: entries.filter(e => e.action === 'update').length,
    delete: entries.filter(e => e.action === 'delete').length,
    query: entries.filter(e => e.action === 'select').length,
  };
};

/**
 * Filter audit entries
 */
export const filterAuditEntries = (
  entries: AuditEntry[],
  searchQuery: string,
  filterUser: string,
  filterAction: string,
  filterCategory: string
): AuditEntry[] => {
  return entries.filter(entry => {
    const matchesSearch =
      entry.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.user.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUser = filterUser === 'all' || entry.user === filterUser;
    const matchesAction = filterAction === 'all' || entry.action === filterAction;
    const matchesCategory = filterCategory === 'all' || entry.category === filterCategory;

    return matchesSearch && matchesUser && matchesAction && matchesCategory;
  });
};

/**
 * Filter entries by user
 */
export const filterByUser = (entries: AuditEntry[], user: string): AuditEntry[] => {
  return entries.filter(entry => entry.user === user);
};

/**
 * Filter entries by action type
 */
export const filterByAction = (entries: AuditEntry[], action: ActionType): AuditEntry[] => {
  return entries.filter(entry => entry.action === action);
};

/**
 * Filter entries by category
 */
export const filterByCategory = (entries: AuditEntry[], category: AuditCategory): AuditEntry[] => {
  return entries.filter(entry => entry.category === category);
};

/**
 * Filter entries by status
 */
export const filterByStatus = (entries: AuditEntry[], status: 'success' | 'failed'): AuditEntry[] => {
  return entries.filter(entry => entry.status === status);
};

/**
 * Filter entries by date
 */
export const filterByDate = (entries: AuditEntry[], date: string): AuditEntry[] => {
  return entries.filter(entry => entry.timestamp.startsWith(date));
};

/**
 * Filter entries by IP address
 */
export const filterByIP = (entries: AuditEntry[], ip: string): AuditEntry[] => {
  return entries.filter(entry => entry.ip.includes(ip));
};

/**
 * Get successful entries
 */
export const getSuccessfulEntries = (entries: AuditEntry[]): AuditEntry[] => {
  return filterByStatus(entries, 'success');
};

/**
 * Get failed entries
 */
export const getFailedEntries = (entries: AuditEntry[]): AuditEntry[] => {
  return filterByStatus(entries, 'failed');
};

/**
 * Get today's entries
 */
export const getTodayEntries = (entries: AuditEntry[]): AuditEntry[] => {
  const today = new Date().toISOString().split('T')[0];
  return filterByDate(entries, today);
};

/**
 * Get unique users
 */
export const getUniqueUsers = (entries: AuditEntry[]): string[] => {
  return [...new Set(entries.map(entry => entry.user))];
};

/**
 * Get unique categories
 */
export const getUniqueCategories = (entries: AuditEntry[]): AuditCategory[] => {
  return [...new Set(entries.map(entry => entry.category))];
};

/**
 * Get unique action types
 */
export const getUniqueActions = (entries: AuditEntry[]): ActionType[] => {
  return [...new Set(entries.map(entry => entry.action))];
};

/**
 * Get entries count by user
 */
export const countEntriesByUser = (entries: AuditEntry[]): Record<string, number> => {
  return entries.reduce((acc, entry) => {
    acc[entry.user] = (acc[entry.user] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Get entries count by category
 */
export const countEntriesByCategory = (entries: AuditEntry[]): Record<string, number> => {
  return entries.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Get entries count by action
 */
export const countEntriesByAction = (entries: AuditEntry[]): Record<string, number> => {
  return entries.reduce((acc, entry) => {
    acc[entry.action] = (acc[entry.action] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Sort entries by timestamp (newest first)
 */
export const sortByTimestampDesc = (entries: AuditEntry[]): AuditEntry[] => {
  return [...entries].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
};

/**
 * Sort entries by timestamp (oldest first)
 */
export const sortByTimestampAsc = (entries: AuditEntry[]): AuditEntry[] => {
  return [...entries].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
};

/**
 * Sort entries by user
 */
export const sortByUser = (entries: AuditEntry[], ascending: boolean = true): AuditEntry[] => {
  return [...entries].sort((a, b) => {
    const comparison = a.user.localeCompare(b.user);
    return ascending ? comparison : -comparison;
  });
};

/**
 * Sort entries by action
 */
export const sortByAction = (entries: AuditEntry[], ascending: boolean = true): AuditEntry[] => {
  return [...entries].sort((a, b) => {
    const comparison = a.action.localeCompare(b.action);
    return ascending ? comparison : -comparison;
  });
};

/**
 * Search entries by text
 */
export const searchEntries = (entries: AuditEntry[], searchTerm: string): AuditEntry[] => {
  if (!searchTerm) return entries;
  
  const term = searchTerm.toLowerCase();
  return entries.filter(entry =>
    entry.user.toLowerCase().includes(term) ||
    entry.target.toLowerCase().includes(term) ||
    entry.details.toLowerCase().includes(term) ||
    entry.category.toLowerCase().includes(term) ||
    entry.ip.includes(term)
  );
};

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
 * Calculate success rate
 */
export const calculateSuccessRate = (entries: AuditEntry[]): number => {
  if (entries.length === 0) return 0;
  const successCount = getSuccessfulEntries(entries).length;
  return (successCount / entries.length) * 100;
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
 * Format timestamp for display
 */
export const formatTimestamp = (timestamp: string): string => {
  return timestamp;
};

/**
 * Get action color
 */
export const getActionColor = (action: ActionType): string => {
  const badge = getActionBadge(action);
  return badge.color;
};

/**
 * Get status badge class
 */
export const getStatusBadgeClass = (status: 'success' | 'failed'): string => {
  return status === 'success'
    ? 'bg-green-50 text-green-700 border-green-300'
    : 'bg-red-50 text-red-700 border-red-300';
};

/**
 * Get table row class for status
 */
export const getTableRowClass = (status: 'success' | 'failed'): string => {
  return status === 'failed' ? 'bg-red-50/50' : '';
};

/**
 * Export entries to CSV
 */
export const exportToCSV = (entries: AuditEntry[]): string => {
  const headers = ['Timestamp', 'User', 'Action', 'Category', 'Target', 'Details', 'IP', 'Status'];
  const rows = entries.map(entry => [
    entry.timestamp,
    entry.user,
    entry.action,
    entry.category,
    entry.target,
    entry.details,
    entry.ip,
    entry.status,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  return csvContent;
};

/**
 * Export entries to JSON
 */
export const exportToJSON = (entries: AuditEntry[]): string => {
  return JSON.stringify(entries, null, 2);
};

/**
 * Download file
 */
export const downloadFile = (content: string, filename: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Get action label in Ukrainian
 */
export const getActionLabel = (action: ActionType): string => {
  const badge = getActionBadge(action);
  return badge.label;
};

/**
 * Validate audit entry
 */
export const isValidAuditEntry = (entry: Partial<AuditEntry>): entry is AuditEntry => {
  return !!(
    entry.id &&
    entry.timestamp &&
    entry.user &&
    entry.action &&
    entry.category &&
    entry.target &&
    entry.details &&
    entry.ip &&
    entry.status
  );
};

/**
 * Group entries by date
 */
export const groupEntriesByDate = (entries: AuditEntry[]): Record<string, AuditEntry[]> => {
  return entries.reduce((acc, entry) => {
    const date = entry.timestamp.split(' ')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, AuditEntry[]>);
};

/**
 * Group entries by user
 */
export const groupEntriesByUser = (entries: AuditEntry[]): Record<string, AuditEntry[]> => {
  return entries.reduce((acc, entry) => {
    if (!acc[entry.user]) {
      acc[entry.user] = [];
    }
    acc[entry.user].push(entry);
    return acc;
  }, {} as Record<string, AuditEntry[]>);
};

/**
 * Get IP addresses
 */
export const getUniqueIPs = (entries: AuditEntry[]): string[] => {
  return [...new Set(entries.map(entry => entry.ip))];
};

/**
 * Check if entry is recent (within last hour)
 */
export const isRecentEntry = (entry: AuditEntry): boolean => {
  // Mock implementation - in real app would compare timestamps
  return true;
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
