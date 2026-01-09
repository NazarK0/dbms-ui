/**
 * Type definitions for permissions and roles
 */

// Permission structure for admin roles
export interface Permission {
  id: string;
  name: string;
}

export interface PermissionCategory {
  category: string;
  icon: any;
  permissions: Permission[];
}

// Admin roles with permissions
export interface AdminRoleWithPermissions {
  id: string;
  name: string;
  color: string;
  permissions: Record<string, boolean>;
}

// User roles with permissions
export interface UserRoleWithPermissions {
  id: string;
  name: string;
  color: string;
  permissions: Record<string, boolean>;
  limits: {
    storage: string;
    users: string;
    requests: string;
  };
}

// UI Menu Items (for role creation/editing)
export interface UIMenuItem {
  id: string;
  label: string;
  icon: any;
  description: string;
}
