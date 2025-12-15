/**
 * Template Databases
 * 
 * Mock data for template database options.
 * In production: SELECT datname FROM pg_database WHERE datistemplate = true
 */

import type { TemplateDatabaseOption } from './types';

export const templateDatabaseOptions: TemplateDatabaseOption[] = [
  {
    name: 'template1',
    description: 'Стандартний шаблон (за замовчуванням)',
    isDefault: true,
    canConnect: true,
  },
  {
    name: 'template0',
    description: 'Оригінальний чистий шаблон',
    canConnect: false,
  },
];
