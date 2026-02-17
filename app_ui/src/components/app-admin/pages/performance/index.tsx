// Central exports for performance analyzer components
import PerformanceHeader from './PerformanceHeader';
import SlowQueriesAlert from './SlowQueriesAlert';


import { exportPerformanceReport } from './utils/exportPerformanceReport';


import { useState, useEffect } from 'react';
import { queryStats, cacheStats, indexUsage } from '../../../../mockData/admin';
import { API, api } from '../../../../utils/api';
import { SkeletonListCard } from '../../../ui/skeletons';
import IndexUsageTable from './tables/index-usage';
import Top5QueriesTable from './tables/top5-queries';
import SlowQueries from './slow-queries';
import { usePgSlowQueriesData } from './useSlowQueriesData';
import WidgetPane from './WidgetPane';

export default function PerformanceAnalyzer() {
  const { data: slowQueries, isLoading: isLoadingSlowQueries, error } = usePgSlowQueriesData();


  const [timeRange, setTimeRange] = useState('1h');

  // Loading states
  const [isLoadingCache, setIsLoadingCache] = useState(true);


  // Data states
  const [cacheData, setCacheData] = useState(cacheStats);
  const [queriesData, setQueriesData] = useState(queryStats);

  const [indexData, setIndexData] = useState(indexUsage);

  useEffect(() => {
    loadPerformanceData();
  }, [timeRange]);

  const loadPerformanceData = () => {
    // Reset loading states
    setIsLoadingCache(true);


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

  };


  if (isLoadingSlowQueries) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleRefresh = () => {
    console.log('Refreshing performance data...');
    loadPerformanceData();
  };

  const handleExport = () => {
    exportPerformanceReport({
      timeRange,
      queryStats: queriesData,
      slowQueries: slowQueries!,
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

      <WidgetPane />

      {!isLoadingSlowQueries && <SlowQueriesAlert count={slowQueries!.length} />}

      <Top5QueriesTable />

      {isLoadingSlowQueries ? (
        <SkeletonListCard items={5} />
      ) : (
          <SlowQueries queries={slowQueries!} />
      )}

      <IndexUsageTable />
    </div>
  );
}
