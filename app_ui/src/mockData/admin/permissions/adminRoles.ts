/**
 * Admin Roles with Permissions
 * 
 * Predefined admin roles with full permission sets
 */

import type { AdminRoleWithPermissions } from './types';

export const adminRolesWithPermissions: AdminRoleWithPermissions[] = [
  { 
    id: 'superadmin', 
    name: 'Superadmin', 
    color: 'from-red-500 to-red-600',
    permissions: {
      db_create: true, db_delete: true, db_modify: true, db_view: true,
      table_create: true, table_delete: true, table_alter: true, table_view: true,
      sql_select: true, sql_insert: true, sql_update: true, sql_delete: true,
      user_create: true, user_delete: true, user_modify: true, user_view: true,
      ext_install: true, func_create: true, trigger_create: true,
      backup_create: true, backup_restore: true, backup_view: true,
      monitor_view: true, logs_view: true, performance_view: true,
    }
  },
  { 
    id: 'dbadmin', 
    name: 'Database Admin', 
    color: 'from-lime-500 to-green-600',
    permissions: {
      db_create: true, db_delete: true, db_modify: true, db_view: true,
      table_create: true, table_delete: true, table_alter: true, table_view: true,
      sql_select: true, sql_insert: true, sql_update: true, sql_delete: true,
      user_create: false, user_delete: false, user_modify: false, user_view: true,
      ext_install: true, func_create: true, trigger_create: true,
      backup_create: true, backup_restore: true, backup_view: true,
      monitor_view: true, logs_view: true, performance_view: true,
    }
  },
  { 
    id: 'developer', 
    name: 'Developer', 
    color: 'from-yellow-500 to-lime-600',
    permissions: {
      db_create: false, db_delete: false, db_modify: false, db_view: true,
      table_create: true, table_delete: false, table_alter: true, table_view: true,
      sql_select: true, sql_insert: true, sql_update: true, sql_delete: false,
      user_create: false, user_delete: false, user_modify: false, user_view: false,
      ext_install: false, func_create: true, trigger_create: true,
      backup_create: false, backup_restore: false, backup_view: true,
      monitor_view: true, logs_view: true, performance_view: true,
    }
  },
  { 
    id: 'analyst', 
    name: 'Analyst', 
    color: 'from-green-500 to-lime-600',
    permissions: {
      db_create: false, db_delete: false, db_modify: false, db_view: true,
      table_create: false, table_delete: false, table_alter: false, table_view: true,
      sql_select: true, sql_insert: false, sql_update: false, sql_delete: false,
      user_create: false, user_delete: false, user_modify: false, user_view: false,
      ext_install: false, func_create: false, trigger_create: false,
      backup_create: false, backup_restore: false, backup_view: false,
      monitor_view: true, logs_view: false, performance_view: true,
    }
  },
  { 
    id: 'viewer', 
    name: 'Viewer', 
    color: 'from-lime-600 to-yellow-600',
    permissions: {
      db_create: false, db_delete: false, db_modify: false, db_view: true,
      table_create: false, table_delete: false, table_alter: false, table_view: true,
      sql_select: false, sql_insert: false, sql_update: false, sql_delete: false,
      user_create: false, user_delete: false, user_modify: false, user_view: false,
      ext_install: false, func_create: false, trigger_create: false,
      backup_create: false, backup_restore: false, backup_view: false,
      monitor_view: true, logs_view: false, performance_view: true,
    }
  },
];
