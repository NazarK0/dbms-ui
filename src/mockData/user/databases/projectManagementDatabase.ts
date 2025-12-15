import type { Database } from './types';

// Project Management Database - управління проєктами та завданнями
export const projectManagementDatabase: Database = {
  id: 2,
  name: 'project_management',
  description: 'Управління проєктами та завданнями',
  tables: [
    {
      name: 'projects',
      records: 847,
      size: '2.4 MB',
      permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
      rlsEnabled: true,
      description: 'Проєкти',
    },
    {
      name: 'tasks',
      records: 4521,
      size: '6.8 MB',
      permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
      rlsEnabled: true,
      description: 'Завдання проєктів',
    },
    {
      name: 'milestones',
      records: 234,
      size: '450 KB',
      permissions: ['SELECT', 'INSERT', 'UPDATE'],
      rlsEnabled: false,
      description: 'Віхи проєктів',
    },
    {
      name: 'team_members',
      records: 156,
      size: '280 KB',
      permissions: ['SELECT'],
      rlsEnabled: true,
      description: 'Члени команди',
    },
    {
      name: 'time_logs',
      records: 12456,
      size: '8.9 MB',
      permissions: ['SELECT', 'INSERT', 'UPDATE'],
      rlsEnabled: true,
      description: 'Облік часу',
    },
    {
      name: 'sprints',
      records: 342,
      size: '890 KB',
      permissions: ['SELECT', 'INSERT', 'UPDATE'],
      rlsEnabled: false,
      description: 'Спрінти',
    },
    {
      name: 'comments',
      records: 5234,
      size: '4.2 MB',
      permissions: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
      rlsEnabled: true,
      description: 'Коментарі до завдань',
    },
    {
      name: 'attachments',
      records: 2891,
      size: '45.6 MB',
      permissions: ['SELECT', 'INSERT', 'DELETE'],
      rlsEnabled: true,
      description: 'Файли та вкладення',
    },
  ],
};
