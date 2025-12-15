/**
 * Permission Operations Functions
 * 
 * Functions for comparing, merging, and intersecting permissions.
 * 
 * @module utils/permissionOps
 */

import type { UserPermissions } from '../types';
import { getPermissionsForRole } from './roles';

/**
 * Compare permissions between two roles
 * 
 * Analyzes differences and similarities between two role permission sets.
 * 
 * @param roleId1 - First role identifier
 * @param roleId2 - Second role identifier
 * @returns Comparison object with same, different, and unique permissions
 * 
 * @example
 * ```tsx
 * const comparison = compareRolePermissions('developer', 'data-analyst');
 * // {
 * //   same: ['createProjects', 'shareProjects'],
 * //   different: ['deleteProjects', 'useApi'],
 * //   onlyInFirst: ['useApi'],
 * //   onlyInSecond: ['exportData']
 * // }
 * ```
 */
export const compareRolePermissions = (
  roleId1: string,
  roleId2: string
): {
  same: Array<keyof UserPermissions>;
  different: Array<keyof UserPermissions>;
  onlyInFirst: Array<keyof UserPermissions>;
  onlyInSecond: Array<keyof UserPermissions>;
} => {
  const perms1 = getPermissionsForRole(roleId1);
  const perms2 = getPermissionsForRole(roleId2);

  const same: Array<keyof UserPermissions> = [];
  const different: Array<keyof UserPermissions> = [];
  const onlyInFirst: Array<keyof UserPermissions> = [];
  const onlyInSecond: Array<keyof UserPermissions> = [];

  const allKeys = new Set([
    ...Object.keys(perms1),
    ...Object.keys(perms2),
  ]) as Set<keyof UserPermissions>;

  allKeys.forEach((key) => {
    const val1 = perms1[key];
    const val2 = perms2[key];

    if (val1 === val2) {
      same.push(key);
    } else {
      different.push(key);
      if (val1 && !val2) onlyInFirst.push(key);
      if (!val1 && val2) onlyInSecond.push(key);
    }
  });

  return { same, different, onlyInFirst, onlyInSecond };
};

/**
 * Check if two permissions are equal
 * 
 * Compares two permission objects for exact equality.
 * 
 * @param perms1 - First permission set
 * @param perms2 - Second permission set
 * @returns True if all permissions match
 * 
 * @example
 * ```tsx
 * const perms1 = { createProjects: true, deleteProjects: false };
 * const perms2 = { createProjects: true, deleteProjects: false };
 * const perms3 = { createProjects: true, deleteProjects: true };
 * 
 * arePermissionsEqual(perms1, perms2);  // true
 * arePermissionsEqual(perms1, perms3);  // false
 * ```
 */
export const arePermissionsEqual = (
  perms1: UserPermissions,
  perms2: UserPermissions
): boolean => {
  const keys1 = Object.keys(perms1) as Array<keyof UserPermissions>;
  const keys2 = Object.keys(perms2) as Array<keyof UserPermissions>;

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => perms1[key] === perms2[key]);
};

/**
 * Merge permissions (OR operation)
 * 
 * Combines two permission sets using logical OR.
 * A permission is enabled if it's enabled in either set.
 * 
 * @param perms1 - First permission set
 * @param perms2 - Second permission set
 * @returns Merged permissions
 * 
 * @example
 * ```tsx
 * const perms1 = { createProjects: true, deleteProjects: false, shareProjects: false };
 * const perms2 = { createProjects: false, deleteProjects: true, shareProjects: false };
 * 
 * mergePermissions(perms1, perms2);
 * // { createProjects: true, deleteProjects: true, shareProjects: false }
 * ```
 */
export const mergePermissions = (
  perms1: UserPermissions,
  perms2: UserPermissions
): UserPermissions => {
  const merged = { ...perms1 };
  Object.keys(perms2).forEach((key) => {
    const permKey = key as keyof UserPermissions;
    merged[permKey] = merged[permKey] || perms2[permKey];
  });
  return merged;
};

/**
 * Intersect permissions (AND operation)
 * 
 * Combines two permission sets using logical AND.
 * A permission is enabled only if it's enabled in both sets.
 * 
 * @param perms1 - First permission set
 * @param perms2 - Second permission set
 * @returns Intersected permissions
 * 
 * @example
 * ```tsx
 * const perms1 = { createProjects: true, deleteProjects: true, shareProjects: false };
 * const perms2 = { createProjects: true, deleteProjects: false, shareProjects: false };
 * 
 * intersectPermissions(perms1, perms2);
 * // { createProjects: true, deleteProjects: false, shareProjects: false }
 * ```
 */
export const intersectPermissions = (
  perms1: UserPermissions,
  perms2: UserPermissions
): UserPermissions => {
  const intersected = { ...perms1 };
  Object.keys(perms1).forEach((key) => {
    const permKey = key as keyof UserPermissions;
    intersected[permKey] = perms1[permKey] && perms2[permKey];
  });
  return intersected;
};
