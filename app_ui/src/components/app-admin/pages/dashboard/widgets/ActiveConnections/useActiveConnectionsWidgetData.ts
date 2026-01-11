import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { ActiveConnectionsWidgetData } from './types';

export function useActiveConnectionsWidgetData() {
  const getActiveConnectionsWidgetData = async ({ signal }: QueryFunctionContext) => {
    const { data } = await axios.get(`http://localhost:8000/admin/v1/widgets/active-connections`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<ActiveConnectionsWidgetData[]>({
    queryKey: ['active-connections-widget-data'],
    queryFn: getActiveConnectionsWidgetData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
