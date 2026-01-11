


/**
 * API Endpoints Configuration
 * Centralized API endpoint paths for the application
 */

import { AdminAppAPI } from ".";

enum APIMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

const endpointMethods = {
  get: APIMethod.GET,
  post: APIMethod.POST,
  put: APIMethod.PUT,
  delete: APIMethod.DELETE,
} as const;

export const apiEndpoints = {
  admin: {
    v1: {
      dashboard: {
        widgets: {
          recentActivity: {
            get: endpointMethods.get,
          },
          activeConnections: {
            get: endpointMethods.get,
          },
          list: {
            get: endpointMethods.get,
          },
        },
      },
    },
  },
} as const;

// --- TypeScript Definition for the Result ---
interface EndpointResult<M> {
  url: string;
  method: M;
}

/**
 * Recursive type: If the property is an APIMethod, return the Result.
 * Otherwise, continue recursing into the object.
 */
type PathProxy<T> = {
  readonly [K in keyof T]: T[K] extends APIMethod
    ? EndpointResult<T[K]>
    : T[K] extends object
      ? PathProxy<T[K]>
      : never;
};

const toKebabCase = (str: string): string =>
  str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Define the keys that represent HTTP methods.
 * These will NOT be appended to the URL string.
 */
const METHOD_KEYS = new Set(['get', 'post', 'put', 'delete', 'patch']);

function createApiProxy<T extends object>(obj: T, path: string[] = []): PathProxy<T> {
  return new Proxy(obj, {
    get(target, prop) {
      if (typeof prop !== 'string') return Reflect.get(target, prop);

      const value = (target as Record<string, unknown>)[prop];
      const isMethodKey = METHOD_KEYS.has(prop.toLowerCase());

      // If it's a method key (get/post/etc), we don't add it to the URL path array
      const newPath = isMethodKey ? [...path] : [...path, toKebabCase(prop)];

      if (value !== null && typeof value === 'object') {
        return createApiProxy(value as object, newPath);
      }

      // value is the APIMethod enum here
      return {
        url: newPath.join('/'),
        method: value as APIMethod,
      };
    },
  }) as PathProxy<T>;
}

// --- Usage ---

const API = createApiProxy(apiEndpoints);


// DEPRECATED MOCK API ENDPOINTS FOR TESTING PURPOSES ONLY
export const apiEndpointsAdminMock: AdminAppAPI = {
  get: {
    dashboard: {
      widgets: {
        list: '../mockData/admin/dashboard/widgets/list',
        databasesCount: '../mockData/admin/dashboard/widgets/databasesCount',
        adminsCount: '../mockData/admin/dashboard/widgets/adminsCount',
        recentActivity: '../mockData/admin/dashboard/widgets/recentActivity',
        usersCount: '../mockData/admin/dashboard/widgets/usersCount',
        tablesCount: '../mockData/admin/dashboard/widgets/tablesCount',
        usedStorage: '../mockData/admin/dashboard/widgets/usedStorage',
        performance: '../mockData/admin/dashboard/widgets/performance',
        activeConnections: '../mockData/admin/dashboard/widgets/activeConnections',
      }
    }

  }
   
} as const;

export default API;