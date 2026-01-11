import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { ActivityLog } from './types';
import API from '../../../../../../api/endpoints';


export function useRecentActivityWidgetData() {
  const getRecentActivityWidgetData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.dashboard.widgets.recentActivity.get
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<ActivityLog[]>({
    queryKey: ['recent-activity-widget-data'],
    queryFn: getRecentActivityWidgetData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
