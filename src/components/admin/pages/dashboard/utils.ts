/**
 * Utility functions for Dashboard components
 */

import type {
  DashboardCard,
  ActivityType,
  TrendDirection,
  PerformanceMetric,
  DashboardStats,
} from './types';
import { performanceThresholds } from './data';

/**
 * Get category label in Ukrainian
 */
export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    stats: 'Статистика',
    performance: 'Продуктивність',
    activity: 'Активність',
  };
  return labels[category] || category;
};

/**
 * Filter cards by visibility
 */
export const getVisibleCards = (cards: DashboardCard[]): DashboardCard[] => {
  return cards.filter((card) => card.visible);
};

/**
 * Filter cards by category
 */
export const getCardsByCategory = (
  cards: DashboardCard[],
  category: string
): DashboardCard[] => {
  return cards.filter((card) => card.category === category);
};

/**
 * Count visible cards
 */
export const countVisibleCards = (cards: DashboardCard[]): number => {
  return cards.filter((card) => card.visible).length;
};

/**
 * Check if card is visible
 */
export const isCardVisible = (
  cards: DashboardCard[],
  cardId: string
): boolean => {
  const card = cards.find((c) => c.id === cardId);
  return card?.visible ?? true;
};

/**
 * Toggle card visibility
 */
export const toggleCardVisibility = (
  cards: DashboardCard[],
  cardId: string
): DashboardCard[] => {
  return cards.map((card) =>
    card.id === cardId ? { ...card, visible: !card.visible } : card
  );
};

/**
 * Get activity type color class
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
 */
export const getTrendIcon = (trend: TrendDirection): string => {
  return trend === 'up' ? 'ArrowUp' : 'ArrowDown';
};

/**
 * Get trend color variant
 */
export const getTrendVariant = (
  trend: TrendDirection
): 'default' | 'secondary' => {
  return trend === 'up' ? 'default' : 'secondary';
};

/**
 * Format storage size
 */
export const formatStorageSize = (bytes: number): string => {
  const units = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

/**
 * Format duration
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Parse duration string (HH:MM:SS) to seconds
 */
export const parseDuration = (duration: string): number => {
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

/**
 * Format time ago
 */
export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} секунд тому`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} хвилин тому`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} годин тому`;
  return `${Math.floor(diffInSeconds / 86400)} днів тому`;
};

/**
 * Get performance metric status
 */
export const getPerformanceStatus = (
  metricLabel: string,
  value: number
): 'normal' | 'warning' | 'critical' => {
  const key = metricLabel.toLowerCase() as keyof typeof performanceThresholds;
  const thresholds = performanceThresholds[key];

  if (!thresholds) return 'normal';

  if (value >= thresholds.critical) return 'critical';
  if (value >= thresholds.warning) return 'warning';
  return 'normal';
};

/**
 * Get performance status color
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

/**
 * Calculate average metric value
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
 */
export const filterMetricsByThreshold = (
  metrics: PerformanceMetric[],
  minValue: number
): PerformanceMetric[] => {
  return metrics.filter((metric) => metric.value >= minValue);
};

/**
 * Format number with commas
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('uk-UA');
};

/**
 * Calculate percentage change
 */
export const calculatePercentageChange = (
  oldValue: number,
  newValue: number
): string => {
  if (oldValue === 0) return '+100%';
  const change = ((newValue - oldValue) / oldValue) * 100;
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
};

/**
 * Get dashboard summary
 */
export const getDashboardSummary = (
  stats: DashboardStats
): Record<string, string> => {
  return {
    databases: stats.totalDatabases.toString(),
    admins: stats.totalAdmins.toString(),
    users: stats.totalUsers.toString(),
    tables: stats.totalTables.toString(),
    storage: stats.storageUsed,
  };
};

/**
 * Validate dashboard card
 */
export const validateDashboardCard = (
  card: Partial<DashboardCard>
): boolean => {
  return !!(
    card.id &&
    card.name &&
    card.description &&
    card.category &&
    typeof card.visible === 'boolean'
  );
};

/**
 * Export dashboard configuration
 */
export const exportDashboardConfig = (cards: DashboardCard[]): string => {
  return JSON.stringify(cards, null, 2);
};

/**
 * Import dashboard configuration
 */
export const importDashboardConfig = (
  configString: string
): DashboardCard[] | null => {
  try {
    const cards = JSON.parse(configString);
    if (Array.isArray(cards) && cards.every(validateDashboardCard)) {
      return cards;
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Reset dashboard to defaults
 */
export const resetDashboardToDefaults = (
  defaultCards: DashboardCard[]
): DashboardCard[] => {
  return defaultCards.map((card) => ({ ...card, visible: true }));
};

/**
 * Search cards by name or description
 */
export const searchCards = (
  cards: DashboardCard[],
  searchTerm: string
): DashboardCard[] => {
  const term = searchTerm.toLowerCase();
  return cards.filter(
    (card) =>
      card.name.toLowerCase().includes(term) ||
      card.description.toLowerCase().includes(term)
  );
};

/**
 * Group cards by category
 */
export const groupCardsByCategory = (
  cards: DashboardCard[]
): Record<string, DashboardCard[]> => {
  return cards.reduce((acc, card) => {
    if (!acc[card.category]) {
      acc[card.category] = [];
    }
    acc[card.category].push(card);
    return acc;
  }, {} as Record<string, DashboardCard[]>);
};

/**
 * Save dashboard config to localStorage
 */
export const saveDashboardConfig = (cards: DashboardCard[]): void => {
  localStorage.setItem('dashboard_config', JSON.stringify(cards));
};

/**
 * Load dashboard config from localStorage
 */
export const loadDashboardConfig = (): DashboardCard[] | null => {
  const saved = localStorage.getItem('dashboard_config');
  if (!saved) return null;
  return importDashboardConfig(saved);
};

/**
 * Clear dashboard config from localStorage
 */
export const clearDashboardConfig = (): void => {
  localStorage.removeItem('dashboard_config');
};
