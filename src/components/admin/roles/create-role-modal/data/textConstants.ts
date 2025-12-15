/**
 * Text constants for CreateRoleModal - all UI strings
 */

// Modal title and description
export const modalTitle = {
  create: 'Створити нову роль',
  edit: 'Редагувати роль',
};

export const modalDescription = {
  create: 'Налаштуйте назву, опис, права доступу та видимість UI',
  edit: 'Змініть налаштування ролі, права доступу та видимість UI',
};

// Section titles
export const sectionTitles = {
  roleType: 'Тип ролі',
  basicInfo: 'Основна інформація',
  uiVisibility: 'Видимість інтерфейсу адмін-панелі',
  uiDisplay: 'Налаштування відображення інтерфейсу',
  rls: 'Row Level Security (RLS)',
};

// Section descriptions
export const sectionDescriptions = {
  uiVisibility: 'Оберіть які розділи будуть доступні для цієї ролі',
  uiDisplay: 'Контроль видимості технічних деталей та розширеної інформації',
  rlsAdmin: 'Налаштуйте політики безпеки на рівні рядків для таблиць',
  rlsUser: 'Обмеження доступу користувачів до даних на рівні рядків',
};

// Form field labels
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

// Form field placeholders
export const placeholders = {
  roleNameUser: 'Наприклад: Business User',
  roleNameAdmin: 'Наприклад: Backend Developer',
  roleDescription: "Опишіть призначення та обов'язки ролі...",
  baseRoleEmpty: 'Почати з порожніх прав',
  usingExpression: 'Наприклад: user_id = current_user_id()',
  withCheckExpression: 'Наприклад: company_id = current_user_company_id()',
};

// Hints and help text
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

// Button labels
export const buttonLabels = {
  cancel: 'Скасувати',
  create: 'Створити роль',
  save: 'Зберегти зміни',
};

// Operation labels
export const operationLabels = {
  select: 'SELECT',
  insert: 'INSERT',
  update: 'UPDATE',
  delete: 'DELETE',
};

// Table descriptions
export const tableDescriptions = {
  users: 'Таблиця бази даних',
  orders: 'Таблиця бази даних',
  products: 'Таблиця бази даних',
  audit_logs: 'Таблиця бази даних',
};
