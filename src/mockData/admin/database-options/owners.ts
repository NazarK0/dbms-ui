/**
 * Database Owners
 * 
 * Mock data for database owners (PostgreSQL users/roles).
 * In production: SELECT usename FROM pg_user ORDER BY usename
 */

import type { DatabaseOwner } from './types';

export const databaseOwners: DatabaseOwner[] = [
  {
    username: 'postgres',
    displayName: 'postgres (Superuser)',
    roleType: 'superuser',
    description: 'Суперкористувач PostgreSQL з повним доступом',
  },
  {
    username: 'admin',
    displayName: 'admin',
    roleType: 'admin',
    description: 'Адміністратор бази даних',
  },
  {
    username: 'developer',
    displayName: 'developer',
    roleType: 'user',
    description: 'Роль для розробників',
  },
  {
    username: 'analyst',
    displayName: 'analyst',
    roleType: 'user',
    description: 'Роль для аналітиків даних',
  },
  {
    username: 'data_admin',
    displayName: 'data_admin',
    roleType: 'admin',
    description: 'Адміністратор даних',
  },
  {
    username: 'dev_team',
    displayName: 'dev_team',
    roleType: 'user',
    description: 'Команда розробки',
  },
  {
    username: 'qa_team',
    displayName: 'qa_team',
    roleType: 'user',
    description: 'Команда тестування',
  },
];
