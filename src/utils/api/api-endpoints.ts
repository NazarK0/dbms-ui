/**
 * API Endpoints Configuration
 * Centralized API endpoint paths for the application
 */

export const apiEndpoints = {
  admin: {
    dashboard: {
      widgets: {
        list: '/api/admin/dashboard/widgets',
        allDatabases: '/api/admin/dashboard/widgets/all-databases',
        allAdmins: '/api/admin/dashboard/widgets/all-admins',
        lastActivity: '/api/admin/dashboard/widgets/last-activity',
      },
      stats: {
        overview: '/api/admin/dashboard/stats/overview',
        performance: '/api/admin/dashboard/stats/performance',
      },
      activity: {
        recent: '/api/admin/dashboard/activity/recent',
        connections: '/api/admin/dashboard/activity/connections',
      },
    },
    databaseManager: {
      userDatabases: {
        list: '/api/admin/database-manager/user-databases',
        create: '/api/admin/database-manager/user-databases/create',
        update: '/api/admin/database-manager/user-databases/update',
        delete: '/api/admin/database-manager/user-databases/delete',
      },
      templateDatabases: {
        list: '/api/admin/database-manager/template-databases',
        create: '/api/admin/database-manager/template-databases/create',
      },
      adminDatabases: {
        list: '/api/admin/database-manager/admin-databases',
      },
      options: {
        encodings: '/api/admin/database-manager/options/encodings',
        collations: '/api/admin/database-manager/options/collations',
        templates: '/api/admin/database-manager/options/templates',
        owners: '/api/admin/database-manager/options/owners',
        tablespaces: '/api/admin/database-manager/options/tablespaces',
      },
    },
    databaseTools: {
      schemas: {
        list: '/api/admin/database-tools/schemas',
        create: '/api/admin/database-tools/schemas/create',
        update: '/api/admin/database-tools/schemas/update',
        delete: '/api/admin/database-tools/schemas/delete',
        owners: '/api/admin/database-tools/schemas/owners',
      },
      tables: {
        list: '/api/admin/database-tools/tables',
        browse: '/api/admin/database-tools/tables/browse',
        data: '/api/admin/database-tools/tables/data',
        schema: '/api/admin/database-tools/tables/schema',
      },
      extensions: {
        list: '/api/admin/database-tools/extensions',
        install: '/api/admin/database-tools/extensions/install',
        uninstall: '/api/admin/database-tools/extensions/uninstall',
      },
      functions: {
        list: '/api/admin/database-tools/functions',
        create: '/api/admin/database-tools/functions/create',
        delete: '/api/admin/database-tools/functions/delete',
      },
      triggers: {
        list: '/api/admin/database-tools/triggers',
        create: '/api/admin/database-tools/triggers/create',
        delete: '/api/admin/database-tools/triggers/delete',
      },
      dataTypes: {
        list: '/api/admin/database-tools/data-types',
        enum: '/api/admin/database-tools/data-types/enum',
        composite: '/api/admin/database-tools/data-types/composite',
        domain: '/api/admin/database-tools/data-types/domain',
      },
      foreignServers: {
        list: '/api/admin/database-tools/foreign-servers',
        create: '/api/admin/database-tools/foreign-servers/create',
        delete: '/api/admin/database-tools/foreign-servers/delete',
      },
      backupRestore: {
        backups: '/api/admin/database-tools/backup-restore/backups',
        schedules: '/api/admin/database-tools/backup-restore/schedules',
        create: '/api/admin/database-tools/backup-restore/create',
        restore: '/api/admin/database-tools/backup-restore/restore',
      },
      queryExecutor: {
        execute: '/api/admin/database-tools/query-executor/execute',
        history: '/api/admin/database-tools/query-executor/history',
        saved: '/api/admin/database-tools/query-executor/saved',
        templates: '/api/admin/database-tools/query-executor/templates',
      },
      schemaVisualizer: {
        data: '/api/admin/database-tools/schema-visualizer',
      },
    },
    usersManager: {
      users: {
        list: '/api/admin/users-manager/users',
        administrators: '/api/admin/users-manager/administrators',
        endUsers: '/api/admin/users-manager/end-users',
        create: '/api/admin/users-manager/users/create',
        update: '/api/admin/users-manager/users/update',
        delete: '/api/admin/users-manager/users/delete',
      },
      timezones: '/api/admin/users-manager/timezones',
      stats: '/api/admin/users-manager/stats',
    },
    rolesManager: {
      adminRoles: {
        list: '/api/admin/roles-manager/admin-roles',
        create: '/api/admin/roles-manager/admin-roles/create',
        update: '/api/admin/roles-manager/admin-roles/update',
        delete: '/api/admin/roles-manager/admin-roles/delete',
      },
      userRoles: {
        list: '/api/admin/roles-manager/user-roles',
        create: '/api/admin/roles-manager/user-roles/create',
        update: '/api/admin/roles-manager/user-roles/update',
        delete: '/api/admin/roles-manager/user-roles/delete',
      },
      permissions: {
        admin: '/api/admin/roles-manager/permissions/admin',
        user: '/api/admin/roles-manager/permissions/user',
        categories: '/api/admin/roles-manager/permissions/categories',
        uiMenuItems: '/api/admin/roles-manager/permissions/ui-menu-items',
      },
    },
    systemMonitor: {
      connections: {
        active: '/api/admin/system-monitor/connections/active',
      },
      databases: {
        stats: '/api/admin/system-monitor/databases/stats',
      },
      queries: {
        slow: '/api/admin/system-monitor/queries/slow',
      },
      system: {
        stats: '/api/admin/system-monitor/system/stats',
      },
    },
    performanceAnalyzer: {
      queries: {
        stats: '/api/admin/performance-analyzer/queries/stats',
        slow: '/api/admin/performance-analyzer/queries/slow',
      },
      cache: {
        stats: '/api/admin/performance-analyzer/cache/stats',
      },
      indexes: {
        usage: '/api/admin/performance-analyzer/indexes/usage',
      },
      locks: {
        active: '/api/admin/performance-analyzer/locks/active',
      },
      tables: {
        stats: '/api/admin/performance-analyzer/tables/stats',
      },
      waitEvents: {
        list: '/api/admin/performance-analyzer/wait-events',
      },
    },
    replicaClusters: {
      replicas: {
        list: '/api/admin/replica-clusters/replicas',
        create: '/api/admin/replica-clusters/replicas/create',
        update: '/api/admin/replica-clusters/replicas/update',
        delete: '/api/admin/replica-clusters/replicas/delete',
      },
      replication: {
        stats: '/api/admin/replica-clusters/replication/stats',
        activity: '/api/admin/replica-clusters/replication/activity',
      },
    },
    auditLog: {
      entries: {
        list: '/api/admin/audit-log/entries',
        export: '/api/admin/audit-log/entries/export',
      },
      filters: {
        actions: '/api/admin/audit-log/filters/actions',
        categories: '/api/admin/audit-log/filters/categories',
        users: '/api/admin/audit-log/filters/users',
      },
      stats: '/api/admin/audit-log/stats',
      actionStats: '/api/admin/audit-log/action-stats',
    },
    postgresConfig: {
      parameters: {
        all: '/api/admin/postgres-config/parameters',
        memory: '/api/admin/postgres-config/parameters/memory',
        connection: '/api/admin/postgres-config/parameters/connection',
        wal: '/api/admin/postgres-config/parameters/wal',
        autovacuum: '/api/admin/postgres-config/parameters/autovacuum',
        logging: '/api/admin/postgres-config/parameters/logging',
        performance: '/api/admin/postgres-config/parameters/performance',
      },
      profiles: {
        list: '/api/admin/postgres-config/profiles',
        create: '/api/admin/postgres-config/profiles/create',
        apply: '/api/admin/postgres-config/profiles/apply',
        delete: '/api/admin/postgres-config/profiles/delete',
      },
      presets: {
        list: '/api/admin/postgres-config/presets',
      },
    },
    cli: {
      commands: {
        common: '/api/admin/cli/commands/common',
        examples: '/api/admin/cli/commands/examples',
      },
      history: '/api/admin/cli/history',
    },
    logs: {
      list: '/api/admin/logs',
      stats: '/api/admin/logs/stats',
    },
    navigation: {
      menu: '/api/admin/navigation/menu',
    },
  },
  user: {
    dashboard: {
      databases: {
        all: '/api/user/dashboard/databases',
        my: '/api/user/dashboard/databases/my',
        withTables: '/api/user/dashboard/databases/with-tables',
      },
      activity: {
        records: '/api/user/dashboard/activity/records',
        accessedTables: '/api/user/dashboard/activity/accessed-tables',
        modifiedRecords: '/api/user/dashboard/activity/modified-records',
      },
      overview: '/api/user/dashboard/overview',
    },
    profile: {
      info: '/api/user/profile/info',
      databaseAccess: '/api/user/profile/database-access',
      activityStats: '/api/user/profile/activity-stats',
      recentActivity: '/api/user/profile/recent-activity',
      groupedDatabases: '/api/user/profile/grouped-databases',
    },
    databases: {
      list: '/api/user/databases/list',
      analytics: '/api/user/databases/analytics',
      content: '/api/user/databases/content',
      crm: '/api/user/databases/crm',
      ecommerce: '/api/user/databases/ecommerce',
      projects: '/api/user/databases/projects',
      reports: '/api/user/databases/reports',
    },
    tables: {
      list: '/api/user/tables/list',
      records: '/api/user/tables/records',
    },
    tableSchemas: {
      analytics: '/api/user/table-schemas/analytics',
      content: '/api/user/table-schemas/content',
      crm: '/api/user/table-schemas/crm',
      ecommerce: '/api/user/table-schemas/ecommerce',
      projects: '/api/user/table-schemas/projects',
      reports: '/api/user/table-schemas/reports',
      system: '/api/user/table-schemas/system',
    },
    records: {
      list: '/api/user/records',
      create: '/api/user/records/create',
      update: '/api/user/records/update',
      delete: '/api/user/records/delete',
    },
    roles: {
      available: '/api/user/roles/available',
    },
  },
} as const;

export default apiEndpoints;