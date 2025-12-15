/**
 * UI menu items and display settings configuration
 */

import {
  Eye,
  Users,
  UserCog,
  Code2,
  Database,
  Key,
  Activity,
  Table2,
} from 'lucide-react';
import type { UiMenuItem, DisplaySettingItem } from '../types';

// UI menu items for admin panel
export const uiMenuItems: UiMenuItem[] = [
  {
    id: 'dashboard',
    label: 'Панель управління',
    icon: Eye,
    description: 'Головний дашборд з метриками',
  },
  {
    id: 'databases',
    label: 'Бази даних',
    icon: Eye,
    description: 'Управління БД, схемами та таблицями',
  },
  {
    id: 'users',
    label: 'Користувачі',
    icon: Users,
    description: 'Керування користувачами системи',
  },
  {
    id: 'roles',
    label: 'Ролі',
    icon: UserCog,
    description: 'Управління ролями та правами доступу',
  },
  {
    id: 'query',
    label: 'SQL редактор',
    icon: Eye,
    description: 'Виконання SQL запитів',
  },
  {
    id: 'performance',
    label: 'Продуктивність',
    icon: Eye,
    description: 'Аналіз продуктивності БД',
  },
  {
    id: 'clusters',
    label: 'Кластери',
    icon: Eye,
    description: 'Управління реплікацією та кластерами',
  },
  {
    id: 'backups',
    label: 'Резервні копії',
    icon: Eye,
    description: 'Бекапи та відновлення',
  },
  {
    id: 'logs',
    label: 'Логи',
    icon: Eye,
    description: 'Системні логи та історія дій',
  },
  {
    id: 'config',
    label: 'Конфігурація',
    icon: Eye,
    description: 'Параметри PostgreSQL',
  },
];

// Display settings items
export const displaySettingItems: DisplaySettingItem[] = [
  {
    id: 'restApi',
    label: 'REST API рядки',
    description: 'Показувати API endpoints та curl команди',
    icon: Code2,
    adminOnly: true,
  },
  {
    id: 'technicalIds',
    label: 'Технічні ID',
    description: 'OID, XID та інші системні ідентифікатори',
    icon: Database,
    adminOnly: true,
  },
  {
    id: 'debugInfo',
    label: 'Debug інформація',
    description: 'Детальні логи та діагностика',
    icon: Activity,
    adminOnly: true,
  },
  {
    id: 'queryPlans',
    label: 'Плани запитів (EXPLAIN)',
    description: 'Візуалізація та аналіз планів виконання',
    icon: Activity,
    adminOnly: true,
  },
  {
    id: 'rawSql',
    label: 'Raw SQL запити',
    description: 'Показувати згенеровані SQL запити',
    icon: Code2,
    adminOnly: true,
  },
  {
    id: 'systemSchemas',
    label: 'Системні схеми',
    description: 'pg_catalog, information_schema та інші',
    icon: Database,
    adminOnly: true,
  },
  {
    id: 'connectionStrings',
    label: 'Connection strings',
    description: 'Рядки підключення до БД',
    icon: Key,
    adminOnly: false,
  },
  {
    id: 'internalTables',
    label: 'Тимчасові таблиці',
    description: 'Службові та тимчасові таблиці',
    icon: Table2,
    adminOnly: false,
  },
];
