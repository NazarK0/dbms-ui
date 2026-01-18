/**
 * API Client
 *
 * Provides methods to interact with backend API endpoints.
 * In development mode, uses mock data from mockData directory.
 * In production, makes real HTTP requests to the backend.
 */

import { userDatabases as adminUserDatabases } from '../../mockData/admin';
import { queryStats, slowQueryDetails, cacheStats, indexUsage } from '../../mockData/admin';
import { configParams } from '../../mockData/admin/postgresConfig';
import { clusters, replicationActivity } from '../../mockData/admin/replicas';
import { replicationStats } from '../../components/app-admin/pages/replicas/data';
import { roles, adminRoles, userRoles, totalAdmins, totalUsers } from '../../mockData/admin';
import { systemStats, connections, slowQueries, databaseStats } from '../../mockData/admin';
import { administrators, endUsers } from '../../mockData/admin/users';
import { mockLogs, calculateLogStats } from '../../mockData/admin/logs';
import { auditEntries, auditStatistics, actionTypeStats } from '../../mockData/admin/auditLog';
import { tables as adminTables, tableSchema, tableData } from '../../mockData/admin/tableBrowser';
import {
  dashboardDatabases,
  activityRecords,
  tableAccess,
  overviewStats,
  myDatabases,
} from '../../mockData/user/dashboard';
import { userDatabases } from '../../mockData/user/databases';
import { getTableRecords } from '../../mockData/user/tableRecords';
import { allSchemas } from '../../mockData/admin/schemas';
import { availableSchemaOwners } from '../../mockData/admin/schemaOwners';
import { installedExtensionsDetailed, availableExtensions } from '../../mockData/admin/extensions';

// Environment mode detection
const isDevelopment = import.meta.env?.MODE === 'development' || !import.meta.env?.MODE;

/**
 * Mock data mapper - maps API endpoints to mock data
 */
