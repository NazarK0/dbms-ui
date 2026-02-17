/**
 * Role types and base roles configuration
 */

import { Users, UserCog } from 'lucide-react';
import type { RoleTypeData, AdminBaseRole, UserBaseRole } from '../types';

// Role type data
export const roleTypeData: Record<string, RoleTypeData> = {
  user: {
    type: 'user',
    label: 'Роль користувача',
    description:
      'Для кінцевих користувачів застосунку. Контролює доступ до функцій, квоти та можливості.',
    color: 'violet',
    borderColor: 'border-violet-500',
    bgColor: 'bg-violet-50',
    icon: Users,
    iconColor: 'text-violet-600',
  },
  admin: {
    type: 'admin',
    label: 'Роль адміністратора',
    description:
      'Для адміністраторів з доступом до панелі. Управління БД, SQL запити, системні налаштування.',
    color: 'lime',
    borderColor: 'border-lime-500',
    bgColor: 'bg-lime-50',
    icon: UserCog,
    iconColor: 'text-lime-600',
  },
};

// Base roles for users
export const userBaseRoles: UserBaseRole[] = [
  { id: 'data-analyst', name: 'Data Analyst', type: 'user' },
  { id: 'content-manager', name: 'Content Manager', type: 'user' },
  { id: 'report-viewer', name: 'Report Viewer', type: 'user' },
  { id: 'guest-user', name: 'Guest User', type: 'user' },
];

// Base roles for admins
export const adminBaseRoles: AdminBaseRole[] = [
  { id: 'developer', name: 'Developer', type: 'admin' },
  { id: 'analyst', name: 'Analyst', type: 'admin' },
  { id: 'viewer', name: 'Viewer', type: 'admin' },
];

// Default role type
export const defaultRoleType = 'user';
