import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { AuditEntry } from './types';
import API from '../../../../../api/endpoints';


export function useAuditLogTableData() {
  const getAuditLogTableData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.auditLog.table.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<AuditEntry[]>({
    queryKey: ['audit-log-table-data'],
    queryFn: getAuditLogTableData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
