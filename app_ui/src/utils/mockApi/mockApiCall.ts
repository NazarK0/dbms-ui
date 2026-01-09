import { API_DELAYS, type DelayType } from './constants';
import { getRandomDelay } from './helpers';

// Import mock data dynamically based on endpoint
async function getMockDataForEndpoint(endpoint: string): Promise<any> {
  // Convert endpoint path to mock data path
  // Example: 'admin.dashboard.widgets.list' -> import from mockData/admin/dashboard
  // Also supports old format: 'databases/list' for backward compatibility
  
  const parts = endpoint.split('.');
  
  // Support for old slash-based format (e.g., 'databases/list', 'schemas/list')
  if (endpoint.includes('/')) {
    const [module, action] = endpoint.split('/');
    
    try {
      // Map old endpoints to new data sources
      switch (module) {
        case 'databases':
          const { userDatabases, templateDatabases, adminDatabases } = 
            await import('../../mockData/admin/databases');
          if (action === 'list') return [...userDatabases, ...templateDatabases, ...adminDatabases];
          break;
          
        case 'schemas':
          const { schemas } = await import('../../mockData/admin/schemas');
          if (action === 'list') return schemas;
          break;
          
        case 'audit':
          const auditLog = await import('../../mockData/admin/auditLog');
          if (action === 'statistics') return auditLog.auditStatistics || {};
          if (action === 'action-stats') return auditLog.actionTypeStats || [];
          if (action === 'logs') return auditLog.auditEntries;
          break;
          
        case 'config':
          const config = await import('../../mockData/admin/postgresConfig');
          if (action === 'parameters') {
            return [
              ...config.memoryParams,
              ...config.connectionParams,
              ...config.walParams,
              ...config.autovacuumParams,
              ...config.loggingParams,
              ...config.performanceParams,
            ];
          }
          break;
          
        case 'replicas':
          const { replicas, replicationStats, replicationActivity } = 
            await import('../../mockData/admin/replicas');
          if (action === 'stats') return replicationStats;
          if (action === 'topology') return { replicas };
          if (action === 'clusters') return replicas;
          if (action === 'activity') return replicationActivity;
          break;
          
        case 'logs':
          const { logs } = await import('../../mockData/admin/logs');
          if (action === 'statistics') {
            // Calculate statistics
            return {
              totalLogs: logs.length,
              errorCount: logs.filter(l => l.level === 'ERROR').length,
              warningCount: logs.filter(l => l.level === 'WARNING').length,
              infoCount: logs.filter(l => l.level === 'INFO').length,
            };
          }
          if (action === 'list') return logs;
          break;
      }
    } catch (error) {
      console.error(`Error loading mock data for endpoint ${endpoint}:`, error);
      return {};
    }
  }
  
  try {
    // Admin endpoints
    if (parts[0] === 'admin') {
      // Dashboard endpoints
      if (parts[1] === 'dashboard') {
        const { statsData, recentActivity, activeConnections, performanceMetrics } = 
          await import('../../mockData/admin/dashboard');
        
        if (parts[2] === 'widgets') {
          if (parts[3] === 'list') return statsData;
          if (parts[3] === 'allDatabases') return statsData;
          if (parts[3] === 'allAdmins') return statsData;
          if (parts[3] === 'lastActivity') return recentActivity;
        }
        if (parts[2] === 'stats') {
          if (parts[3] === 'overview') return statsData;
          if (parts[3] === 'performance') return performanceMetrics;
        }
        if (parts[2] === 'activity') {
          if (parts[3] === 'recent') return recentActivity;
          if (parts[3] === 'connections') return activeConnections;
        }
      }
      
      // Database Manager endpoints
      if (parts[1] === 'databaseManager') {
        if (parts[2] === 'userDatabases') {
          const { userDatabases } = await import('../../mockData/admin/databases');
          return userDatabases;
        }
        if (parts[2] === 'templateDatabases') {
          const { templateDatabases } = await import('../../mockData/admin/databases');
          return templateDatabases;
        }
        if (parts[2] === 'adminDatabases') {
          const { adminDatabases } = await import('../../mockData/admin/databases');
          return adminDatabases;
        }
        if (parts[2] === 'options') {
          const options = await import('../../mockData/admin/database-options');
          if (parts[3] === 'encodings') return options.encodings;
          if (parts[3] === 'collations') return options.collations;
          if (parts[3] === 'templates') return options.templates;
          if (parts[3] === 'owners') return options.owners;
          if (parts[3] === 'tablespaces') return options.tablespaces;
        }
      }
      
      // Database Tools endpoints
      if (parts[1] === 'databaseTools') {
        if (parts[2] === 'schemas') {
          const { schemas } = await import('../../mockData/admin/schemas');
          return schemas;
        }
        if (parts[2] === 'tables') {
          const { tables } = await import('../../mockData/admin/tables');
          return tables;
        }
        if (parts[2] === 'extensions') {
          const { extensions } = await import('../../mockData/admin/extensions');
          return extensions;
        }
        if (parts[2] === 'functions') {
          const { functions } = await import('../../mockData/admin/functions');
          return functions;
        }
        if (parts[2] === 'triggers') {
          const { triggers, rules } = await import('../../mockData/admin/triggers');
          return parts[3] === 'rules' ? rules : triggers;
        }
      }
      
      // Users Manager endpoints
      if (parts[1] === 'usersManager') {
        const users = await import('../../mockData/admin/users');
        if (parts[2] === 'users') {
          if (parts[3] === 'administrators') return users.administrators;
          if (parts[3] === 'endUsers') return users.endUsers;
          return [...users.administrators, ...users.endUsers];
        }
        if (parts[2] === 'timezones') return users.timezones;
      }
      
      // Roles Manager endpoints
      if (parts[1] === 'rolesManager') {
        const permissions = await import('../../mockData/admin/permissions');
        if (parts[2] === 'adminRoles') return permissions.adminRoles;
        if (parts[2] === 'userRoles') return permissions.userRoles;
        if (parts[2] === 'permissions') {
          if (parts[3] === 'admin') return permissions.adminPermissions;
          if (parts[3] === 'user') return permissions.userPermissions;
          if (parts[3] === 'categories') return permissions.permissionCategories;
          if (parts[3] === 'uiMenuItems') return permissions.uiMenuItems;
        }
      }
      
      // System Monitor endpoints
      if (parts[1] === 'systemMonitor') {
        const monitoring = await import('../../mockData/admin/monitoring');
        if (parts[2] === 'connections') return monitoring.activeConnections;
        if (parts[2] === 'databases') return monitoring.databaseStats;
        if (parts[2] === 'queries') return monitoring.slowQueries;
        if (parts[2] === 'system') return monitoring.systemStats;
      }
      
      // Performance Analyzer endpoints
      if (parts[1] === 'performanceAnalyzer') {
        const performance = await import('../../mockData/admin/performance');
        if (parts[2] === 'queries') {
          if (parts[3] === 'stats') return performance.queryStats;
          if (parts[3] === 'slow') return performance.slowQueries;
        }
        if (parts[2] === 'cache') return performance.cacheStats;
        if (parts[2] === 'indexes') return performance.indexUsage;
        if (parts[2] === 'locks') return performance.locks;
        if (parts[2] === 'tables') return performance.tableStats;
        if (parts[2] === 'waitEvents') return performance.waitEvents;
      }
      
      // Replica Clusters endpoints
      if (parts[1] === 'replicaClusters') {
        const { replicas, replicationStats, replicationActivity } = 
          await import('../../mockData/admin/replicas');
        if (parts[2] === 'replicas') return replicas;
        if (parts[2] === 'replication') {
          if (parts[3] === 'stats') return replicationStats;
          if (parts[3] === 'activity') return replicationActivity;
        }
      }
      
      // Audit Log endpoints
      if (parts[1] === 'auditLog') {
        const auditLog = await import('../../mockData/admin/auditLog');
        if (parts[2] === 'entries') return auditLog.auditEntries;
        if (parts[2] === 'filters') return auditLog.auditFilters;
      }
      
      // PostgreSQL Config endpoints
      if (parts[1] === 'postgresConfig') {
        const config = await import('../../mockData/admin/postgresConfig');
        if (parts[2] === 'parameters') {
          if (parts[3] === 'all') {
            return [
              ...config.memoryParams,
              ...config.connectionParams,
              ...config.walParams,
              ...config.autovacuumParams,
              ...config.loggingParams,
              ...config.performanceParams,
            ];
          }
          if (parts[3] === 'memory') return config.memoryParams;
          if (parts[3] === 'connection') return config.connectionParams;
          if (parts[3] === 'wal') return config.walParams;
          if (parts[3] === 'autovacuum') return config.autovacuumParams;
          if (parts[3] === 'logging') return config.loggingParams;
          if (parts[3] === 'performance') return config.performanceParams;
        }
        if (parts[2] === 'profiles') return config.profiles;
        if (parts[2] === 'presets') return config.presets;
      }
      
      // CLI endpoints
      if (parts[1] === 'cli') {
        const { cliCommands, cliHistory } = await import('../../mockData/admin/cli');
        if (parts[2] === 'commands') return cliCommands;
        if (parts[2] === 'history') return cliHistory;
      }
      
      // Logs endpoints
      if (parts[1] === 'logs') {
        const { logs } = await import('../../mockData/admin/logs');
        return logs;
      }
    }
    
    // User endpoints
    if (parts[0] === 'user') {
      if (parts[1] === 'dashboard') {
        const dashboard = await import('../../mockData/user/dashboard');
        if (parts[2] === 'databases') {
          if (parts[3] === 'all') return dashboard.dashboardDatabases;
          if (parts[3] === 'my') return dashboard.myDatabases;
          if (parts[3] === 'withTables') return dashboard.databasesWithTables;
        }
        if (parts[2] === 'activity') {
          if (parts[3] === 'records') return dashboard.activityRecords;
          if (parts[3] === 'accessedTables') return dashboard.accessedTables;
          if (parts[3] === 'modifiedRecords') return dashboard.modifiedRecords;
        }
      }
      
      if (parts[1] === 'profile') {
        const profile = await import('../../mockData/user/profile');
        if (parts[2] === 'info') return profile.userInfo;
        if (parts[2] === 'databaseAccess') return profile.databaseAccess;
        if (parts[2] === 'activityStats') return profile.activityStats;
        if (parts[2] === 'recentActivity') return profile.recentActivity;
        if (parts[2] === 'groupedDatabases') return profile.groupedDatabases;
      }
      
      if (parts[1] === 'databases') {
        const databases = await import('../../mockData/user/databases');
        if (parts[2] === 'analytics') return databases.analyticsDatabase;
        if (parts[2] === 'content') return databases.contentDatabase;
        if (parts[2] === 'crm') return databases.crmDatabase;
        if (parts[2] === 'ecommerce') return databases.ecommerceDatabase;
        if (parts[2] === 'projects') return databases.projectManagementDatabase;
        if (parts[2] === 'reports') return databases.reportsDatabase;
      }
      
      if (parts[1] === 'tableSchemas') {
        const schemas = await import('../../mockData/user/tableschemas');
        if (parts[2] === 'analytics') return schemas.analyticsTableSchemas;
        if (parts[2] === 'content') return schemas.contentTableSchemas;
        if (parts[2] === 'crm') return schemas.crmTableSchemas;
        if (parts[2] === 'ecommerce') return schemas.ecommerceTableSchemas;
        if (parts[2] === 'projects') return schemas.projectsTableSchemas;
        if (parts[2] === 'reports') return schemas.reportsTableSchemas;
        if (parts[2] === 'system') return schemas.systemTableSchemas;
      }
      
      if (parts[1] === 'records') {
        const { records } = await import('../../mockData/user/records');
        return records;
      }
      
      if (parts[1] === 'roles') {
        const { userRoles } = await import('../../mockData/user/userRoles');
        return userRoles;
      }
    }
    
    // Fallback
    console.warn(`No mock data found for endpoint: ${endpoint}`);
    return {};
  } catch (error) {
    console.error(`Error loading mock data for endpoint ${endpoint}:`, error);
    return {};
  }
}

