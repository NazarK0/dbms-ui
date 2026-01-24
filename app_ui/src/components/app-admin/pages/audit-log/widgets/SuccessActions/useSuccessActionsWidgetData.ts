import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { SuccessActionsWidgetData } from './types';
import API from '../../../../../../api/endpoints';

export function useSuccessActionsWidgetData() {
  const getSuccessActionsWidgetData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.auditLog.widgets.successActions.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<SuccessActionsWidgetData>({
    queryKey: ['success-actions-widget-data'],
    queryFn: getSuccessActionsWidgetData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
