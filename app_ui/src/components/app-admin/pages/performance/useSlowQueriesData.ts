import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { SlowQueryDetail } from './slow-queries/types';
import API from '../../../../api/endpoints';

export function usePgSlowQueriesData() {
  const getPgSlowQueriesData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.performance.slowQueries.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<SlowQueryDetail[]>({
    queryKey: ['pg-slow-queries-data'],
    queryFn: getPgSlowQueriesData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
