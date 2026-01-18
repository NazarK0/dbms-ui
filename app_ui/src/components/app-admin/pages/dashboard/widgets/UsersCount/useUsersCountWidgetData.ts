import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { UsersCountWidgetData } from './types';
import API from '../../../../../../api/endpoints';

export function useUsersCountWidgetData() {
  const getUsersCountWidgetData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.dashboard.widgets.usersCount.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<UsersCountWidgetData>({
    queryKey: ['users-count-widget-data'],
    queryFn: getUsersCountWidgetData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
