import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { ActionStats } from './types';
import API from '../../../../../api/endpoints';


export function useAuditLogStatsPanelData() {
  const getAuditLogStatsPanelData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.auditLog.statsPanel.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<ActionStats>({
    queryKey: ['audit-log-stats-panel-data'],
    queryFn: getAuditLogStatsPanelData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
