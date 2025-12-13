/**
 * Configuration data and constants for CreateRoleModal components
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
import type {
  UiSettings,
  UiDisplaySettings,
  RlsPolicies,
  UiMenuItem,
  DisplaySettingItem,
  RoleTypeData,
  AdminBaseRole,
  UserBaseRole,
} from './types';

// Default UI settings for admin panel
export const defaultUiSettings: UiSettings = {
  dashboard: true,
  databases: true,
  users: false,
  roles: false,
  query: true,
  performance: true,
  clusters: false,
  backups: true,
  logs: true,
  config: false,
};

// Default UI display settings
export const defaultUiDisplaySettings: UiDisplaySettings = {
  restApi: false,
  connectionStrings: false,
  technicalIds: false,
  debugInfo: false,
  queryPlans: false,
  rawSql: false,
  systemSchemas: false,
  internalTables: false,
};

// Default RLS policies
export const defaultRlsPolicies: RlsPolicies = {
  users: {
    enabled: false,
    select: true,
    insert: false,
    update: false,
    delete: false,
    using: 'user_id = current_user_id()',
    withCheck: 'user_id = current_user_id()',
  },
  orders: {
    enabled: false,
    select: true,
    insert: true,
    update: true,
    delete: false,
    using: 'company_id = current_user_company_id()',
    withCheck: 'company_id = current_user_company_id()',
  },
  products: {
    enabled: false,
    select: true,
    insert: false,
    update: false,
    delete: false,
    using: 'is_public = true OR owner_id = current_user_id()',
    withCheck: 'owner_id = current_user_id()',
  },
  audit_logs: {
    enabled: false,
    select: true,
    insert: false,
    update: false,
    delete: false,
    using: "user_id = current_user_id() OR current_user_role() = 'admin'",
    withCheck: 'false',
  },
};

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

// Text constants
export const modalTitle = {
  create: 'Створити нову роль',
  edit: 'Редагувати роль',
};

export const modalDescription = {
  create: 'Налаштуйте назву, опис, права доступу та видимість UI',
  edit: 'Змініть налаштування ролі, права доступу та видимість UI',
};

export const sectionTitles = {
  roleType: 'Тип ролі',
  basicInfo: 'Основна інформація',
  uiVisibility: 'Видимість інтерфейсу адмін-панелі',
  uiDisplay: 'Налаштування відображення інтерфейсу',
  rls: 'Row Level Security (RLS)',
};

export const sectionDescriptions = {
  uiVisibility: 'Оберіть які розділи будуть доступні для цієї ролі',
  uiDisplay: 'Контроль видимості технічних деталей та розширеної інформації',
  rlsAdmin: 'Налаштуйте політики безпеки на рівні рядків для таблиць',
  rlsUser: 'Обмеження доступу користувачів до даних на рівні рядків',
};

export const labels = {
  roleName: 'Назва ролі',
  roleDescription: 'Опис ролі',
  baseRole: 'Базувати на існуючій ролі',
  enabled: 'Увімкнено',
  disabled: 'Вимкнено',
  allowedOperations: 'Дозволені операції',
  usingExpression: 'USING вираз (SELECT/UPDATE/DELETE)',
  withCheckExpression: 'WITH CHECK вираз (INSERT/UPDATE)',
};

export const placeholders = {
  roleNameUser: 'Наприклад: Business User',
  roleNameAdmin: 'Наприклад: Backend Developer',
  roleDescription: "Опишіть призначення та обов'язки ролі...",
  baseRoleEmpty: 'Почати з порожніх прав',
  usingExpression: 'Наприклад: user_id = current_user_id()',
  withCheckExpression: 'Наприклад: company_id = current_user_company_id()',
};

export const hints = {
  usingExpression:
    'SQL умова, яка визначає які рядки доступні для читання і модифікації',
  withCheckExpression: 'SQL умова для перевірки нових або змінених рядків',
  uiVisibility:
    'Навіть якщо розділ видимий, фактичні можливості користувача будуть обмежені правами доступу RBAC.',
  uiDisplay:
    'Технічні деталі варто показувати тільки досвідченим користувачам та розробникам для запобігання плутанини.',
  rlsWarning:
    'RLS політики застосовуються на рівні PostgreSQL і обмежують доступ до даних незалежно від прав RBAC.',
  rlsExample:
    "Для обмеження доступу до власних записів використовуйте: user_id = current_user_id()",
};

export const buttonLabels = {
  cancel: 'Скасувати',
  create: 'Створити роль',
  save: 'Зберегти зміни',
};

export const operationLabels = {
  select: 'SELECT',
  insert: 'INSERT',
  update: 'UPDATE',
  delete: 'DELETE',
};

export const tableDescriptions = {
  users: 'Таблиця бази даних',
  orders: 'Таблиця бази даних',
  products: 'Таблиця бази даних',
  audit_logs: 'Таблиця бази даних',
};

export const colorClasses = {
  admin: {
    border: 'border-lime-500',
    bg: 'bg-lime-50',
    hover: 'hover:border-lime-300',
    icon: 'text-lime-600',
    radio: 'border-lime-500',
    radioFill: 'bg-lime-500',
  },
  user: {
    border: 'border-violet-500',
    bg: 'bg-violet-50',
    hover: 'hover:border-violet-300',
    icon: 'text-violet-600',
    radio: 'border-violet-500',
    radioFill: 'bg-violet-500',
  },
  neutral: {
    border: 'border-slate-200',
    bg: 'bg-slate-50',
    hover: 'hover:border-slate-300',
    icon: 'text-slate-600',
    radio: 'border-slate-300',
  },
};

export const alertStyles = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-900',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-900',
    icon: 'text-amber-600',
  },
  success: {
    bg: 'bg-lime-50',
    border: 'border-lime-200',
    text: 'text-lime-900',
  },
  violet: {
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    text: 'text-violet-900',
  },
};

export const buttonStyles = {
  create: 'bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700',
  edit: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
};

export const gridLayouts = {
  roleTypes: 'grid-cols-2',
  uiMenu: 'grid-cols-1 md:grid-cols-2',
  displaySettings: 'grid-cols-1 md:grid-cols-2',
  operations: 'grid-cols-2 md:grid-cols-4',
};

export const iconSizes = {
  header: 'w-5 h-5',
  small: 'w-4 h-4',
  checkbox: 'w-4 h-4',
  radio: 'w-5 h-5',
  radioFill: 'w-3 h-3',
};

export const defaultFormData = {
  name: '',
  description: '',
  baseRole: '',
};

export const validationRules = {
  nameMinLength: 3,
  nameMaxLength: 50,
  descriptionMaxLength: 500,
};

export const rlsTableNames = ['users', 'orders', 'products', 'audit_logs'];

export const defaultRoleType = 'user';
