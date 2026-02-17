import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { IndexUsageEntry } from './types';
import API from '../../../../../../api/endpoints';


export function useIndexUsageTableData() {
  const getIndexUsageTableData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.performance.table.indexUsage.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<IndexUsageEntry[]>({
    queryKey: ['index-usage-table-data'],
    queryFn: getIndexUsageTableData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
