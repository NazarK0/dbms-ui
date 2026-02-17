import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { CacheHitRateWidgetData } from './types';
import API from '../../../../../../api/endpoints';

export function useCacheHitRateWidgetData() {
  const getCacheHitRateWidgetData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.performance.widgets.cacheHitRate.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<CacheHitRateWidgetData>({
    queryKey: ['cache-hit-rate-widget-data'],
    queryFn: getCacheHitRateWidgetData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
