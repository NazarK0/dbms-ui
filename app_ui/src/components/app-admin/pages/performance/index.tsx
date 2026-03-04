// Central exports for performance analyzer components
import PerformanceHeader from './PerformanceHeader';
import SlowQueriesAlert from './SlowQueriesAlert';
import { SkeletonListCard } from '../../../ui/skeletons';
import IndexUsageTable from './tables/index-usage';
import Top5QueriesTable from './tables/top5-queries';
import SlowQueries from './slow-queries';
import { usePgSlowQueriesData } from './useSlowQueriesData';
import WidgetPane from './WidgetPane';

export default function PerformanceAnalyzer() {
  const { data: slowQueries, isLoading: isLoadingSlowQueries, error } = usePgSlowQueriesData();
  const timeRange = '1h';


  if (isLoadingSlowQueries) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6">
      <PerformanceHeader timeRange={timeRange} />
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
