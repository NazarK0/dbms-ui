/**
 * Default settings and configurations for role creation
 */

import type {
  UiSettings,
  UiDisplaySettings,
  RlsPolicies,
} from '../types';

// Default UI settings for admin panel
export const defaultUiSettings: UiSettings = {
  dashboard: true,
  databases: true,
  users: false,
  roles: false,
  query: true,
  performance: true,
  clusters: false,
  backups: true,
  logs: true,
  config: false,
};

// Default UI display settings
export const defaultUiDisplaySettings: UiDisplaySettings = {
  restApi: false,
  connectionStrings: false,
  technicalIds: false,
  debugInfo: false,
  queryPlans: false,
  rawSql: false,
  systemSchemas: false,
  internalTables: false,
};

// Default RLS policies
export const defaultRlsPolicies: RlsPolicies = {
  users: {
    enabled: false,
    select: true,
    insert: false,
    update: false,
    delete: false,
    using: 'user_id = current_user_id()',
    withCheck: 'user_id = current_user_id()',
  },
  orders: {
    enabled: false,
    select: true,
    insert: true,
    update: true,
    delete: false,
    using: 'company_id = current_user_company_id()',
    withCheck: 'company_id = current_user_company_id()',
  },
  products: {
    enabled: false,
    select: true,
    insert: false,
    update: false,
    delete: false,
    using: 'is_public = true OR owner_id = current_user_id()',
    withCheck: 'owner_id = current_user_id()',
  },
  audit_logs: {
    enabled: false,
    select: true,
    insert: false,
    update: false,
    delete: false,
    using: "user_id = current_user_id() OR current_user_role() = 'admin'",
    withCheck: 'false',
  },
};
