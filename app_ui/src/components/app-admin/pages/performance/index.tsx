// Central exports for performance analyzer components
import PerformanceHeader from './PerformanceHeader';
import CacheStatsCards from './CacheStatsCards';
import SlowQueriesAlert from './SlowQueriesAlert';
import SlowQueriesCard from './SlowQueriesCard';

import { exportPerformanceReport } from './utils/exportPerformanceReport';


import { useState, useEffect } from 'react';
import { queryStats, slowQueryDetails, cacheStats, indexUsage } from '../../../../mockData/admin';
import { API, api } from '../../../../utils/api';
import { SkeletonCardGrid, SkeletonListCard } from '../../../ui/skeletons';
import IndexUsageTable from './index-usage';
import Top5QueriesTable from './tables/top5-queries';

export default function PerformanceAnalyzer() {
  const [timeRange, setTimeRange] = useState('1h');

  // Loading states
  const [isLoadingCache, setIsLoadingCache] = useState(true);
  const [isLoadingSlowQueries, setIsLoadingSlowQueries] = useState(true);


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
    setIsLoadingSlowQueries(true);

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

      <Top5QueriesTable />

      {isLoadingSlowQueries ? (
        <SkeletonListCard items={5} />
      ) : (
        <SlowQueriesCard queries={slowQueries} />
      )}

      <IndexUsageTable />
    </div>
  );
}
