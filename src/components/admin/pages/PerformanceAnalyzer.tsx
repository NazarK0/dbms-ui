import { useState, useEffect } from 'react';
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
import { mockApiCall } from '../../../utils/mockApi';
import { SkeletonCardGrid, SkeletonTable, SkeletonListCard } from '../../ui/skeletons';

export default function PerformanceAnalyzer() {
  const [timeRange, setTimeRange] = useState('1h');
  const [sortBy, setSortBy] = useState('total_time');

  // Loading states
  const [isLoadingCache, setIsLoadingCache] = useState(true);
  const [isLoadingQueries, setIsLoadingQueries] = useState(true);
  const [isLoadingSlowQueries, setIsLoadingSlowQueries] = useState(true);
  const [isLoadingIndexes, setIsLoadingIndexes] = useState(true);

  // Data states
  const [cacheData, setCacheData] = useState(cacheStats);
  const [queriesData, setQueriesData] = useState(queryStats);
  const [slowQueries, setSlowQueries] = useState(slowQueryDetails);
  const [indexData, setIndexData] = useState(indexUsage);

  useEffect(() => {
    loadPerformanceData();
  }, [timeRange]);

  const loadPerformanceData = () => {
    // Reset loading states
    setIsLoadingCache(true);
    setIsLoadingQueries(true);
    setIsLoadingSlowQueries(true);
    setIsLoadingIndexes(true);

    // Імітація завантаження даних кешу
    mockApiCall(cacheStats, 'fast').then((data) => {
      setCacheData(data);
      setIsLoadingCache(false);
    });

    // Імітація завантаження статистики запитів
    mockApiCall(queryStats, 'slow').then((data) => {
      setQueriesData(data);
      setIsLoadingQueries(false);
    });

    // Імітація завантаження повільних запитів
    mockApiCall(slowQueryDetails, 'slow').then((data) => {
      setSlowQueries(data);
      setIsLoadingSlowQueries(false);
    });

    // Імітація завантаження використання індексів
    mockApiCall(indexUsage, 'slow').then((data) => {
      setIndexData(data);
      setIsLoadingIndexes(false);
    });
  };

  const handleRefresh = () => {
    console.log('Refreshing performance data...');
    loadPerformanceData();
  };

  const handleExport = () => {
    exportPerformanceReport({
      timeRange,
      queryStats: queriesData,
      slowQueries: slowQueries,
      cacheStats: cacheData,
      indexUsage: indexData,
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

      {isLoadingCache ? (
        <SkeletonCardGrid count={4} columns={4} cardType="stat" />
      ) : (
        <CacheStatsCards stats={cacheData} />
      )}

      {!isLoadingSlowQueries && <SlowQueriesAlert count={slowQueries.length} />}

      {isLoadingQueries ? (
        <SkeletonTable rows={10} columns={7} />
      ) : (
        <QueryStatsTable
          stats={queriesData}
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />
      )}

      {isLoadingSlowQueries ? (
        <SkeletonListCard items={5} />
      ) : (
        <SlowQueriesCard queries={slowQueries} />
      )}

      {isLoadingIndexes ? (
        <SkeletonTable rows={8} columns={6} />
      ) : (
        <IndexUsageTable indexes={indexData} />
      )}
    </div>
  );
}