import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { DatabasesCountWidgetData } from './types';
import API from '../../../../../../api/endpoints';

export function useDatabasesCountWidgetData() {
  const getDatabasesCountWidgetData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.dashboard.widgets.databasesCount.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<DatabasesCountWidgetData>({
    queryKey: ['databases-count-widget-data'],
    queryFn: getDatabasesCountWidgetData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
