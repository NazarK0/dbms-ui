import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { WidgetData } from '../types';
import API from '../../../../../../api/endpoints';

export function useWidgetListData() {
  const getWidgetListData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.dashboard.widgets.list.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<WidgetData[]>({
    queryKey: ['widget-list-data'],
    queryFn: getWidgetListData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
