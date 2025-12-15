import type { Database } from './types';

// CRM Database - система управління клієнтами
export const crmDatabase: Database = {
  id: 1,
  name: 'crm_database',
  description: 'CRM система управління клієнтами',
  tables: [
    {
      name: 'companies',
      records: 1254,
      size: '3.2 MB',
      permissions: ['SELECT', 'INSERT', 'UPDATE'],
      rlsEnabled: true,
      description: 'Компанії та організації',
    },
    {
      name: 'contacts',
      records: 3421,
      size: '5.8 MB',
      permissions: ['SELECT', 'INSERT', 'UPDATE'],
      rlsEnabled: true,
      description: 'Контактні особи',
    },
    {
      name: 'customers',
      records: 3421,
      size: '6.1 MB',
      permissions: ['SELECT', 'UPDATE'],
      rlsEnabled: true,
      description: 'Клієнти системи',
    },
    {
      name: 'deals',
      records: 892,
      size: '2.1 MB',
      permissions: ['SELECT', 'INSERT', 'UPDATE'],
      rlsEnabled: true,
      description: 'Угоди та контракти',
    },
    {
      name: 'activities',
      records: 5678,
      size: '8.4 MB',
      permissions: ['SELECT', 'INSERT'],
      rlsEnabled: true,
      description: 'Активності та події',
    },
    {
      name: 'notes',
      records: 2341,
      size: '1.9 MB',
      permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
      rlsEnabled: false,
      description: 'Нотатки та коментарі',
    },
    {
      name: 'tasks',
      records: 1842,
      size: '1.2 MB',
      permissions: ['SELECT', 'INSERT', 'UPDATE'],
      rlsEnabled: true,
      description: 'Завдання та задачі',
    },
    {
      name: 'emails',
      records: 8934,
      size: '12.3 MB',
      permissions: ['SELECT'],
      rlsEnabled: true,
      description: 'Email комунікації',
    },
  ],
};
