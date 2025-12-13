/**
 * Utility functions for PerformanceAnalyzer component
 */

/**
 * Get badge variant based on impact level
 */
export const getImpactVariant = (impact: string): 'destructive' | 'default' | 'secondary' => {
  switch (impact) {
    case 'Висока':
      return 'destructive';
    case 'Середня':
      return 'default';
    default:
      return 'secondary';
  }
};

/**
 * Get trend icon color class based on trend direction
 */
export const getTrendColor = (trend: 'up' | 'down' | 'stable'): string => {
  switch (trend) {
    case 'up':
      return 'text-green-600';
    case 'down':
      return 'text-red-600';
    default:
      return 'text-slate-600';
  }
};

/**
 * Format time duration to human-readable string
 */
export const formatDuration = (milliseconds: number): string => {
  if (milliseconds < 1000) {
    return `${milliseconds.toFixed(2)}ms`;
  }
  const seconds = milliseconds / 1000;
  if (seconds < 60) {
    return `${seconds.toFixed(2)}s`;
  }
  const minutes = seconds / 60;
  return `${minutes.toFixed(2)}m`;
};

/**
 * Parse time range value to readable format
 */
export const getTimeRangeLabel = (timeRange: string): string => {
  switch (timeRange) {
    case '15m':
      return 'Останні 15 хвилин';
    case '1h':
      return 'Остання година';
    case '24h':
      return 'Останні 24 години';
    case '7d':
      return 'Останні 7 днів';
    default:
      return timeRange;
  }
};

/**
 * Calculate cache hit ratio percentage
 */
export const calculateHitRatio = (hits: number, misses: number): number => {
  const total = hits + misses;
  if (total === 0) return 0;
  return Math.round((hits / total) * 100);
};

/**
 * Format large numbers with appropriate suffix (K, M, B)
 */
export const formatLargeNumber = (num: number): string => {
  if (num < 1000) return num.toString();
  if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
  if (num < 1000000000) return `${(num / 1000000).toFixed(1)}M`;
  return `${(num / 1000000000).toFixed(1)}B`;
};

/**
 * Determine if index is underutilized
 */
export const isUnderutilizedIndex = (usage: number, threshold: number = 10): boolean => {
  return usage < threshold;
};

/**
 * Get performance status based on cache hit ratio
 */
export const getPerformanceStatus = (hitRatio: number): {
  status: 'excellent' | 'good' | 'fair' | 'poor';
  label: string;
  color: string;
} => {
  if (hitRatio >= 95) {
    return { status: 'excellent', label: 'Відмінно', color: 'green' };
  }
  if (hitRatio >= 85) {
    return { status: 'good', label: 'Добре', color: 'blue' };
  }
  if (hitRatio >= 70) {
    return { status: 'fair', label: 'Задовільно', color: 'yellow' };
  }
  return { status: 'poor', label: 'Погано', color: 'red' };
};

/**
 * Sort query stats by selected metric
 */
export const sortQueryStats = <T extends Record<string, any>>(
  stats: T[],
  sortBy: string
): T[] => {
  return [...stats].sort((a, b) => {
    switch (sortBy) {
      case 'total_time':
        // Assuming totalTime is a string like "1.2s"
        return parseFloat(b.totalTime) - parseFloat(a.totalTime);
      case 'avg_time':
        return parseFloat(b.avgTime) - parseFloat(a.avgTime);
      case 'calls':
        return b.calls - a.calls;
      case 'hit_ratio':
        return b.hitRatio - a.hitRatio;
      default:
        return 0;
    }
  });
};

/**
 * Export performance report as JSON
 */
export const exportPerformanceReport = (data: {
  timeRange: string;
  queryStats: any[];
  slowQueries: any[];
  cacheStats: any[];
  indexUsage: any[];
}): void => {
  const report = {
    generatedAt: new Date().toISOString(),
    timeRange: getTimeRangeLabel(data.timeRange),
    summary: {
      totalQueries: data.queryStats.length,
      slowQueries: data.slowQueries.length,
      avgCacheHitRatio:
        data.cacheStats.find((s) => s.metric === 'Cache Hit Ratio')?.percentage || 0,
    },
    ...data,
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `performance-report-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Get recommendation priority based on impact
 */
export const getRecommendationPriority = (impact: string): number => {
  switch (impact) {
    case 'Висока':
      return 1;
    case 'Середня':
      return 2;
    case 'Низька':
      return 3;
    default:
      return 999;
  }
};

/**
 * Filter slow queries by minimum average time threshold
 */
export const filterSlowQueries = <T extends { avgTime: string }>(
  queries: T[],
  thresholdMs: number = 100
): T[] => {
  return queries.filter((query) => {
    const avgTime = parseFloat(query.avgTime);
    return avgTime >= thresholdMs;
  });
};
