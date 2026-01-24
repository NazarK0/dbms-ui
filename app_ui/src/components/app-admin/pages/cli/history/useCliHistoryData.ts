import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { CliHistoryEntry } from './types';
import API from '../../../../../api/endpoints';


export function useCliHistoryData() {
  const getCliHistoryData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.cli.history.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<CliHistoryEntry[]>({
    queryKey: ['cli-history-data'],
    queryFn: getCliHistoryData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
