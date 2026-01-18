import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { SystemLog } from './types';
import API from '../../../../../api/endpoints';


export function useSystemLogWidgetData() {
  const getSystemLogWidgetData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.systemLog.widgets.table.get
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<SystemLog[]>({
    queryKey: ['system-log-widget-data'],
    queryFn: getSystemLogWidgetData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
