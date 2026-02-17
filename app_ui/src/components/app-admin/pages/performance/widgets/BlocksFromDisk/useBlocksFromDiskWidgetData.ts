import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { BlocksFromDiskWidgetData } from './types';
import API from '../../../../../../api/endpoints';

export function useBlocksFromDiskWidgetData() {
  const getBlocksFromDiskWidgetData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.performance.widgets.blocksFromDisk.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<BlocksFromDiskWidgetData>({
    queryKey: ['blocks-from-disk-widget-data'],
    queryFn: getBlocksFromDiskWidgetData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
