import type { DelayType } from './constants';
import { mockApiCall } from './mockApiCall';

/**
 * Хелпер для створення mock API endpoint
 */
export function createMockEndpoint<TRequest, TResponse>(
  handler: (request: TRequest) => TResponse,
  delayType: DelayType = 'normal'
) {
  return async (request: TRequest): Promise<TResponse> => {
    return mockApiCall(handler(request), delayType);
  };
}
