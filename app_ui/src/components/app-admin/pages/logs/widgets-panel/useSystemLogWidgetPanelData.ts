import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { LogStats } from './types';
import API from '../../../../../api/endpoints';

export function useSystemLogWidgetPanelData() {
  const getSystemLogWidgetPanelData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.systemLog.stats.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<LogStats>({
    queryKey: ['system-log-widget-data'],
    queryFn: getSystemLogWidgetPanelData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
