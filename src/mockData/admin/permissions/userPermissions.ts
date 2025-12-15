/**
 * User Permission Categories
 * 
 * Permission categories for user interface with icons
 */

import { Database, HardDrive, Code, Shield, Users, Activity } from 'lucide-react';
import type { PermissionCategory } from './types';

export const userPermissions: PermissionCategory[] = [
  {
    category: 'Проєкти',
    icon: Database,
    permissions: [
      { id: 'project_create', name: 'Створити' },
      { id: 'project_delete', name: 'Видалити' },
      { id: 'project_share', name: 'Поділитись' },
      { id: 'project_export', name: 'Експорт' },
    ]
  },
  {
    category: 'Дані',
    icon: HardDrive,
    permissions: [
      { id: 'data_import', name: 'Імпорт' },
      { id: 'data_export', name: 'Експорт' },
      { id: 'data_backup', name: 'Бекапи' },
    ]
  },
  {
    category: 'API',
    icon: Code,
    permissions: [
      { id: 'api_access', name: 'Доступ' },
      { id: 'api_keys', name: 'Ключі' },
      { id: 'webhooks', name: 'Webhooks' },
    ]
  },
  {
    category: 'Налаштування',
    icon: Shield,
    permissions: [
      { id: 'custom_branding', name: 'Брендинг' },
      { id: 'custom_domain', name: 'Домен' },
      { id: 'sso', name: 'SSO' },
    ]
  },
  {
    category: 'Підтримка',
    icon: Users,
    permissions: [
      { id: 'support_email', name: 'Email' },
      { id: 'support_priority', name: 'Пріоритет' },
      { id: 'support_phone', name: 'Телефон' },
    ]
  },
  {
    category: 'Обмеження',
    icon: Activity,
    permissions: [
      { id: 'storage_limit', name: 'Сховище' },
      { id: 'users_limit', name: 'Користувачі' },
      { id: 'requests_limit', name: 'Запити' },
    ]
  },
];
