import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { SqlReferenceEntry } from './types';
import API from '../../../../../api/endpoints';


export function useSqlReferenceData() {
  const getSqlReferenceData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.cli.sqlReference.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<SqlReferenceEntry[]>({
    queryKey: ['sql-reference-data'],
    queryFn: getSqlReferenceData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
