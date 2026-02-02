import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { QueryStatEntry } from './types';
import API from '../../../../../../api/endpoints';

export function useTop5QueriesTableData() {
  const getTop5QueriesTableData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.performance.table.top5Queries.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<QueryStatEntry[]>({
    queryKey: ['top-5 queries-table-data'],
    queryFn: getTop5QueriesTableData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
