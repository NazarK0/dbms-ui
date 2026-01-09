/**
 * Extended Types for Multi-Role and RLS Configuration
 */

import type { UserPermissions } from './types';

export interface RLSRule {
  id: string;
  table: string;
  operation: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
  condition: string;
  enabled: boolean;
}

export interface RoleConfiguration {
  roleId: string;
  roleName: string;
  permissions: UserPermissions;
  rlsRules: RLSRule[];
  databases: string[];
  enabled: boolean;
}

export interface CustomRole {
  id: string;
  name: string;
  description: string;
  color: string;
  configurations: RoleConfiguration[];
  createdAt: string;
  updatedAt: string;
  isCustom: true;
}

export interface MultiRoleState {
  selectedRoleIds: string[];
  roleConfigurations: Record<string, RoleConfiguration>;
  customRoles: CustomRole[];
}
