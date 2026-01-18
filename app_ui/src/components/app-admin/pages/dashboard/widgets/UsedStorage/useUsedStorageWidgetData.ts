import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { UsedStorageWidgetData } from './types';
import API from '../../../../../../api/endpoints';

export function useUsedStorageWidgetData() {
  const getUsedStorageWidgetData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.dashboard.widgets.usedStorage.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<UsedStorageWidgetData>({
    queryKey: ['used-storage-widget-data'],
    queryFn: getUsedStorageWidgetData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
