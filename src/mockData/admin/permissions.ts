import { Database, Table2, Code, UserX, Plug, HardDrive, Activity, Shield, Users, Eye } from 'lucide-react';

// Permission structure for admin roles
export interface Permission {
  id: string;
  name: string;
}

export interface PermissionCategory {
  category: string;
  icon: any;
  permissions: Permission[];
}

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

// Admin roles with permissions
export interface AdminRoleWithPermissions {
  id: string;
  name: string;
  color: string;
  permissions: Record<string, boolean>;
}

export const adminRolesWithPermissions: AdminRoleWithPermissions[] = [
  { 
    id: 'superadmin', 
    name: 'Superadmin', 
    color: 'from-red-500 to-red-600',
    permissions: {
      db_create: true, db_delete: true, db_modify: true, db_view: true,
      table_create: true, table_delete: true, table_alter: true, table_view: true,
      sql_select: true, sql_insert: true, sql_update: true, sql_delete: true,
      user_create: true, user_delete: true, user_modify: true, user_view: true,
      ext_install: true, func_create: true, trigger_create: true,
      backup_create: true, backup_restore: true, backup_view: true,
      monitor_view: true, logs_view: true, performance_view: true,
    }
  },
  { 
    id: 'dbadmin', 
    name: 'Database Admin', 
    color: 'from-lime-500 to-green-600',
    permissions: {
      db_create: true, db_delete: true, db_modify: true, db_view: true,
      table_create: true, table_delete: true, table_alter: true, table_view: true,
      sql_select: true, sql_insert: true, sql_update: true, sql_delete: true,
      user_create: false, user_delete: false, user_modify: false, user_view: true,
      ext_install: true, func_create: true, trigger_create: true,
      backup_create: true, backup_restore: true, backup_view: true,
      monitor_view: true, logs_view: true, performance_view: true,
    }
  },
  { 
    id: 'developer', 
    name: 'Developer', 
    color: 'from-yellow-500 to-lime-600',
    permissions: {
      db_create: false, db_delete: false, db_modify: false, db_view: true,
      table_create: true, table_delete: false, table_alter: true, table_view: true,
      sql_select: true, sql_insert: true, sql_update: true, sql_delete: false,
      user_create: false, user_delete: false, user_modify: false, user_view: false,
      ext_install: false, func_create: true, trigger_create: true,
      backup_create: false, backup_restore: false, backup_view: true,
      monitor_view: true, logs_view: true, performance_view: true,
    }
  },
  { 
    id: 'analyst', 
    name: 'Analyst', 
    color: 'from-green-500 to-lime-600',
    permissions: {
      db_create: false, db_delete: false, db_modify: false, db_view: true,
      table_create: false, table_delete: false, table_alter: false, table_view: true,
      sql_select: true, sql_insert: false, sql_update: false, sql_delete: false,
      user_create: false, user_delete: false, user_modify: false, user_view: false,
      ext_install: false, func_create: false, trigger_create: false,
      backup_create: false, backup_restore: false, backup_view: false,
      monitor_view: true, logs_view: false, performance_view: true,
    }
  },
  { 
    id: 'viewer', 
    name: 'Viewer', 
    color: 'from-lime-600 to-yellow-600',
    permissions: {
      db_create: false, db_delete: false, db_modify: false, db_view: true,
      table_create: false, table_delete: false, table_alter: false, table_view: true,
      sql_select: false, sql_insert: false, sql_update: false, sql_delete: false,
      user_create: false, user_delete: false, user_modify: false, user_view: false,
      ext_install: false, func_create: false, trigger_create: false,
      backup_create: false, backup_restore: false, backup_view: false,
      monitor_view: true, logs_view: false, performance_view: true,
    }
  },
];

// User roles with permissions
export interface UserRoleWithPermissions {
  id: string;
  name: string;
  color: string;
  permissions: Record<string, boolean>;
  limits: {
    storage: string;
    users: string;
    requests: string;
  };
}

export const userRolesWithPermissions: UserRoleWithPermissions[] = [
  { 
    id: 'data-analyst', 
    name: 'Data Analyst', 
    color: 'from-violet-500 to-purple-600',
    permissions: {
      project_create: true, project_delete: true, project_share: true, project_export: true,
      data_import: true, data_export: true, data_backup: true,
      api_access: true, api_keys: true, webhooks: true,
      custom_branding: true, custom_domain: true, sso: true,
      support_email: true, support_priority: true, support_phone: true,
      storage_limit: true, users_limit: true, requests_limit: true,
    },
    limits: { storage: 'Безліміт', users: 'Безліміт', requests: 'Безліміт' }
  },
  { 
    id: 'content-manager', 
    name: 'Content Manager', 
    color: 'from-blue-500 to-cyan-600',
    permissions: {
      project_create: true, project_delete: true, project_share: true, project_export: true,
      data_import: false, data_export: true, data_backup: false,
      api_access: false, api_keys: false, webhooks: false,
      custom_branding: false, custom_domain: false, sso: false,
      support_email: true, support_priority: false, support_phone: false,
      storage_limit: true, users_limit: true, requests_limit: true,
    },
    limits: { storage: '500 ГБ', users: '100', requests: '1M/день' }
  },
  { 
    id: 'report-viewer', 
    name: 'Report Viewer', 
    color: 'from-indigo-500 to-violet-600',
    permissions: {
      project_create: false, project_delete: false, project_share: false, project_export: true,
      data_import: false, data_export: true, data_backup: false,
      api_access: false, api_keys: false, webhooks: false,
      custom_branding: false, custom_domain: false, sso: false,
      support_email: true, support_priority: false, support_phone: false,
      storage_limit: false, users_limit: false, requests_limit: true,
    },
    limits: { storage: '50 ГБ', users: '10', requests: '100K/день' }
  },
  { 
    id: 'guest', 
    name: 'Guest User', 
    color: 'from-slate-400 to-slate-500',
    permissions: {
      project_create: false, project_delete: false, project_share: false, project_export: false,
      data_import: false, data_export: false, data_backup: false,
      api_access: false, api_keys: false, webhooks: false,
      custom_branding: false, custom_domain: false, sso: false,
      support_email: false, support_priority: false, support_phone: false,
      storage_limit: false, users_limit: false, requests_limit: false,
    },
    limits: { storage: '10 ГБ', users: '1', requests: '10K/день' }
  },
];

