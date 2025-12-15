/**
 * User (application) databases
 */

import type { Database } from './types';

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