/**
 * Імітація API запиту з фіксованою затримкою (в мілісекундах)
 * @param endpoint - Назва endpoint (для логування)
 * @param params - Параметри запиту
 * @param delay - Фіксована затримка в мілісекундах
 * @param successRate - Ймовірність успіху (0-1)
 * @returns Promise з даними
 */
export async function mockApiCall<T = any>(
  endpoint: string,
  params: Record<string, any>,
  delay: number,
  successRate?: number
): Promise<T>;

/**
 * Імітація API запиту з випадковою затримкою
 * @param data - Дані для повернення
 * @param delayType - Тип затримки (fast, normal, slow, verySlow)
 * @param successRate - Ймовірність успіху (0-1), за замовчуванням 1 (завжди успішно)
 * @returns Promise з даними або помилкою
 */
export async function mockApiCall<T>(
  data: T,
  delayType: DelayType,
  successRate?: number
): Promise<T>;

/**
 * Реалізація mockApiCall з перевантаженнями
 */
export async function mockApiCall<T = any>(
  dataOrEndpoint: T | string,
  delayTypeOrParams: DelayType | Record<string, any> = 'normal',
  delayOrSuccessRate: number = 1,
  successRate: number = 1
): Promise<T> {
  let actualDelay: number;
  let actualSuccessRate: number;
  let actualData: T;

  // Перевірка чи це виклик з endpoint + params + delay
  if (typeof dataOrEndpoint === 'string') {
    // Endpoint-based call: mockApiCall('endpoint', {params}, 900)
    actualDelay = delayOrSuccessRate;
    actualSuccessRate = successRate;
    
    // Load mock data based on endpoint
    actualData = await getMockDataForEndpoint(dataOrEndpoint) as T;
  } else if (typeof delayTypeOrParams === 'string') {
    // DelayType-based call: mockApiCall(data, 'normal')
    const delayType = delayTypeOrParams as DelayType;
    const { min, max } = API_DELAYS[delayType];
    actualDelay = getRandomDelay(min, max);
    actualSuccessRate = delayOrSuccessRate;
    actualData = dataOrEndpoint;
  } else {
    // Fallback - не повинно статися
    actualDelay = 500;
    actualSuccessRate = 1;
    actualData = dataOrEndpoint;
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Імітація можливих помилок
      const shouldSucceed = Math.random() < actualSuccessRate;
      
      if (shouldSucceed) {
        resolve(actualData);
      } else {
        reject(new Error('Network error: Failed to fetch data'));
      }
    }, actualDelay);
  });
}