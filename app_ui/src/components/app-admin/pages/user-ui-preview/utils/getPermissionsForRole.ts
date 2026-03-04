import { rolePermissions } from "../settings/role-permission-mapper/data";
import { UserPermissions } from "../types";

/**
 * Get permissions for a specific role
 *
 * Returns the permission set for a given role ID.
 * Falls back to default (all false) if role not found.
 *
 * @param roleId - Role identifier
 * @returns User permissions object
 *
 * @example
 * ```tsx
 * const perms = getPermissionsForRole('developer');
 * // {
 * //   createProjects: true,
 * //   deleteProjects: true,
 * //   shareProjects: true,
 * //   ...
 * // }
 * ```
 */
export const getPermissionsForRole = (roleId: string): UserPermissions => {
  return (
    rolePermissions[roleId] || {
      createProjects: false,
      deleteProjects: false,
      shareProjects: false,
      exportData: false,
      importData: false,
      useApi: false,
      customBranding: false,
      prioritySupport: false,
    }
  );
};
