/**
 * User Roles with Permissions
 * 
 * Predefined user roles with full permission sets and resource limits
 */

import type { UserRoleWithPermissions } from './types';

export const userRolesWithPermissions: UserRoleWithPermissions[] = [
  { 
    id: 'data-analyst', 
    name: 'Data Analyst', 
    color: 'from-violet-500 to-purple-600',
    permissions: {
      project_create: true, project_delete: true, project_share: true, project_export: true,
      data_import: true, data_export: true, data_backup: true,
      api_access: true, api_keys: true, webhooks: true,
      custom_branding: true, custom_domain: true, sso: true,
      support_email: true, support_priority: true, support_phone: true,
      storage_limit: true, users_limit: true, requests_limit: true,
    },
    limits: { storage: 'Безліміт', users: 'Безліміт', requests: 'Безліміт' }
  },
  { 
    id: 'content-manager', 
    name: 'Content Manager', 
    color: 'from-blue-500 to-cyan-600',
    permissions: {
      project_create: true, project_delete: true, project_share: true, project_export: true,
      data_import: false, data_export: true, data_backup: false,
      api_access: false, api_keys: false, webhooks: false,
      custom_branding: false, custom_domain: false, sso: false,
      support_email: true, support_priority: false, support_phone: false,
      storage_limit: true, users_limit: true, requests_limit: true,
    },
    limits: { storage: '500 ГБ', users: '100', requests: '1M/день' }
  },
  { 
    id: 'report-viewer', 
    name: 'Report Viewer', 
    color: 'from-indigo-500 to-violet-600',
    permissions: {
      project_create: false, project_delete: false, project_share: false, project_export: true,
      data_import: false, data_export: true, data_backup: false,
      api_access: false, api_keys: false, webhooks: false,
      custom_branding: false, custom_domain: false, sso: false,
      support_email: true, support_priority: false, support_phone: false,
      storage_limit: false, users_limit: false, requests_limit: true,
    },
    limits: { storage: '50 ГБ', users: '10', requests: '100K/день' }
  },
  { 
    id: 'guest', 
    name: 'Guest User', 
    color: 'from-slate-400 to-slate-500',
    permissions: {
      project_create: false, project_delete: false, project_share: false, project_export: false,
      data_import: false, data_export: false, data_backup: false,
      api_access: false, api_keys: false, webhooks: false,
      custom_branding: false, custom_domain: false, sso: false,
      support_email: false, support_priority: false, support_phone: false,
      storage_limit: false, users_limit: false, requests_limit: false,
    },
    limits: { storage: '10 ГБ', users: '1', requests: '10K/день' }
  },
];
