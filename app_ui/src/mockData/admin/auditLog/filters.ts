/**
 * Filter options for audit log
 */

// Users for filtering
export const users = ['admin', 'developer', 'analyst', 'app_user', 'backup_service'];

// Categories for filtering
export const categories: string[] = [
  'База даних',
  'Таблиця',
  'Запит',
  'Права доступу',
  'Резервна копія',
  'Функція',
  'Тригер',
  'Користувач',
  'Автентифікація',
];

// Actions for filtering
export const actions: string[] = [
  'create',
  'update',
  'delete',
  'select',
  'grant',
  'revoke',
  'login',
  'backup',
];
