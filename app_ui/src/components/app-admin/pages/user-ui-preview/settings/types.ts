import { CustomRole, RoleConfiguration } from "./role-permission-mapper/types";



export interface UserPermissions {
  createProjects: boolean;
  deleteProjects: boolean;
  shareProjects: boolean;
  exportData: boolean;
  importData: boolean;
  useApi: boolean;
  customBranding: boolean;
  prioritySupport: boolean;
}

export interface RLSRule {
  id: string;
  table: string;
  operation: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
  condition: string;
  enabled: boolean;
}




export interface MultiRoleState {
  selectedRoleIds: string[];
  roleConfigurations: Record<string, RoleConfiguration>;
  customRoles: CustomRole[];
}

