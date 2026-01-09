/**
 * Administrator users data
 */

import type { User } from './types';

// Get system timezone
const systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export { systemTimezone };

export const administrators: User[] = [
  {
    id: 1,
    name: 'Іван Петренко',
    email: 'ivan@company.com',
    role: 'Superadmin',
    roleColor: 'from-red-500 to-red-600',
    lastActive: '2024-12-12 14:30',
    status: 'active',
    avatar: 'IP',
    timezone: systemTimezone
  },
  {
    id: 2,
    name: 'Марія Коваленко',
    email: 'maria@company.com',
    role: 'Database Admin',
    roleColor: 'from-lime-500 to-green-600',
    lastActive: '2024-12-12 12:15',
    status: 'active',
    avatar: 'МК',
    timezone: 'Europe/London'
  },
  {
    id: 3,
    name: 'Олександр Шевченко',
    email: 'alex@company.com',
    role: 'Developer',
    roleColor: 'from-yellow-500 to-lime-600',
    lastActive: '2024-12-11 18:45',
    status: 'inactive',
    avatar: 'ОШ',
    timezone: 'America/New_York'
  },
  {
    id: 4,
    name: 'Катерина Мельник',
    email: 'kateryna@company.com',
    role: 'Analyst',
    roleColor: 'from-green-500 to-lime-600',
    lastActive: '2024-12-12 09:20',
    status: 'active',
    avatar: 'КМ',
    timezone: systemTimezone
  },
  {
    id: 5,
    name: 'Андрій Ткач',
    email: 'andriy@company.com',
    role: 'Viewer',
    roleColor: 'from-lime-600 to-yellow-600',
    lastActive: '2024-12-10 16:45',
    status: 'active',
    avatar: 'АТ',
    timezone: 'Asia/Tokyo'
  },
];
