/**
 * Permission categories configuration for admin and user types
 */

import { Database, UserCog, Shield, Eye, Users, Activity } from 'lucide-react';
import type { PermissionCategory } from '../types';

/**
 * Permission categories for admin users
 */
export const adminPermissionCategories: PermissionCategory[] = [
  {
    id: 'databases',
    label: 'Управління базами даних',
    icon: Database,
    permissions: [
      { id: 'db-view', label: 'Переглядати бази даних' },
      { id: 'db-create', label: 'Створювати бази даних' },
      { id: 'db-edit', label: 'Редагувати налаштування БД' },
      { id: 'db-delete', label: 'Видаляти бази даних' },
      { id: 'schema-view', label: 'Переглядати схеми' },
      { id: 'schema-manage', label: 'Управляти схемами' },
    ]
  },
  {
    id: 'tables',
    label: 'Управління таблицями',
    icon: Database,
    permissions: [
      { id: 'table-view', label: 'Переглядати таблиці' },
      { id: 'table-create', label: 'Створювати таблиці' },
      { id: 'table-edit', label: 'Редагувати структуру' },
      { id: 'table-delete', label: 'Видаляти таблиці' },
      { id: 'data-view', label: 'Переглядати дані' },
      { id: 'data-edit', label: 'Редагувати дані' },
    ]
  },
  {
    id: 'query',
    label: 'SQL запити',
    icon: Activity,
    permissions: [
      { id: 'query-select', label: 'Виконувати SELECT запити' },
      { id: 'query-insert', label: 'Виконувати INSERT запити' },
      { id: 'query-update', label: 'Виконувати UPDATE запити' },
      { id: 'query-delete', label: 'Виконувати DELETE запити' },
      { id: 'query-ddl', label: 'Виконувати DDL команди (CREATE, ALTER, DROP)' },
      { id: 'query-history', label: 'Переглядати історію запитів' },
    ]
  },
  {
    id: 'users',
    label: 'Управління користувачами',
    icon: UserCog,
    permissions: [
      { id: 'users-view', label: 'Переглядати користувачів' },
      { id: 'users-edit', label: 'Редагувати користувачів' },
      { id: 'users-roles', label: 'Призначати ролі' },
      { id: 'users-permissions', label: 'Налаштовувати права доступу' },
    ]
  },
  {
    id: 'system',
    label: 'Системні функції',
    icon: Shield,
    permissions: [
      { id: 'system-monitor', label: 'Моніторинг системи' },
      { id: 'system-config', label: 'Конфігурація PostgreSQL' },
      { id: 'system-backup', label: 'Резервне копіювання' },
      { id: 'system-restore', label: 'Відновлення БД' },
      { id: 'system-logs', label: 'Перегляд логів' },
      { id: 'system-clusters', label: 'Управління кластерами' },
    ]
  },
];

/**
 * Permission categories for regular users
 */
export const userPermissionCategories: PermissionCategory[] = [
  {
    id: 'content',
    label: 'Контент',
    icon: Eye,
    permissions: [
      { id: 'content-view', label: 'Переглядати контент' },
      { id: 'content-create', label: 'Створювати контент' },
      { id: 'content-edit', label: 'Редагувати контент' },
      { id: 'content-delete', label: 'Видаляти контент' },
    ]
  },
  {
    id: 'profile',
    label: 'Профіль',
    icon: Users,
    permissions: [
      { id: 'profile-view', label: 'Переглядати профіль' },
      { id: 'profile-edit', label: 'Редагувати профіль' },
      { id: 'profile-export', label: 'Експорт даних' },
    ]
  },
  {
    id: 'features',
    label: 'Функції застосунку',
    icon: Activity,
    permissions: [
      { id: 'feature-basic', label: 'Базові функції' },
      { id: 'feature-advanced', label: 'Розширені функції' },
      { id: 'feature-analytics', label: 'Аналітика' },
      { id: 'feature-export', label: 'Експорт даних' },
    ]
  },
];

/**
 * Get permission categories based on user type
 */
export const getPermissionCategoriesByUserType = (userType: 'admin' | 'user'): PermissionCategory[] => {
  return userType === 'admin' ? adminPermissionCategories : userPermissionCategories;
};
