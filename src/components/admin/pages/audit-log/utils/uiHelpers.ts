/**
 * UI helper functions for Audit Log
 */

import { 
  Database, 
  Table as TableIcon, 
  FileCode, 
  Shield, 
  Copy, 
  Activity, 
  User 
} from 'lucide-react';
import type { 
  ActionBadgeConfig,
  ActionType,
} from '../types';

/**
 * Get icon component for audit category
 */
export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'База даних':
      return Database;
    case 'Таблиця':
      return TableIcon;
    case 'Запит':
      return FileCode;
    case 'Права доступу':
      return Shield;
    case 'Резервна копія':
      return Copy;
    case 'Функція':
      return Activity;
    case 'Тригер':
      return Activity;
    case 'Користувач':
      return User;
    case 'Автентифікація':
      return Shield;
    default:
      return Activity;
  }
};

/**
 * Get badge configuration for action type
 */
export const getActionBadge = (action: ActionType): ActionBadgeConfig => {
  const badges: Record<ActionType, ActionBadgeConfig> = {
    create: { 
      variant: 'default', 
      label: 'Створення', 
      color: 'from-green-500 to-lime-600' 
    },
    update: { 
      variant: 'secondary', 
      label: 'Оновлення', 
      color: 'from-yellow-500 to-lime-600' 
    },
    delete: { 
      variant: 'destructive', 
      label: 'Видалення', 
      color: 'from-red-500 to-red-600' 
    },
    select: { 
      variant: 'outline', 
      label: 'Вибірка', 
      color: 'from-slate-500 to-slate-600' 
    },
    grant: { 
      variant: 'default', 
      label: 'Надання прав', 
      color: 'from-lime-500 to-green-600' 
    },
    revoke: { 
      variant: 'destructive', 
      label: 'Відкликання', 
      color: 'from-orange-500 to-red-600' 
    },
    login: { 
      variant: 'outline', 
      label: 'Вхід', 
      color: 'from-blue-500 to-blue-600' 
    },
    backup: { 
      variant: 'secondary', 
      label: 'Резервування', 
      color: 'from-lime-600 to-yellow-600' 
    },
  };
  return badges[action];
};

/**
 * Get action color
 */
export const getActionColor = (action: ActionType): string => {
  return getActionBadge(action).color;
};

/**
 * Get status badge class
 */
export const getStatusBadgeClass = (status: 'success' | 'failed'): string => {
  return status === 'success'
    ? 'bg-green-50 text-green-700 border-green-300'
    : 'bg-red-50 text-red-700 border-red-300';
};

/**
 * Get table row class based on status
 */
export const getTableRowClass = (status: 'success' | 'failed'): string => {
  return status === 'failed' ? 'bg-red-50/50' : '';
};

/**
 * Get action label
 */
export const getActionLabel = (action: ActionType): string => {
  return getActionBadge(action).label;
};
