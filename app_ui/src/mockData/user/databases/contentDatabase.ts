import type { Database } from './types';

// Content Database - управління контентом
export const contentDatabase: Database = {
  id: 5,
  name: 'content_db',
  description: 'Управління контентом',
  tables: [
    {
      name: 'articles',
      records: 1842,
      size: '8.4 MB',
      permissions: ['SELECT', 'INSERT', 'UPDATE'],
      rlsEnabled: true,
      description: 'Статті та публікації',
    },
    {
      name: 'pages',
      records: 345,
      size: '2.1 MB',
      permissions: ['SELECT', 'INSERT', 'UPDATE'],
      rlsEnabled: false,
      description: 'Сторінки сайту',
    },
    {
      name: 'media',
      records: 5234,
      size: '124.6 MB',
      permissions: ['SELECT', 'INSERT', 'DELETE'],
      rlsEnabled: true,
      description: 'Медіафайли',
    },
    {
      name: 'tags',
      records: 456,
      size: '180 KB',
      permissions: ['SELECT', 'INSERT'],
      rlsEnabled: false,
      description: 'Теги та мітки',
    },
    {
      name: 'comments',
      records: 3421,
      size: '4.2 MB',
      permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
      rlsEnabled: true,
      description: 'Коментарі користувачів',
    },
    {
      name: 'authors',
      records: 89,
      size: '245 KB',
      permissions: ['SELECT'],
      rlsEnabled: false,
      description: 'Автори контенту',
    },
    {
      name: 'categories',
      records: 67,
      size: '95 KB',
      permissions: ['SELECT'],
      rlsEnabled: false,
      description: 'Категорії контенту',
    },
    {
      name: 'revisions',
      records: 8234,
      size: '12.8 MB',
      permissions: ['SELECT'],
      rlsEnabled: true,
      description: 'Історія змін',
    },
  ],
};
