/**
 * Export Utility Functions
 * 
 * Functions for exporting role and permission data to JSON format.
 * 
 * @module utils/export
 */

import { userRoles } from '../data';
import { getPermissionsForRole, getRoleById } from './roles';
import { getPermissionSummary } from './permissions';

/**
 * Export permissions to JSON
 * 
 * Exports a single role's permissions as formatted JSON string.
 * Includes role metadata and permission summary.
 * 
 * @param roleId - Role identifier
 * @returns Formatted JSON string
 * 
 * @example
 * ```tsx
 * const json = exportPermissionsToJSON('developer');
 * console.log(json);
 * // {
 * //   "roleId": "developer",
 * //   "roleName": "Developer",
 * //   "permissions": {
 * //     "createProjects": true,
 * //     "deleteProjects": true,
 * //     "shareProjects": true,
 * //     "exportData": true,
 * //     "importData": true,
 * //     "useApi": true,
 * //     "customBranding": true,
 * //     "prioritySupport": true
 * //   },
 * //   "summary": {
 * //     "total": 8,
 * //     "enabled": 8,
 * //     "disabled": 0,
 * //     "percentage": 100
 * //   }
 * // }
 * 
 * // Download as file
 * const blob = new Blob([json], { type: 'application/json' });
 * const url = URL.createObjectURL(blob);
 * const link = document.createElement('a');
 * link.href = url;
 * link.download = `permissions-${roleId}.json`;
 * link.click();
 * ```
 */
export const exportPermissionsToJSON = (roleId: string): string => {
  const permissions = getPermissionsForRole(roleId);
  const role = getRoleById(roleId);
  
  return JSON.stringify(
    {
      roleId,
      roleName: role?.name,
      permissions,
      summary: getPermissionSummary(permissions),
    },
    null,
    2
  );
};

/**
 * Export all roles permissions to JSON
 * 
 * Exports complete permission data for all roles as formatted JSON string.
 * Includes role metadata, colors, permissions, and summaries.
 * 
 * @returns Formatted JSON string
 * 
 * @example
 * ```tsx
 * const json = exportAllRolesPermissionsToJSON();
 * console.log(json);
 * // [
 * //   {
 * //     "roleId": "developer",
 * //     "roleName": "Developer",
 * //     "color": "from-violet-400 to-violet-500",
 * //     "permissions": {
 * //       "createProjects": true,
 * //       "deleteProjects": true,
 * //       ...
 * //     },
 * //     "summary": {
 * //       "total": 8,
 * //       "enabled": 8,
 * //       "disabled": 0,
 * //       "percentage": 100
 * //     }
 * //   },
 * //   {
 * //     "roleId": "data-analyst",
 * //     "roleName": "Data Analyst",
 * //     "color": "from-blue-400 to-blue-500",
 * //     ...
 * //   },
 * //   ...
 * // ]
 * 
 * // Download as file
 * const blob = new Blob([json], { type: 'application/json' });
 * const url = URL.createObjectURL(blob);
 * const link = document.createElement('a');
 * link.href = url;
 * link.download = 'all-roles-permissions.json';
 * link.click();
 * 
 * // Or parse and analyze
 * const data = JSON.parse(json);
 * data.forEach(role => {
 *   console.log(`${role.roleName}: ${role.summary.enabled}/${role.summary.total} permissions`);
 * });
 * ```
 */
export const exportAllRolesPermissionsToJSON = (): string => {
  const allPermissions = userRoles.map((role) => ({
    roleId: role.id,
    roleName: role.name,
    color: role.color,
    permissions: getPermissionsForRole(role.id),
    summary: getPermissionSummary(getPermissionsForRole(role.id)),
  }));

  return JSON.stringify(allPermissions, null, 2);
};
