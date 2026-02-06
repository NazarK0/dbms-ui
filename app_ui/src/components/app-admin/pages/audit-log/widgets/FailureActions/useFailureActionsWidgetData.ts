import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { FailureActionsWidgetData } from './types';
import API from '../../../../../../api/endpoints';

export function useFailureActionsWidgetData() {
  const getFailureActionsWidgetData = async ({ signal }: QueryFunctionContext) => {
    const endpoint = API.admin.v1.auditLog.widgets.failureActions.get;
    const { data } = await axios[endpoint.method](`http://localhost:8000/${endpoint.url}`, {
      signal,
    });
    return data;
  };
  const { data, isLoading, error } = useQuery<FailureActionsWidgetData>({
    queryKey: ['Failure-actions-widget-data'],
    queryFn: getFailureActionsWidgetData,
    throwOnError: true,
  });
  return { data, isLoading, error };
}
