// Mock data for databases in admin panel

export interface Database {
  name: string;
  owner: string;
  size: string;
  tables: number;
  encoding: string;
  collation: string;
  description?: string;
  type: 'user' | 'template' | 'admin';
}

export interface TemplateDatabase {
  name: string;
  description: string;
  size: string;
  tables: number;
  encoding: string;
  collation: string;
  allowCloning: boolean;
  type: 'template';
}

export interface AdminDatabase {
  name: string;
  description: string;
  size: string;
  tables: number;
  encoding: string;
  collation: string;
  type: 'admin';
}

// User databases (application databases)
export const userDatabases: Database[] = [
  {
    name: 'production_db',
    owner: 'admin',
    size: '1.2 ГБ',
    tables: 45,
    encoding: 'UTF8',
    collation: 'uk_UA.UTF-8',
    description: 'Основна продакшн база даних',
    type: 'user',
  },
  {
    name: 'analytics_db',
    owner: 'data_admin',
    size: '856 МБ',
    tables: 28,
    encoding: 'UTF8',
    collation: 'uk_UA.UTF-8',
    description: 'База даних для аналітики',
    type: 'user',
  },
  {
    name: 'staging_db',
    owner: 'dev_team',
    size: '542 МБ',
    tables: 32,
    encoding: 'UTF8',
    collation: 'uk_UA.UTF-8',
    description: 'Тестове середовище',
    type: 'user',
  },
  {
    name: 'testing_db',
    owner: 'qa_team',
    size: '234 МБ',
    tables: 18,
    encoding: 'UTF8',
    collation: 'uk_UA.UTF-8',
    description: 'База даних для тестування',
    type: 'user',
  },
];

// Template databases (PostgreSQL system templates)
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

// Admin databases (PostgreSQL system databases)
export const adminDatabases: AdminDatabase[] = [
  {
    name: 'postgres',
    description: 'Системна БД для підключень та управління',
    size: '8.2 МБ',
    tables: 5,
    encoding: 'UTF8',
    collation: 'uk_UA.UTF-8',
    type: 'admin',
  },
];

// All databases combined
export const allDatabases = [
  ...userDatabases,
  ...templateDatabases.map(db => ({ ...db, owner: 'postgres' })),
  ...adminDatabases.map(db => ({ ...db, owner: 'postgres' })),
];
