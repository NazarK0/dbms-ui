import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { DiskIOWidgetData } from './types';
import API from '../../../../../../api/endpoints';

export function useDiskIOWidgetData() {
  const getDiskIOWidgetData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.dashboard.widgets.diskIO.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<DiskIOWidgetData>({
    queryKey: ['disk-io-widget-data'],
    queryFn: getDiskIOWidgetData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
