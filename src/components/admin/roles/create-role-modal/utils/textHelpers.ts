import type { RoleType } from '../types';

/**
 * Get placeholder text for role name input
 */
export const getRoleNamePlaceholder = (roleType: RoleType) => {
  return roleType === 'user'
    ? 'Наприклад: Business User'
    : 'Наприклад: Backend Developer';
};

/**
 * Get RLS section description
 */
export const getRlsDescription = (roleType: RoleType) => {
  return roleType === 'admin'
    ? 'Налаштуйте політики безпеки на рівні рядків для таблиць'
    : 'Обмеження доступу користувачів до даних на рівні рядків';
};

/**
 * Get role type label
 */
export const getRoleTypeLabel = (roleType: RoleType): string => {
  return roleType === 'admin' ? 'Роль адміністратора' : 'Роль користувача';
};

/**
 * Format table name for display
 */
export const formatTableName = (tableName: string): string => {
  return tableName
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
