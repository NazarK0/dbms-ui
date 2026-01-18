import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { CpuUsageWidgetData } from './types';
import API from '../../../../../../api/endpoints';

export function useCpuUsageWidgetData() {
  const getCpuUsageWidgetData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.dashboard.widgets.cpuUsage.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<CpuUsageWidgetData>({
    queryKey: ['cpu-usage-widget-data'],
    queryFn: getCpuUsageWidgetData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
