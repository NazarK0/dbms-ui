/**
 * Types for RBAC Matrix components
 */

import { LucideIcon } from 'lucide-react';

export type RoleType = 'admin' | 'user';

export interface Permission {
  id: string;
  name: string;
}

export interface PermissionGroup {
  category: string;
  icon: LucideIcon;
  permissions: Permission[];
}

export interface RoleWithPermissions {
  id: string;
  name: string;
  color: string;
  permissions: Record<string, boolean>;
  limits?: {
    storage?: string;
    users?: string;
    requests?: string;
  };
}
