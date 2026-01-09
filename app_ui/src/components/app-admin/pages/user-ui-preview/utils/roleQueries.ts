/**
 * Role Query Utility Functions
 * 
 * Functions for querying and filtering roles based on permissions.
 * 
 * @module utils/roleQueries
 */

import type { UserRole, UserPermissions } from '../types';
import { userRoles } from '../data';
import { hasPermission } from './permissions';

/**
 * Get roles with specific permission enabled
 * 
 * Returns all roles that have a specific permission enabled.
 * 
 * @param permission - Permission key to filter by
 * @returns Array of roles with that permission
 * 
 * @example
 * ```tsx
 * const rolesWithDelete = getRolesWithPermission('deleteProjects');
 * // [
 * //   { id: 'developer', name: 'Developer', ... },
 * //   { id: 'admin', name: 'Admin', ... }
 * // ]
 * 
 * const rolesWithApi = getRolesWithPermission('useApi');
 * // [
 * //   { id: 'developer', name: 'Developer', ... }
 * // ]
 * ```
 */
export const getRolesWithPermission = (
  permission: keyof UserPermissions
): UserRole[] => {
  return userRoles.filter((role) =>
    hasPermission(role.id, permission)
  );
};

/**
 * Get roles count with permission
 * 
 * Returns the number of roles that have a specific permission enabled.
 * 
 * @param permission - Permission key to count
 * @returns Count of roles with that permission
 * 
 * @example
 * ```tsx
 * countRolesWithPermission('createProjects');  // 4
 * countRolesWithPermission('deleteProjects');  // 2
 * countRolesWithPermission('useApi');          // 1
 * ```
 */
export const countRolesWithPermission = (
  permission: keyof UserPermissions
): number => {
  return getRolesWithPermission(permission).length;
};
