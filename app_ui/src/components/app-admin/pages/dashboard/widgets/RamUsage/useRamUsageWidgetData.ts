import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { RamUsageWidgetData } from './types';
import API from '../../../../../../api/endpoints';

export function useRamUsageWidgetData() {
  const getRamUsageWidgetData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.dashboard.widgets.ramUsage.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<RamUsageWidgetData>({
    queryKey: ['ram-usage-widget-data'],
    queryFn: getRamUsageWidgetData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
