import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { ActivityLog } from './types';


export function useRecentActivityWidgetData() {
  const getRecentActivityWidgetData = async ({ signal }: QueryFunctionContext) => {
    const { data } = await axios.get(`http://localhost:8000/admin/v1/widgets/recent-activity`, {
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
