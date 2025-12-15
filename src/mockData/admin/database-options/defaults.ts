/**
 * Database Creation Defaults and Settings
 * 
 * Default values, validation rules, and form configuration
 */

// Database creation settings defaults
export const databaseDefaults = {
  owner: 'postgres',
  encoding: 'UTF8',
  template: 'template1',
  tablespace: 'pg_default',
  collation: 'uk_UA.UTF-8',
  characterType: 'uk_UA.UTF-8',
  connectionLimit: -1,
  allowConnections: true,
  isTemplate: false,
};

// Validation rules
export const validationRules = {
  dbName: {
    pattern: /^[a-z_][a-z0-9_]*$/,
    minLength: 1,
    maxLength: 63,
    errorMessage: 'Назва БД може містити лише малі літери, цифри та підкреслення. Має починатися з літери або підкреслення.',
  },
  reservedNames: [
    'postgres',
    'template0',
    'template1',
    'pg_',
  ],
};

// Database creation form sections
export const formSections = {
  basic: {
    title: 'Основні параметри',
    description: 'Обов\'язкові налаштування для створення бази даних',
  },
  encoding: {
    title: 'Кодування та локалізація',
    description: 'Параметри кодування та сортування даних',
  },
  advanced: {
    title: 'Розширені налаштування',
    description: 'Додаткові параметри та обмеження',
  },
};
