/**
 * API Endpoints Configuration
 * 
 * This file provides centralized access to all API endpoints used in the application.
 * It reads from the api-endpoints.ts file and provides type-safe access to endpoints.
 */

import apiEndpoints from './api-endpoints';

// Type definitions for API endpoints structure
export type ApiEndpoints = typeof apiEndpoints;

/**
 * Get API endpoint by path
 * 
 * @example
 * getEndpoint('admin.dashboard.widgets.list')
 * // Returns: '/api/admin/dashboard/widgets'
 */
export function getEndpoint(path: string): string {
  const keys = path.split('.');
  let result: any = apiEndpoints;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      throw new Error(`API endpoint not found: ${path}`);
    }
  }
  
  if (typeof result !== 'string') {
    throw new Error(`API endpoint path does not resolve to a URL: ${path}`);
  }
  
  return result;
}

/**
 * API endpoints organized by module
 */
export const API = {
  // Admin endpoints
  admin: {
    dashboard: {
      widgets: {
        list: () => getEndpoint('admin.dashboard.widgets.list'),
        allDatabases: () => getEndpoint('admin.dashboard.widgets.allDatabases'),
        allAdmins: () => getEndpoint('admin.dashboard.widgets.allAdmins'),
        lastActivity: () => getEndpoint('admin.dashboard.widgets.lastActivity'),
      },
      stats: {
        overview: () => getEndpoint('admin.dashboard.stats.overview'),
        performance: () => getEndpoint('admin.dashboard.stats.performance'),
      },
      activity: {
        recent: () => getEndpoint('admin.dashboard.activity.recent'),
        connections: () => getEndpoint('admin.dashboard.activity.connections'),
      },
    },
    databaseManager: {
      userDatabases: {
        list: () => getEndpoint('admin.databaseManager.userDatabases.list'),
        create: () => getEndpoint('admin.databaseManager.userDatabases.create'),
        update: () => getEndpoint('admin.databaseManager.userDatabases.update'),
        delete: () => getEndpoint('admin.databaseManager.userDatabases.delete'),
      },
      templateDatabases: {
        list: () => getEndpoint('admin.databaseManager.templateDatabases.list'),
        create: () => getEndpoint('admin.databaseManager.templateDatabases.create'),
      },
      adminDatabases: {
        list: () => getEndpoint('admin.databaseManager.adminDatabases.list'),
      },
      options: {
        encodings: () => getEndpoint('admin.databaseManager.options.encodings'),
        collations: () => getEndpoint('admin.databaseManager.options.collations'),
        templates: () => getEndpoint('admin.databaseManager.options.templates'),
        owners: () => getEndpoint('admin.databaseManager.options.owners'),
        tablespaces: () => getEndpoint('admin.databaseManager.options.tablespaces'),
      },
    },
    databaseTools: {
      schemas: {
        list: () => getEndpoint('admin.databaseTools.schemas.list'),
        create: () => getEndpoint('admin.databaseTools.schemas.create'),
        update: () => getEndpoint('admin.databaseTools.schemas.update'),
        delete: () => getEndpoint('admin.databaseTools.schemas.delete'),
        owners: () => getEndpoint('admin.databaseTools.schemas.owners'),
      },
      tables: {
        list: () => getEndpoint('admin.databaseTools.tables.list'),
        browse: () => getEndpoint('admin.databaseTools.tables.browse'),
        data: () => getEndpoint('admin.databaseTools.tables.data'),
        schema: () => getEndpoint('admin.databaseTools.tables.schema'),
      },
      extensions: {
        list: () => getEndpoint('admin.databaseTools.extensions.list'),
        install: () => getEndpoint('admin.databaseTools.extensions.install'),
        uninstall: () => getEndpoint('admin.databaseTools.extensions.uninstall'),
      },
      functions: {
        list: () => getEndpoint('admin.databaseTools.functions.list'),
        create: () => getEndpoint('admin.databaseTools.functions.create'),
        delete: () => getEndpoint('admin.databaseTools.functions.delete'),
      },
      triggers: {
        list: () => getEndpoint('admin.databaseTools.triggers.list'),
        create: () => getEndpoint('admin.databaseTools.triggers.create'),
        delete: () => getEndpoint('admin.databaseTools.triggers.delete'),
      },
      dataTypes: {
        list: () => getEndpoint('admin.databaseTools.dataTypes.list'),
        enum: () => getEndpoint('admin.databaseTools.dataTypes.enum'),
        composite: () => getEndpoint('admin.databaseTools.dataTypes.composite'),
        domain: () => getEndpoint('admin.databaseTools.dataTypes.domain'),
      },
      foreignServers: {
        list: () => getEndpoint('admin.databaseTools.foreignServers.list'),
        create: () => getEndpoint('admin.databaseTools.foreignServers.create'),
        delete: () => getEndpoint('admin.databaseTools.foreignServers.delete'),
      },
      backupRestore: {
        backups: () => getEndpoint('admin.databaseTools.backupRestore.backups'),
        schedules: () => getEndpoint('admin.databaseTools.backupRestore.schedules'),
        create: () => getEndpoint('admin.databaseTools.backupRestore.create'),
        restore: () => getEndpoint('admin.databaseTools.backupRestore.restore'),
      },
      queryExecutor: {
        execute: () => getEndpoint('admin.databaseTools.queryExecutor.execute'),
        history: () => getEndpoint('admin.databaseTools.queryExecutor.history'),
        saved: () => getEndpoint('admin.databaseTools.queryExecutor.saved'),
        templates: () => getEndpoint('admin.databaseTools.queryExecutor.templates'),
      },
      schemaVisualizer: {
        data: () => getEndpoint('admin.databaseTools.schemaVisualizer.data'),
      },
    },
    usersManager: {
      users: {
        list: () => getEndpoint('admin.usersManager.users.list'),
        administrators: () => getEndpoint('admin.usersManager.users.administrators'),
        endUsers: () => getEndpoint('admin.usersManager.users.endUsers'),
        create: () => getEndpoint('admin.usersManager.users.create'),
        update: () => getEndpoint('admin.usersManager.users.update'),
        delete: () => getEndpoint('admin.usersManager.users.delete'),
      },
      timezones: () => getEndpoint('admin.usersManager.timezones'),
      stats: () => getEndpoint('admin.usersManager.stats'),
    },
    rolesManager: {
      adminRoles: {
        list: () => getEndpoint('admin.rolesManager.adminRoles.list'),
        create: () => getEndpoint('admin.rolesManager.adminRoles.create'),
        update: () => getEndpoint('admin.rolesManager.adminRoles.update'),
        delete: () => getEndpoint('admin.rolesManager.adminRoles.delete'),
      },
      userRoles: {
        list: () => getEndpoint('admin.rolesManager.userRoles.list'),
        create: () => getEndpoint('admin.rolesManager.userRoles.create'),
        update: () => getEndpoint('admin.rolesManager.userRoles.update'),
        delete: () => getEndpoint('admin.rolesManager.userRoles.delete'),
      },
      permissions: {
        admin: () => getEndpoint('admin.rolesManager.permissions.admin'),
        user: () => getEndpoint('admin.rolesManager.permissions.user'),
        categories: () => getEndpoint('admin.rolesManager.permissions.categories'),
        uiMenuItems: () => getEndpoint('admin.rolesManager.permissions.uiMenuItems'),
      },
    },
    systemMonitor: {
      connections: {
        active: () => getEndpoint('admin.systemMonitor.connections.active'),
      },
      databases: {
        stats: () => getEndpoint('admin.systemMonitor.databases.stats'),
      },
      queries: {
        slow: () => getEndpoint('admin.systemMonitor.queries.slow'),
      },
      system: {
        stats: () => getEndpoint('admin.systemMonitor.system.stats'),
      },
    },
    performanceAnalyzer: {
      queries: {
        stats: () => getEndpoint('admin.performanceAnalyzer.queries.stats'),
        slow: () => getEndpoint('admin.performanceAnalyzer.queries.slow'),
      },
      cache: {
        stats: () => getEndpoint('admin.performanceAnalyzer.cache.stats'),
      },
      indexes: {
        usage: () => getEndpoint('admin.performanceAnalyzer.indexes.usage'),
      },
      locks: {
        active: () => getEndpoint('admin.performanceAnalyzer.locks.active'),
      },
      tables: {
        stats: () => getEndpoint('admin.performanceAnalyzer.tables.stats'),
      },
      waitEvents: {
        list: () => getEndpoint('admin.performanceAnalyzer.waitEvents.list'),
      },
    },
    replicaClusters: {
      replicas: {
        list: () => getEndpoint('admin.replicaClusters.replicas.list'),
        create: () => getEndpoint('admin.replicaClusters.replicas.create'),
        update: () => getEndpoint('admin.replicaClusters.replicas.update'),
        delete: () => getEndpoint('admin.replicaClusters.replicas.delete'),
      },
      replication: {
        stats: () => getEndpoint('admin.replicaClusters.replication.stats'),
        activity: () => getEndpoint('admin.replicaClusters.replication.activity'),
      },
    },
    auditLog: {
      entries: {
        list: () => getEndpoint('admin.auditLog.entries.list'),
        export: () => getEndpoint('admin.auditLog.entries.export'),
      },
      filters: {
        actions: () => getEndpoint('admin.auditLog.filters.actions'),
        categories: () => getEndpoint('admin.auditLog.filters.categories'),
        users: () => getEndpoint('admin.auditLog.filters.users'),
      },
      stats: () => getEndpoint('admin.auditLog.stats'),
      statistics: () => getEndpoint('admin.auditLog.stats'),
      actionStats: () => getEndpoint('admin.auditLog.actionStats'),
      list: () => getEndpoint('admin.auditLog.entries.list'),
    },
    postgresConfig: {
      parameters: {
        all: () => getEndpoint('admin.postgresConfig.parameters.all'),
        memory: () => getEndpoint('admin.postgresConfig.parameters.memory'),
        connection: () => getEndpoint('admin.postgresConfig.parameters.connection'),
        wal: () => getEndpoint('admin.postgresConfig.parameters.wal'),
        autovacuum: () => getEndpoint('admin.postgresConfig.parameters.autovacuum'),
        logging: () => getEndpoint('admin.postgresConfig.parameters.logging'),
        performance: () => getEndpoint('admin.postgresConfig.parameters.performance'),
      },
      profiles: {
        list: () => getEndpoint('admin.postgresConfig.profiles.list'),
        create: () => getEndpoint('admin.postgresConfig.profiles.create'),
        apply: () => getEndpoint('admin.postgresConfig.profiles.apply'),
        delete: () => getEndpoint('admin.postgresConfig.profiles.delete'),
      },
      presets: {
        list: () => getEndpoint('admin.postgresConfig.presets.list'),
      },
    },
    cli: {
      commands: {
        common: () => getEndpoint('admin.cli.commands.common'),
        examples: () => getEndpoint('admin.cli.commands.examples'),
      },
      history: () => getEndpoint('admin.cli.history'),
    },
    logs: {
      list: () => getEndpoint('admin.logs.list'),
      stats: () => getEndpoint('admin.logs.stats'),
    },
    navigation: {
      menu: () => getEndpoint('admin.navigation.menu'),
    },
  },
  
  // User endpoints
  user: {
    dashboard: {
      overview: () => getEndpoint('user.dashboard.overview'),
      databases: {
        all: () => getEndpoint('user.dashboard.databases.all'),
        my: () => getEndpoint('user.dashboard.databases.my'),
        withTables: () => getEndpoint('user.dashboard.databases.withTables'),
      },
      activity: {
        records: () => getEndpoint('user.dashboard.activity.records'),
        accessedTables: () => getEndpoint('user.dashboard.activity.accessedTables'),
        modifiedRecords: () => getEndpoint('user.dashboard.activity.modifiedRecords'),
      },
    },
    profile: {
      info: () => getEndpoint('user.profile.info'),
      databaseAccess: () => getEndpoint('user.profile.databaseAccess'),
      activityStats: () => getEndpoint('user.profile.activityStats'),
      recentActivity: () => getEndpoint('user.profile.recentActivity'),
      groupedDatabases: () => getEndpoint('user.profile.groupedDatabases'),
    },
    databases: {
      list: () => getEndpoint('user.databases.list'),
      analytics: () => getEndpoint('user.databases.analytics'),
      content: () => getEndpoint('user.databases.content'),
      crm: () => getEndpoint('user.databases.crm'),
      ecommerce: () => getEndpoint('user.databases.ecommerce'),
      projects: () => getEndpoint('user.databases.projects'),
      reports: () => getEndpoint('user.databases.reports'),
    },
    tables: {
      list: (params: { database: string }) => getEndpoint('user.tables.list'),
      records: (params: { database: string; table: string }) => getEndpoint('user.tables.records'),
    },
    tableSchemas: {
      analytics: () => getEndpoint('user.tableSchemas.analytics'),
      content: () => getEndpoint('user.tableSchemas.content'),
      crm: () => getEndpoint('user.tableSchemas.crm'),
      ecommerce: () => getEndpoint('user.tableSchemas.ecommerce'),
      projects: () => getEndpoint('user.tableSchemas.projects'),
      reports: () => getEndpoint('user.tableSchemas.reports'),
      system: () => getEndpoint('user.tableSchemas.system'),
    },
    records: {
      list: () => getEndpoint('user.records.list'),
      create: () => getEndpoint('user.records.create'),
      update: () => getEndpoint('user.records.update'),
      delete: () => getEndpoint('user.records.delete'),
    },
    roles: {
      available: () => getEndpoint('user.roles.available'),
    },
  },
} as const;

export default API;