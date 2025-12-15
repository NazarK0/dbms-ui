/**
 * Role Utility Functions
 * 
 * Functions for retrieving role information and attributes.
 * 
 * @module utils/roles
 */

import type { UserRole, UserPermissions } from '../types';
import { rolePermissions, userRoles } from '../data';

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
 * Get role by ID
 * 
 * Finds and returns a role object by its ID.
 * 
 * @param roleId - Role identifier
 * @returns Role object or undefined if not found
 * 
 * @example
 * ```tsx
 * const role = getRoleById('developer');
 * // { id: 'developer', name: 'Developer', color: '...' }
 * ```
 */
export const getRoleById = (roleId: string): UserRole | undefined => {
  return userRoles.find((role) => role.id === roleId);
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
 * getRoleName('developer');  // "Developer"
 * getRoleName('invalid');    // "Unknown Role"
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
 * getRoleColor('developer');  // "from-violet-400 to-violet-500"
 * getRoleColor('invalid');    // "from-slate-400 to-slate-500"
 * ```
 */
export const getRoleColor = (roleId: string): string => {
  const role = getRoleById(roleId);
  return role?.color || 'from-slate-400 to-slate-500';
};

/**
 * Get all available roles
 * 
 * Returns the complete list of all roles in the system.
 * 
 * @returns Array of all user roles
 * 
 * @example
 * ```tsx
 * const allRoles = getAllRoles();
 * // [
 * //   { id: 'developer', name: 'Developer', ... },
 * //   { id: 'data-analyst', name: 'Data Analyst', ... },
 * //   ...
 * // ]
 * ```
 */
export const getAllRoles = (): UserRole[] => {
  return userRoles;
};