// UI Menu Items (for role creation/editing)
export interface UIMenuItem {
  id: string;
  label: string;
  icon: any;
  description: string;
}

export const uiMenuItems: UIMenuItem[] = [
  { id: 'dashboard', label: 'Панель управління', icon: Eye, description: 'Головний дашборд з метриками' },
  { id: 'databases', label: 'Бази даних', icon: Database, description: 'Управління БД, схемами та таблицями' },
  { id: 'users', label: 'Користувачі', icon: Users, description: 'Управління користувачами системи' },
  { id: 'roles', label: 'Ролі', icon: Shield, description: 'Управління ролями та правами' },
  { id: 'monitoring', label: 'Моніторинг', icon: Activity, description: 'Системний моніторинг та логи' },
  { id: 'performance', label: 'Продуктивність', icon: Activity, description: 'Аналіз продуктивності БД' },
  { id: 'backups', label: 'Резервні копії', icon: HardDrive, description: 'Управління бекапами' },
  { id: 'extensions', label: 'Розширення', icon: Plug, description: 'PostgreSQL розширення' },
  { id: 'config', label: 'Конфігурація', icon: Shield, description: 'Налаштування PostgreSQL' },
  { id: 'cli', label: 'CLI', icon: Code, description: 'Командний інтерфейс' },
];

// Role selection options for forms
export const adminRoleOptions = [
  { value: 'superadmin', label: 'Superadmin', color: 'from-red-500 to-red-600' },
  { value: 'database-admin', label: 'Database Admin', color: 'from-lime-500 to-green-600' },
  { value: 'developer', label: 'Developer', color: 'from-yellow-500 to-lime-600' },
  { value: 'analyst', label: 'Analyst', color: 'from-green-500 to-lime-600' },
  { value: 'viewer', label: 'Viewer', color: 'from-lime-600 to-yellow-600' },
];

export const userRoleOptions = [
  { value: 'data-analyst', label: 'Data Analyst', color: 'from-violet-500 to-purple-600' },
  { value: 'content-manager', label: 'Content Manager', color: 'from-blue-500 to-cyan-600' },
  { value: 'report-viewer', label: 'Report Viewer', color: 'from-indigo-500 to-violet-600' },
  { value: 'guest', label: 'Guest User', color: 'from-slate-400 to-slate-500' },
];

// Permission categories for admin (structured for forms)
export const adminPermissionCategories = [
  {
    id: 'databases',
    name: 'Бази даних',
    permissions: [
      { id: 'db_create', name: 'Створювати БД' },
      { id: 'db_delete', name: 'Видаляти БД' },
      { id: 'db_backup', name: 'Створювати резервні копії' },
      { id: 'db_restore', name: 'Відновлювати з резервних копій' },
    ]
  },
  {
    id: 'tables',
    name: 'Таблиці',
    permissions: [
      { id: 'table_create', name: 'Створювати таблиці' },
      { id: 'table_alter', name: 'Змінювати структуру' },
      { id: 'table_drop', name: 'Видаляти таблиці' },
      { id: 'table_truncate', name: 'Очищати таблиці' },
    ]
  },
  {
    id: 'users',
    name: 'Користувачі',
    permissions: [
      { id: 'user_create', name: 'Створювати користувачів' },
      { id: 'user_delete', name: 'Видаляти користувачів' },
      { id: 'user_grant', name: 'Надавати права' },
      { id: 'user_revoke', name: 'Забирати права' },
    ]
  },
  {
    id: 'monitoring',
    name: 'Моніторинг',
    permissions: [
      { id: 'monitor_view', name: 'Переглядати метрики' },
      { id: 'monitor_logs', name: 'Переглядати логи' },
      { id: 'monitor_queries', name: 'Аналізувати запити' },
    ]
  },
];

// Permission categories for users (structured for forms)
export const userPermissionCategories = [
  {
    id: 'content',
    name: 'Контент',
    permissions: [
      { id: 'content_create', name: 'Створювати записи' },
      { id: 'content_edit', name: 'Редагувати записи' },
      { id: 'content_delete', name: 'Видаляти записи' },
      { id: 'content_publish', name: 'Публікувати' },
    ]
  },
  {
    id: 'export',
    name: 'Експорт',
    permissions: [
      { id: 'export_csv', name: 'Експорт CSV' },
      { id: 'export_json', name: 'Експорт JSON' },
      { id: 'export_pdf', name: 'Експорт PDF' },
    ]
  },
  {
    id: 'api',
    name: 'API',
    permissions: [
      { id: 'api_read', name: 'Читання через API' },
      { id: 'api_write', name: 'Запис через API' },
    ]
  },
];
