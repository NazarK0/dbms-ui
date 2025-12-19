/**
 * Statistics & Matrix Utility Functions
 * 
 * Functions for generating permission matrices and cross-role statistics.
 * 
 * @module utils/statistics
 */

import type { UserPermissions } from '../types';
import { userRoles } from '../data';
import { getPermissionsForRole } from './roles';
import { getPermissionSummary } from './permissions';
import { countRolesWithPermission } from './roleQueries';

/**
 * Generate permission matrix (all roles vs all permissions)
 * 
 * Creates a matrix showing which permissions are enabled for each role.
 * Keys are role names, values are permission objects.
 * 
 * @returns Permission matrix object
 * 
 * @example
 * ```tsx
 * const matrix = generatePermissionMatrix();
 * // {
 * //   'Developer': {
 * //     createProjects: true,
 * //     deleteProjects: true,
 * //     shareProjects: true,
 * //     exportData: true,
 * //     importData: true,
 * //     useApi: true,
 * //     customBranding: true,
 * //     prioritySupport: true
 * //   },
 * //   'Data Analyst': {
 * //     createProjects: true,
 * //     deleteProjects: false,
 * //     shareProjects: true,
 * //     ...
 * //   },
 * //   ...
 * // }
 * 
 * // Usage example: Check if Developer can delete projects
 * const canDelete = matrix['Developer'].deleteProjects;  // true
 * ```
 */
export const generatePermissionMatrix = (): Record<
  string,
  Record<keyof UserPermissions, boolean>
> => {
  const matrix: Record<string, Record<keyof UserPermissions, boolean>> = {};

  userRoles.forEach((role) => {
    matrix[role.name] = getPermissionsForRole(role.id);
  });

  return matrix;
};

/**
 * Get permission statistics across all roles
 * 
 * Analyzes each permission across all roles to show:
 * - How many roles have it enabled
 * - How many roles have it disabled
 * - Percentage of roles with it enabled
 * 
 * @returns Statistics object for each permission
 * 
 * @example
 * ```tsx
 * const stats = getPermissionStatistics();
 * // {
 * //   createProjects: {
 * //     enabled: 4,      // 4 roles can create projects
 * //     disabled: 1,     // 1 role cannot
 * //     percentage: 80   // 80% of roles have this
 * //   },
 * //   deleteProjects: {
 * //     enabled: 2,
 * //     disabled: 3,
 * //     percentage: 40
 * //   },
 * //   useApi: {
 * //     enabled: 1,
 * //     disabled: 4,
 * //     percentage: 20
 * //   },
 * //   ...
 * // }
 * 
 * // Usage: Find which permissions are most common
 * Object.entries(stats)
 *   .sort((a, b) => b[1].percentage - a[1].percentage)
 *   .forEach(([perm, stat]) => {
 *     console.log(`${perm}: ${stat.percentage}% of roles`);
 *   });
 * // "createProjects: 80% of roles"
 * // "shareProjects: 80% of roles"
 * // "exportData: 60% of roles"
 * // ...
 * ```
 */
export const getPermissionStatistics = () => {
  const stats: Record<
    keyof UserPermissions,
    { enabled: number; disabled: number; percentage: number }
  > = {} as any;

  const permissionKeys = Object.keys(
    getPermissionsForRole(userRoles[0].id)
  ) as Array<keyof UserPermissions>;

  permissionKeys.forEach((key) => {
    const rolesWithPerm = countRolesWithPermission(key);
    const totalRoles = userRoles.length;

    stats[key] = {
      enabled: rolesWithPerm,
      disabled: totalRoles - rolesWithPerm,
      percentage: Math.round((rolesWithPerm / totalRoles) * 100),
    };
  });

  return stats;
};
