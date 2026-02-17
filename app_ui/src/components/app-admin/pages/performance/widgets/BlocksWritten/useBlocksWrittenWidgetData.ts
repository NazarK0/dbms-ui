import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { BlocksWrittenWidgetData } from './types';
import API from '../../../../../../api/endpoints';

export function useBlocksWrittenWidgetData() {
  const getBlocksWrittenWidgetData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.performance.widgets.blocksWritten.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<BlocksWrittenWidgetData>({
    queryKey: ['blocks-written-widget-data'],
    queryFn: getBlocksWrittenWidgetData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
