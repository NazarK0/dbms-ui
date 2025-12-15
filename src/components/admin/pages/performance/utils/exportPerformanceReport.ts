import { getTimeRangeLabel } from './getTimeRangeLabel';

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
