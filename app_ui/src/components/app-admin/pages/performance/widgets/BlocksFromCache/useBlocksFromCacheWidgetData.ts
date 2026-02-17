import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { BlocksFromCacheWidgetData } from './types';
import API from '../../../../../../api/endpoints';

export function useBlocksFromCacheWidgetData() {
  const getBlocksFromCacheWidgetData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.performance.widgets.blocksFromCache.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<BlocksFromCacheWidgetData>({
    queryKey: ['blocks-from-cache-widget-data'],
    queryFn: getBlocksFromCacheWidgetData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
