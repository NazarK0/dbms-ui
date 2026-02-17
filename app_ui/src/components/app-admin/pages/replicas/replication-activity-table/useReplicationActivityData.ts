import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { ReplicaActivityEntry } from './types';
import API from '../../../../../api/endpoints';


export function useReplicationActivityData() {
  const getReplicationActivityData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.replicas.table.activity.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<ReplicaActivityEntry[]>({
    queryKey: ['replication-activity-table-data'],
    queryFn: getReplicationActivityData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
