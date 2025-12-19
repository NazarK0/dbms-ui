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
import { API, api } from '../../../utils/api';
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

    // Load cache statistics
    api.get(API.admin.performanceAnalyzer.cache.stats(), { timeRange })
      .then((data) => {
        setCacheData(data);
        setIsLoadingCache(false);
      })
      .catch((error) => {
        console.error('Error loading cache stats:', error);
        setIsLoadingCache(false);
      });

    // Load query statistics
    api.get(API.admin.performanceAnalyzer.queries.stats(), { timeRange })
      .then((data) => {
        setQueriesData(data);
        setIsLoadingQueries(false);
      })
      .catch((error) => {
        console.error('Error loading query stats:', error);
        setIsLoadingQueries(false);
      });

    // Load slow queries
    api.get(API.admin.performanceAnalyzer.queries.slow(), { timeRange })
      .then((data) => {
        setSlowQueries(data);
        setIsLoadingSlowQueries(false);
      })
      .catch((error) => {
        console.error('Error loading slow queries:', error);
        setIsLoadingSlowQueries(false);
      });

    // Load index usage
    api.get(API.admin.performanceAnalyzer.indexes.usage(), { timeRange })
      .then((data) => {
        setIndexData(data);
        setIsLoadingIndexes(false);
      })
      .catch((error) => {
        console.error('Error loading index usage:', error);
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