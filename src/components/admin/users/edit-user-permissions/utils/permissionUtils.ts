/**
 * Utility functions for permission management
 */

import type { PermissionCategory, PermissionsState, CategoryProgress } from '../types';

/**
 * Calculate progress for a permission category
 * Returns the number of enabled permissions and total permissions
 */
export const getCategoryProgress = (
  categoryId: string,
  permissionCategories: PermissionCategory[],
  permissions: PermissionsState
): CategoryProgress => {
  const category = permissionCategories.find(c => c.id === categoryId);
  if (!category) return { enabled: 0, total: 0 };
  
  const enabled = category.permissions.filter(p => permissions[p.id]).length;
  const total = category.permissions.length;
  return { enabled, total };
};

/**
 * Initialize permissions state from categories
 * All permissions start as false/disabled
 */
export const initializePermissions = (
  permissionCategories: PermissionCategory[]
): PermissionsState => {
  const initialPermissions: PermissionsState = {};
  permissionCategories.forEach(category => {
    category.permissions.forEach(perm => {
      initialPermissions[perm.id] = false;
    });
  });
  return initialPermissions;
};

/**
 * Toggle all permissions in a category
 */
export const toggleCategoryPermissions = (
  categoryId: string,
  checked: boolean,
  permissionCategories: PermissionCategory[],
  currentPermissions: PermissionsState
): PermissionsState => {
  const category = permissionCategories.find(c => c.id === categoryId);
  if (!category) return currentPermissions;

  const newPermissions = { ...currentPermissions };
  category.permissions.forEach(perm => {
    newPermissions[perm.id] = checked;
  });
  return newPermissions;
};

/**
 * Toggle a single permission
 */
export const togglePermission = (
  permId: string,
  currentPermissions: PermissionsState
): PermissionsState => {
  return {
    ...currentPermissions,
    [permId]: !currentPermissions[permId]
  };
};

/**
 * Get progress text for a category
 */
export const getCategoryProgressText = (progress: CategoryProgress): string => {
  if (progress.enabled === 0) return 'Немає активних дозволів';
  if (progress.enabled === progress.total) return 'Всі дозволи активні';
  return `${progress.enabled} з ${progress.total} активні`;
};
