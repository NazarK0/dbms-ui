import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { ClusterServer } from './types';
import API from '../../../../api/endpoints';

export function useClustersData() {
  const getClustersData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.replicas.clusters.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<ClusterServer[]>({
    queryKey: ['clusters-data'],
    queryFn: getClustersData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
