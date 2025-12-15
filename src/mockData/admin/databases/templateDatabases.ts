/**
 * Template databases (PostgreSQL system templates)
 */

import type { TemplateDatabase } from './types';

export const templateDatabases: TemplateDatabase[] = [
  {
    name: 'template0',
    description: 'Базовий незмінний шаблон PostgreSQL',
    size: '7.8 МБ',
    tables: 0,
    encoding: 'UTF8',
    collation: 'uk_UA.UTF-8',
    allowCloning: false,
    type: 'template',
  },
  {
    name: 'template1',
    description: 'Шаблон за замовчуванням для нових БД',
    size: '7.9 МБ',
    tables: 0,
    encoding: 'UTF8',
    collation: 'uk_UA.UTF-8',
    allowCloning: true,
    type: 'template',
  },
];
