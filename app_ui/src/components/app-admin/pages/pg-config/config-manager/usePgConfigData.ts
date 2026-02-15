import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { ConfigParam } from './types';
import API from '../../../../../api/endpoints';

export function usePgConfigData() {
  const getPgConfigData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.pgConfig.params.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<ConfigParam[]>({
    queryKey: ['pg-config-data'],
    queryFn: getPgConfigData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