function getMockDataForEndpoint(endpoint: string, params?: Record<string, any>): any {

  // Database Manager endpoints
  if (endpoint === '/api/admin/database-manager/user-databases') return adminUserDatabases;

  // Performance Analyzer endpoints
  if (endpoint === '/api/admin/performance-analyzer/cache/stats') return cacheStats;
  if (endpoint === '/api/admin/performance-analyzer/queries/stats') return queryStats;
  if (endpoint === '/api/admin/performance-analyzer/queries/slow') return slowQueryDetails;
  if (endpoint === '/api/admin/performance-analyzer/indexes/usage') return indexUsage;

  // Postgres Config endpoints
  if (endpoint === '/api/admin/postgres-config/parameters') return configParams;

  // Replication endpoints
  if (endpoint === '/api/admin/replica-clusters/replication/stats') return replicationStats;
  if (endpoint === '/api/admin/replica-clusters/replicas') return clusters;
  if (endpoint === '/api/admin/replica-clusters/replication/activity') return replicationActivity;

  // Roles Manager endpoints
  if (endpoint === '/api/admin/roles-manager/permissions/categories') {
    return { totalRoles: roles.length, totalAdmins, totalUsers };
  }
  if (endpoint === '/api/admin/roles-manager/admin-roles') return adminRoles;
  if (endpoint === '/api/admin/roles-manager/user-roles') return userRoles;

  // System Monitor endpoints
  if (endpoint === '/api/admin/system-monitor/system/stats') return systemStats;
  if (endpoint === '/api/admin/system-monitor/databases/stats') return databaseStats;
  if (endpoint === '/api/admin/system-monitor/connections/active') return connections;
  if (endpoint === '/api/admin/system-monitor/queries/slow') return slowQueries;

  // Users Manager endpoints
  if (endpoint === '/api/admin/users-manager/stats') {
    return {
      totalUsers: administrators.length + endUsers.length,
      administrators: administrators.length,
      endUsers: endUsers.length,
      newThisMonth: 15,
    };
  }
  if (endpoint === '/api/admin/users-manager/administrators') return administrators;
  if (endpoint === '/api/admin/users-manager/end-users') return endUsers;

  // Logs endpoints
  if (endpoint === '/api/admin/logs/stats') return calculateLogStats(mockLogs);
  if (endpoint === '/api/admin/logs') return mockLogs;

  // Audit Log endpoints
  if (endpoint === '/api/admin/audit-log/entries') return auditEntries;
  if (endpoint === '/api/admin/audit-log/stats') return auditStatistics;
  if (endpoint === '/api/admin/audit-log/action-stats') return actionTypeStats;

  // Table Browser endpoints
  if (endpoint === '/api/admin/table-browser/tables') return adminTables;
  if (endpoint === '/api/admin/table-browser/table-schema') return tableSchema;
  if (endpoint === '/api/admin/table-browser/table-data') return tableData;

  // User Dashboard endpoints
  if (endpoint === '/api/user/dashboard/databases') return dashboardDatabases;
  if (endpoint === '/api/user/dashboard/activity') return activityRecords;
  if (endpoint === '/api/user/dashboard/table-access') return tableAccess;
  if (endpoint === '/api/user/dashboard/overview') return overviewStats;
  if (endpoint === '/api/user/dashboard/overview-stats') return overviewStats;
  if (endpoint === '/api/user/dashboard/my-databases') return myDatabases;

  // User Databases endpoints
  if (endpoint === '/api/user/databases/list') return userDatabases;

  // User Tables endpoints
  if (endpoint === '/api/user/tables/records') {
    const database = params?.database || '';
    const table = params?.table || '';
    return getTableRecords(database, table);
  }

  // Database Tools - Schemas endpoints
  if (endpoint === '/api/admin/database-tools/schemas') return allSchemas;
  if (endpoint === '/api/admin/database-tools/schemas/owners') return availableSchemaOwners;

  // Database Tools - Tables endpoints
  if (endpoint === '/api/admin/database-tools/tables') return adminTables;
  if (endpoint === '/api/admin/database-tools/tables/schema') return tableSchema;
  if (endpoint === '/api/admin/database-tools/tables/data') {
    const tableName = params?.table || '';
    return tableData[tableName] || [];
  }

  // Database Tools - Extensions endpoints
  if (endpoint === '/api/admin/database-tools/extensions') return installedExtensionsDetailed;
  if (endpoint === '/api/admin/database-tools/extensions/available') return availableExtensions;

  // Default: return empty array or object
  console.warn(`No mock data found for endpoint: ${endpoint}`);
  return [];
}

/**
 * API Client configuration
 */
interface ApiClientConfig {
  baseUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * Request options
 */
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

/**
 * API Response
 */
interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

class ApiClient {
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig = {}) {
    this.config = {
      baseUrl: config.baseUrl || '',
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    };
  }

  /**
   * Make an API request
   */
  async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {}, params = {} } = options;

    // In development mode, use mock data
    if (isDevelopment) {
      return this.mockRequest<T>(endpoint, { method, body, params });
    }

    // In production, make real HTTP request
    const url = this.buildUrl(endpoint, params);
    const requestHeaders = { ...this.config.headers, ...headers };

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(this.config.timeout!),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  /**
   * Mock request for development
   */
  private async mockRequest<T = any>(
    endpoint: string,
    options: { method?: string; body?: any; params?: any },
  ): Promise<T> {
    // Simulate network delay
    const delay = Math.random() * 500 + 300; // 300-800ms

    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = getMockDataForEndpoint(endpoint, options.params);
        resolve(mockData);
      }, delay);
    });
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(endpoint: string, params: Record<string, any>): string {
    const baseUrl = this.config.baseUrl || '';
    const url = new URL(endpoint, baseUrl || window.location.origin);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    return url.toString();
  }

  /**
   * GET request
   */
  async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  /**
   * POST request
   */
  async post<T = any>(endpoint: string, body?: any, params?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body, params });
  }

  /**
   * PUT request
   */
  async put<T = any>(endpoint: string, body?: any, params?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body, params });
  }

  /**
   * DELETE request
   */
  async delete<T = any>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', params });
  }

  /**
   * PATCH request
   */
  async patch<T = any>(endpoint: string, body?: any, params?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', body, params });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for custom instances
export default ApiClient;
