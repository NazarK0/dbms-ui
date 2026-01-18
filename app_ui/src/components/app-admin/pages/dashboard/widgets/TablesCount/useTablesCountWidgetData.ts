import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { TablesCountWidgetData } from './types';
import API from '../../../../../../api/endpoints';

export function useTablesCountWidgetData() {
  const getTablesCountWidgetData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.dashboard.widgets.tablesCount.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<TablesCountWidgetData>({
    queryKey: ['tables-count-widget-data'],
    queryFn: getTablesCountWidgetData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
