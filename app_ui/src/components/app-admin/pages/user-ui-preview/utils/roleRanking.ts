/**
 * Role Ranking Utility Functions
 * 
 * Functions for ranking and comparing roles by permission count.
 * 
 * @module utils/roleRanking
 */

import type { UserRole } from '../types';
import { userRoles } from '../data';
import { countEnabledPermissions } from './permissions';
import { getPermissionsForRole } from './roles';

/**
 * Get role by permission count (most to least)
 * 
 * Returns all roles sorted by number of enabled permissions (descending).
 * Most permissive roles appear first.
 * 
 * @returns Array of roles sorted by permission count
 * 
 * @example
 * ```tsx
 * const ranked = getRolesByPermissionCount();
 * // [
 * //   { id: 'developer', name: 'Developer', ... },      // 8 permissions
 * //   { id: 'data-analyst', name: 'Data Analyst', ... }, // 6 permissions
 * //   { id: 'content-manager', name: 'Content Manager', ... }, // 4 permissions
 * //   { id: 'viewer', name: 'Viewer', ... }              // 2 permissions
 * // ]
 * ```
 */
export const getRolesByPermissionCount = (): UserRole[] => {
  return [...userRoles].sort((a, b) => {
    const countA = countEnabledPermissions(getPermissionsForRole(a.id));
    const countB = countEnabledPermissions(getPermissionsForRole(b.id));
    return countB - countA;
  });
};

/**
 * Get most permissive role
 * 
 * Returns the role with the highest number of enabled permissions.
 * 
 * @returns Role with most permissions, or undefined if no roles exist
 * 
 * @example
 * ```tsx
 * const topRole = getMostPermissiveRole();
 * // { id: 'developer', name: 'Developer', ... }
 * 
 * const perms = getPermissionsForRole(topRole.id);
 * console.log(`${topRole.name} has ${countEnabledPermissions(perms)} permissions`);
 * // "Developer has 8 permissions"
 * ```
 */
export const getMostPermissiveRole = (): UserRole | undefined => {
  return getRolesByPermissionCount()[0];
};

/**
 * Get least permissive role
 * 
 * Returns the role with the lowest number of enabled permissions.
 * 
 * @returns Role with fewest permissions, or undefined if no roles exist
 * 
 * @example
 * ```tsx
 * const minRole = getLeastPermissiveRole();
 * // { id: 'viewer', name: 'Viewer', ... }
 * 
 * const perms = getPermissionsForRole(minRole.id);
 * console.log(`${minRole.name} has ${countEnabledPermissions(perms)} permissions`);
 * // "Viewer has 2 permissions"
 * ```
 */
export const getLeastPermissiveRole = (): UserRole | undefined => {
  const sorted = getRolesByPermissionCount();
  return sorted[sorted.length - 1];
};
