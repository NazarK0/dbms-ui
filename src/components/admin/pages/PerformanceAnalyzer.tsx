import { useState } from 'react';
import { queryStats, slowQueryDetails, cacheStats, indexUsage } from '../../../mockData/admin';
import {
  PerformanceHeader,
  CacheStatsCards,
  SlowQueriesAlert,
  QueryStatsTable,
  SlowQueriesCard,
  IndexUsageTable,
  exportPerformanceReport,
} from './performance';

export default function PerformanceAnalyzer() {
  const [timeRange, setTimeRange] = useState('1h');
  const [sortBy, setSortBy] = useState('total_time');

  const handleRefresh = () => {
    // Mock refresh - in real app, this would refetch data
    console.log('Refreshing performance data...');
  };

  const handleExport = () => {
    exportPerformanceReport({
      timeRange,
      queryStats,
      slowQueries: slowQueryDetails,
      cacheStats,
      indexUsage,
    });
  };

  return (
    <div className="space-y-6">
      <PerformanceHeader
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onRefresh={handleRefresh}
        onExport={handleExport}
      />

      <CacheStatsCards stats={cacheStats} />

      <SlowQueriesAlert count={slowQueryDetails.length} />

      <QueryStatsTable
        stats={queryStats}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      <SlowQueriesCard queries={slowQueryDetails} />

      <IndexUsageTable indexes={indexUsage} />
    </div>
  );
}
