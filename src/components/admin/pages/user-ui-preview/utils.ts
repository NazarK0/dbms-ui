/**
 * Utility functions for UserUIPreview components
 */

import type {
  UserRole,
  UserPermissions,
  DeviceType,
  DeviceSize,
  RolePermissions,
} from './types';
import { rolePermissions, userRoles } from './data';

/**
 * Get permissions for a specific role
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
 */
export const getRoleById = (roleId: string): UserRole | undefined => {
  return userRoles.find((role) => role.id === roleId);
};

/**
 * Get role name by ID
 */
export const getRoleName = (roleId: string): string => {
  const role = getRoleById(roleId);
  return role?.name || 'Unknown Role';
};

/**
 * Get role color by ID
 */
export const getRoleColor = (roleId: string): string => {
  const role = getRoleById(roleId);
  return role?.color || 'from-slate-400 to-slate-500';
};

/**
 * Count enabled permissions
 */
export const countEnabledPermissions = (
  permissions: UserPermissions
): number => {
  return Object.values(permissions).filter((value) => value === true).length;
};

/**
 * Count disabled permissions
 */
export const countDisabledPermissions = (
  permissions: UserPermissions
): number => {
  return Object.values(permissions).filter((value) => value === false).length;
};

/**
 * Get permission percentage
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
 * Compare permissions between two roles
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
 * Get device size configuration
 */
export const getDeviceSize = (deviceType: DeviceType): DeviceSize => {
  const sizes: Record<DeviceType, DeviceSize> = {
    desktop: { width: '100%', height: '600px' },
    tablet: { width: '768px', height: '600px' },
    mobile: { width: '375px', height: '667px' },
  };
  return sizes[deviceType];
};

/**
 * Get device display name
 */
export const getDeviceDisplayName = (deviceType: DeviceType): string => {
  const names: Record<DeviceType, string> = {
    desktop: 'Комп\'ютер',
    tablet: 'Планшет',
    mobile: 'Телефон',
  };
  return names[deviceType];
};

/**
 * Check if device should show navigation
 */
export const shouldShowNavigation = (deviceType: DeviceType): boolean => {
  return deviceType === 'desktop';
};

/**
 * Get action grid columns for device
 */
export const getActionGridCols = (deviceType: DeviceType): number => {
  return deviceType === 'mobile' ? 2 : 3;
};

/**
 * Get enabled action button class
 */
export const getActionButtonClass = (enabled: boolean): string => {
  if (enabled) {
    return 'p-4 rounded-lg border-2 border-lime-200 bg-lime-50 hover:border-lime-300 text-center';
  }
  return 'p-4 rounded-lg border-2 border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed text-center';
};

/**
 * Get action icon class
 */
export const getActionIconClass = (enabled: boolean): string => {
  const baseClass = 'w-6 h-6 mx-auto mb-2';
  const colorClass = enabled ? 'text-lime-600' : 'text-slate-400';
  return `${baseClass} ${colorClass}`;
};

/**
 * Get permission badge variant
 */
export const getPermissionBadgeVariant = (
  enabled: boolean
): 'default' | 'outline' => {
  return enabled ? 'default' : 'outline';
};

/**
 * Get permission badge text
 */
export const getPermissionBadgeText = (enabled: boolean): string => {
  return enabled ? 'Дозволено' : 'Заборонено';
};

/**
 * Format permission label
 */
export const formatPermissionLabel = (key: string): string => {
  const labels: Record<string, string> = {
    createProjects: 'Створення проєктів',
    deleteProjects: 'Видалення проєктів',
    shareProjects: 'Спільний доступ',
    exportData: 'Експорт даних',
    importData: 'Імпорт даних',
    useApi: 'Використання API',
    customBranding: 'Свій брендинг',
    prioritySupport: 'Пріоритетна підтримка',
  };
  return labels[key] || key;
};

/**
 * Format action label
 */
export const formatActionLabel = (key: string): string => {
  const labels: Record<string, string> = {
    createProjects: 'Новий проєкт',
    deleteProjects: 'Видалити',
    shareProjects: 'Поділитись',
    exportData: 'Експорт',
    importData: 'Імпорт',
    useApi: 'API',
    customBranding: 'Брендинг',
    prioritySupport: 'Підтримка',
  };
  return labels[key] || key;
};

/**
 * Get all available roles
 */
export const getAllRoles = (): UserRole[] => {
  return userRoles;
};

/**
 * Get roles with specific permission enabled
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
 */
export const countRolesWithPermission = (
  permission: keyof UserPermissions
): number => {
  return getRolesWithPermission(permission).length;
};

/**
 * Get permission summary
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
 * Check if two permissions are equal
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

/**
 * Get role by permission count (most to least)
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
 */
export const getMostPermissiveRole = (): UserRole | undefined => {
  return getRolesByPermissionCount()[0];
};

/**
 * Get least permissive role
 */
export const getLeastPermissiveRole = (): UserRole | undefined => {
  const sorted = getRolesByPermissionCount();
  return sorted[sorted.length - 1];
};

/**
 * Export permissions to JSON
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

/**
 * Generate permission matrix (all roles vs all permissions)
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

/**
 * Validate device type
 */
export const isValidDeviceType = (device: string): device is DeviceType => {
  return ['desktop', 'tablet', 'mobile'].includes(device);
};

/**
 * Validate role ID
 */
export const isValidRoleId = (roleId: string): boolean => {
  return userRoles.some((role) => role.id === roleId);
};

/**
 * Get default permissions
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
