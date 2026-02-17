import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { ConfigProfile } from './types';
import API from '../../../../../api/endpoints';

export function usePgConfigProfilesData() {
  const getPgProfilesData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.pgConfig.profiles.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<ConfigProfile[]>({
    queryKey: ['pg-config-profiles-data'],
    queryFn: getPgProfilesData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
