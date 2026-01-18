import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { AdminsCountWidgetData } from './types';
import API from '../../../../../../api/endpoints';

export function useAdminsCountWidgetData() {
  const getAdminsCountWidgetData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.dashboard.widgets.adminsCount.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<AdminsCountWidgetData>({
    queryKey: ['admins-count-widget-data'],
    queryFn: getAdminsCountWidgetData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
