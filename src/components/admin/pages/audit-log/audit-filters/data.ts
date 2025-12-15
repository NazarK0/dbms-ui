/**
 * Configuration data for Audit Filters
 */

/**
 * User filter options
 */
export const userFilterOptions = [
  { value: 'all', label: 'Всі користувачі' },
  { value: 'admin', label: 'admin' },
  { value: 'developer', label: 'developer' },
  { value: 'analyst', label: 'analyst' },
  { value: 'app_user', label: 'app_user' },
  { value: 'backup_service', label: 'backup_service' },
];

/**
 * Action type filter options
 */
export const actionFilterOptions = [
  { value: 'all', label: 'Всі дії' },
  { value: 'create', label: 'Створення' },
  { value: 'update', label: 'Оновлення' },
  { value: 'delete', label: 'Видалення' },
  { value: 'select', label: 'Вибірка' },
  { value: 'grant', label: 'Надання прав' },
  { value: 'revoke', label: 'Відкликання' },
  { value: 'login', label: 'Вхід' },
  { value: 'backup', label: 'Резервування' },
];

/**
 * Category filter options
 */
export const categoryFilterOptions = [
  { value: 'all', label: 'Всі категорії' },
  { value: 'База даних', label: 'База даних' },
  { value: 'Таблиця', label: 'Таблиця' },
  { value: 'Запит', label: 'Запит' },
  { value: 'Права доступу', label: 'Права доступу' },
  { value: 'Резервна копія', label: 'Резервна копія' },
  { value: 'Функція', label: 'Функція' },
  { value: 'Тригер', label: 'Тригер' },
  { value: 'Користувач', label: 'Користувач' },
  { value: 'Автентифікація', label: 'Автентифікація' },
];
