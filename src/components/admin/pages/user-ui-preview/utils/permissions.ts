/**
 * Permission Utility Functions
 * 
 * Functions for checking, counting, and analyzing user permissions.
 * 
 * @module utils/permissions
 */

import type { UserPermissions } from '../types';
import { getPermissionsForRole } from './roles';

/**
 * Count enabled permissions
 * 
 * Counts the number of permissions that are set to true.
 * 
 * @param permissions - User permissions object
 * @returns Count of enabled permissions
 * 
 * @example
 * ```tsx
 * const perms = { createProjects: true, deleteProjects: true, shareProjects: false };
 * countEnabledPermissions(perms);  // 2
 * ```
 */
export const countEnabledPermissions = (
  permissions: UserPermissions
): number => {
  return Object.values(permissions).filter((value) => value === true).length;
};

/**
 * Count disabled permissions
 * 
 * Counts the number of permissions that are set to false.
 * 
 * @param permissions - User permissions object
 * @returns Count of disabled permissions
 * 
 * @example
 * ```tsx
 * const perms = { createProjects: true, deleteProjects: true, shareProjects: false };
 * countDisabledPermissions(perms);  // 1
 * ```
 */
export const countDisabledPermissions = (
  permissions: UserPermissions
): number => {
  return Object.values(permissions).filter((value) => value === false).length;
};

/**
 * Get permission percentage
 * 
 * Calculates the percentage of enabled permissions.
 * 
 * @param permissions - User permissions object
 * @returns Percentage of enabled permissions (0-100, rounded)
 * 
 * @example
 * ```tsx
 * const perms = { createProjects: true, deleteProjects: true, shareProjects: false, exportData: false };
 * getPermissionPercentage(perms);  // 50
 * ```
 */
export const getPermissionPercentage = (
  permissions: UserPermissions
): number => {
  const total = Object.keys(permissions).length;
  const enabled = countEnabledPermissions(permissions);
  return total > 0 ? Math.round((enabled / total) * 100) : 0;
};

/**
 * Check if role has specific permission
 * 
 * Checks whether a specific permission is enabled for a role.
 * 
 * @param roleId - Role identifier
 * @param permission - Permission key to check
 * @returns True if permission is enabled
 * 
 * @example
 * ```tsx
 * hasPermission('developer', 'createProjects');  // true
 * hasPermission('viewer', 'deleteProjects');     // false
 * ```
 */
export const hasPermission = (
  roleId: string,
  permission: keyof UserPermissions
): boolean => {
  const permissions = getPermissionsForRole(roleId);
  return permissions[permission] || false;
};

/**
 * Get all enabled permissions for a role
 * 
 * Returns an array of permission keys that are enabled.
 * 
 * @param roleId - Role identifier
 * @returns Array of enabled permission keys
 * 
 * @example
 * ```tsx
 * getEnabledPermissions('developer');
 * // ['createProjects', 'deleteProjects', 'shareProjects', ...]
 * ```
 */
export const getEnabledPermissions = (
  roleId: string
): Array<keyof UserPermissions> => {
  const permissions = getPermissionsForRole(roleId);
  return Object.entries(permissions)
    .filter(([_, value]) => value === true)
    .map(([key]) => key as keyof UserPermissions);
};

/**
 * Get all disabled permissions for a role
 * 
 * Returns an array of permission keys that are disabled.
 * 
 * @param roleId - Role identifier
 * @returns Array of disabled permission keys
 * 
 * @example
 * ```tsx
 * getDisabledPermissions('viewer');
 * // ['deleteProjects', 'exportData', 'useApi', ...]
 * ```
 */
export const getDisabledPermissions = (
  roleId: string
): Array<keyof UserPermissions> => {
  const permissions = getPermissionsForRole(roleId);
  return Object.entries(permissions)
    .filter(([_, value]) => value === false)
    .map(([key]) => key as keyof UserPermissions);
};

/**
 * Get permission summary
 * 
 * Returns a comprehensive summary of permission statistics.
 * 
 * @param permissions - User permissions object
 * @returns Summary object with totals and percentage
 * 
 * @example
 * ```tsx
 * const summary = getPermissionSummary(permissions);
 * // {
 * //   total: 8,
 * //   enabled: 6,
 * //   disabled: 2,
 * //   percentage: 75
 * // }
 * ```
 */
export const getPermissionSummary = (permissions: UserPermissions) => {
  const total = Object.keys(permissions).length;
  const enabled = countEnabledPermissions(permissions);
  const disabled = countDisabledPermissions(permissions);
  const percentage = getPermissionPercentage(permissions);

  return {
    total,
    enabled,
    disabled,
    percentage,
  };
};

/**
 * Get default permissions
 * 
 * Returns a permission object with all permissions set to false.
 * 
 * @returns Default permissions (all disabled)
 * 
 * @example
 * ```tsx
 * const defaultPerms = getDefaultPermissions();
 * // {
 * //   createProjects: false,
 * //   deleteProjects: false,
 * //   shareProjects: false,
 * //   ...
 * // }
 * ```
 */
export const getDefaultPermissions = (): UserPermissions => {
  return {
    createProjects: false,
    deleteProjects: false,
    shareProjects: false,
    exportData: false,
    importData: false,
    useApi: false,
    customBranding: false,
    prioritySupport: false,
  };
};
