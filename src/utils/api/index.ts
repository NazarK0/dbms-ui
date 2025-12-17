/**
 * API Utilities
 * 
 * Central export for all API-related utilities
 */

export { default as API, getEndpoint } from './endpoints';
export { apiClient, default as ApiClient } from './client';
export type { ApiEndpoints } from './endpoints';

// Re-export for convenience
import API from './endpoints';
import { apiClient } from './client';

/**
 * Convenience method to make API calls using endpoint paths
 * 
 * @example
 * // Get admin dashboard widgets
 * const widgets = await api.get(API.admin.dashboard.widgets.list());
 * 
 * // Create a new user database
 * const result = await api.post(
 *   API.admin.databaseManager.userDatabases.create(),
 *   { name: 'mydb', owner: 'user1' }
 * );
 */
export const api = {
  get: <T = any>(endpoint: string, params?: Record<string, any>) =>
    apiClient.get<T>(endpoint, params),
    
  post: <T = any>(endpoint: string, body?: any, params?: Record<string, any>) =>
    apiClient.post<T>(endpoint, body, params),
    
  put: <T = any>(endpoint: string, body?: any, params?: Record<string, any>) =>
    apiClient.put<T>(endpoint, body, params),
    
  delete: <T = any>(endpoint: string, params?: Record<string, any>) =>
    apiClient.delete<T>(endpoint, params),
    
  patch: <T = any>(endpoint: string, body?: any, params?: Record<string, any>) =>
    apiClient.patch<T>(endpoint, body, params),
};
