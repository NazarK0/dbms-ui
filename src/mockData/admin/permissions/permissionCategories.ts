/**
 * Permission Categories for Forms
 * 
 * Structured permission categories for role creation/editing forms
 */

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
