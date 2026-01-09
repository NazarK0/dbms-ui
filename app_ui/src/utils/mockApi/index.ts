/**
 * Mock API utilities для імітації backend запитів
 * Використовується для реалістичної поведінки до інтеграції з реальним backend
 */

// Constants and types
export { API_DELAYS, type DelayType } from './constants';

// Helper functions
export { getRandomDelay } from './helpers';

// Main API functions
export { mockApiCall } from './mockApiCall';
export { mockApiCallWithFn } from './mockApiCallWithFn';
export { mockPaginatedApiCall } from './mockPaginatedApiCall';
export { mockMutationApiCall } from './mockMutationApiCall';
export { mockDeleteApiCall } from './mockDeleteApiCall';
export { mockProgressApiCall } from './mockProgressApiCall';
export { mockBatchApiCall } from './mockBatchApiCall';
export { createMockEndpoint } from './createMockEndpoint';

// Error handling
export {
  NetworkErrorType,
  MockNetworkError,
  mockApiCallWithError,
} from './errors';
