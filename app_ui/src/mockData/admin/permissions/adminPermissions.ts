/**
 * Admin Permission Categories
 * 
 * Permission categories for admin interface with icons
 */

import { Database, Table2, Code, UserX, Plug, HardDrive, Activity } from 'lucide-react';
import type { PermissionCategory } from './types';

export const adminPermissions: PermissionCategory[] = [
  {
    category: 'Управління БД',
    icon: Database,
    permissions: [
      { id: 'db_create', name: 'Створення БД' },
      { id: 'db_delete', name: 'Видалення БД' },
      { id: 'db_modify', name: 'Модифікація БД' },
      { id: 'db_view', name: 'Перегляд БД' },
    ]
  },
  {
    category: 'Таблиці',
    icon: Table2,
    permissions: [
      { id: 'table_create', name: 'Створення' },
      { id: 'table_delete', name: 'Видалення' },
      { id: 'table_alter', name: 'Зміна структури' },
      { id: 'table_view', name: 'Перегляд схеми' },
    ]
  },
  {
    category: 'SQL',
    icon: Code,
    permissions: [
      { id: 'sql_select', name: 'SELECT' },
      { id: 'sql_insert', name: 'INSERT' },
      { id: 'sql_update', name: 'UPDATE' },
      { id: 'sql_delete', name: 'DELETE' },
    ]
  },
  {
    category: 'Користувачі',
    icon: UserX,
    permissions: [
      { id: 'user_create', name: 'Створення' },
      { id: 'user_delete', name: 'Видалення' },
      { id: 'user_modify', name: 'Зміна' },
      { id: 'user_view', name: 'Перегляд' },
    ]
  },
  {
    category: 'Розширення',
    icon: Plug,
    permissions: [
      { id: 'ext_install', name: 'Встановлення' },
      { id: 'func_create', name: 'Функції' },
      { id: 'trigger_create', name: 'Тригери' },
    ]
  },
  {
    category: 'Резервні копії',
    icon: HardDrive,
    permissions: [
      { id: 'backup_create', name: 'Створення' },
      { id: 'backup_restore', name: 'Відновлення' },
      { id: 'backup_view', name: 'Перегляд' },
    ]
  },
  {
    category: 'Моніторинг',
    icon: Activity,
    permissions: [
      { id: 'monitor_view', name: 'Метрики' },
      { id: 'logs_view', name: 'Логи' },
      { id: 'performance_view', name: 'Продуктивність' },
    ]
  },
];
