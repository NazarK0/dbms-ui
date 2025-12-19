/**
 * Role Utility Functions
 * 
 * Functions for retrieving role information and attributes.
 * 
 * @module utils/roles
 */

import type { UserRole, UserPermissions } from '../types';
import { rolePermissions, userRoles as staticUserRoles } from '../data';
import { userRoles as systemUserRoles } from '../../../../../mockData/admin/roles';
import type { Role } from '../../../../../mockData/admin/roles';

/**
 * Convert system role name to ID format
 * 
 * @param roleName - Role name from system
 * @returns Normalized role ID
 */
export const getRoleIdFromName = (roleName: string): string => {
  return roleName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

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

/**
 * Get role by ID (from system roles)
 * 
 * Finds and returns a role object by its ID.
 * 
 * @param roleId - Role identifier
 * @returns Role object or undefined if not found
 * 
 * @example
 * ```tsx
 * const role = getRoleById('data-analyst');
 * // { name: 'Data Analyst', color: '...', ... }
 * ```
 */
export const getRoleById = (roleId: string): Role | undefined => {
  return systemUserRoles.find((role: Role) => getRoleIdFromName(role.name) === roleId);
};

/**
 * Get role name by ID
 * 
 * Returns the display name for a role.
 * Falls back to "Unknown Role" if not found.
 * 
 * @param roleId - Role identifier
 * @returns Role display name
 * 
 * @example
 * ```tsx
 * getRoleName('data-analyst');  // "Data Analyst"
 * getRoleName('invalid');       // "Unknown Role"
 * ```
 */
export const getRoleName = (roleId: string): string => {
  const role = getRoleById(roleId);
  return role?.name || 'Unknown Role';
};

/**
 * Get role color by ID
 * 
 * Returns the Tailwind gradient class for role badge.
 * Falls back to slate gradient if not found.
 * 
 * @param roleId - Role identifier
 * @returns Tailwind gradient class string
 * 
 * @example
 * ```tsx
 * getRoleColor('data-analyst');  // "from-violet-500 to-purple-600"
 * getRoleColor('invalid');       // "from-slate-400 to-slate-500"
 * ```
 */
export const getRoleColor = (roleId: string): string => {
  const role = getRoleById(roleId);
  return role?.color || 'from-slate-400 to-slate-500';
};

/**
 * Get all available roles (from system)
 * 
 * Returns the complete list of all user roles in the system.
 * 
 * @returns Array of all user roles
 * 
 * @example
 * ```tsx
 * const allRoles = getAllRoles();
 * // [
 * //   { name: 'Data Analyst', color: '...', ... },
 * //   { name: 'Content Manager', color: '...', ... },
 * //   ...
 * // ]
 * ```
 */
export const getAllRoles = (): Role[] => {
  return systemUserRoles;
};