import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { UserEntry } from './types';
import API from '../../../../../api/endpoints';

export function useUsersTableData() {
  const getUsersTableData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.users.table.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<UserEntry[]>({
    queryKey: ['users-table-data'],
    queryFn: getUsersTableData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
