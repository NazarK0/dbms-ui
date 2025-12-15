/**
 * End users data
 */

import type { User } from './types';

// Get system timezone
const systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const endUsers: User[] = [
  {
    id: 101,
    name: 'Анна Сидоренко',
    email: 'anna.s@example.com',
    role: 'Data Analyst',
    roleColor: 'from-violet-500 to-purple-600',
    registered: '2024-10-15',
    status: 'active',
    avatar: 'АС',
    timezone: systemTimezone
  },
  {
    id: 102,
    name: 'Дмитро Мельник',
    email: 'dmytro.m@example.com',
    role: 'Content Manager',
    roleColor: 'from-blue-500 to-cyan-600',
    registered: '2024-11-20',
    status: 'active',
    avatar: 'ДМ',
    timezone: 'Europe/Berlin'
  },
  {
    id: 103,
    name: 'Олена Бондаренко',
    email: 'olena.b@example.com',
    role: 'Report Viewer',
    roleColor: 'from-indigo-500 to-violet-600',
    registered: '2024-12-01',
    status: 'active',
    avatar: 'ОБ',
    timezone: systemTimezone
  },
  {
    id: 104,
    name: 'Сергій Ткаченко',
    email: 'sergiy.t@example.com',
    role: 'Guest User',
    roleColor: 'from-slate-400 to-slate-500',
    registered: '2024-12-10',
    status: 'active',
    avatar: 'СТ',
    timezone: 'Australia/Sydney'
  },
];
