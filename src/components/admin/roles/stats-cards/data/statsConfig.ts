/**
 * Configuration for statistics cards
 * Defines icons, colors, and text for each stat type
 */

import type { StatConfig } from '../types';

export const statsConfig: StatConfig[] = [
  {
    id: 'roles',
    icon: 'Shield',
    gradient: 'from-lime-500 to-green-600',
    title: 'Всього ролей',
    description: 'Активні ролі в системі',
  },
  {
    id: 'admins',
    icon: 'UserCog',
    gradient: 'from-lime-600 to-green-500',
    title: 'Адміністраторів',
    description: 'З адмін ролями',
  },
  {
    id: 'users',
    icon: 'Users',
    gradient: 'from-violet-500 to-purple-600',
    title: 'Користувачів',
    description: 'З користувацькими ролями',
  },
  {
    id: 'permissions',
    icon: 'Key',
    gradient: 'from-yellow-500 to-lime-600',
    title: 'Дозволів',
    description: 'Унікальних прав доступу',
    defaultValue: 47,
  },
];

// Map stat type to config
export const getStatConfig = (type: StatConfig['id']): StatConfig | undefined => {
  return statsConfig.find((stat) => stat.id === type);
};
