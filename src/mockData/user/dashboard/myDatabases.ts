import type { UserDatabase } from './types';

// My Databases - бази даних користувача (спрощена версія для швидкого доступу)
export const myDatabases: UserDatabase[] = [
  {
    id: 1,
    name: 'crm_database',
    description: 'CRM система управління клієнтами',
    tables: 24,
    size: '1.2 ГБ',
    lastAccessed: '5 хвилин тому',
    color: 'from-violet-500 to-purple-600',
    icon: '👥',
  },
  {
    id: 2,
    name: 'project_management',
    description: 'Управління проєктами та завданнями',
    tables: 18,
    size: '890 МБ',
    lastAccessed: '15 хвилин тому',
    color: 'from-blue-500 to-cyan-600',
    icon: '📊',
  },
  {
    id: 3,
    name: 'analytics_db',
    description: 'Аналітика та звітність',
    tables: 12,
    size: '450 МБ',
    lastAccessed: '1 годину тому',
    color: 'from-indigo-500 to-violet-600',
    icon: '📈',
  },
  {
    id: 4,
    name: 'ecommerce_db',
    description: 'Електронна комерція',
    tables: 32,
    size: '2.1 ГБ',
    lastAccessed: '3 години тому',
    color: 'from-green-500 to-lime-600',
    icon: '🛒',
  },
];
