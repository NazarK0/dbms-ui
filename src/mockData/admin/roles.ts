// Mock data for roles and permissions (Admin)

export type RoleType = 'admin' | 'user';

export interface Role {
  name: string;
  users: number;
  description: string;
  color: string;
  badge: 'destructive' | 'default' | 'secondary' | 'outline';
  type: RoleType;
}

export const roles: Role[] = [
  { 
    name: 'Superadmin', 
    users: 2, 
    description: 'Повний доступ до всіх функцій системи',
    color: 'from-red-500 to-red-600',
    badge: 'destructive',
    type: 'admin'
  },
  { 
    name: 'Database Admin', 
    users: 5, 
    description: 'Управління базами даних, таблицями, схемами',
    color: 'from-lime-500 to-green-600',
    badge: 'default',
    type: 'admin'
  },
  { 
    name: 'Developer', 
    users: 12, 
    description: 'Доступ до query editor, перегляд схем',
    color: 'from-yellow-500 to-lime-600',
    badge: 'secondary',
    type: 'admin'
  },
  { 
    name: 'Analyst', 
    users: 8, 
    description: 'Тільки читання даних, виконання SELECT запитів',
    color: 'from-green-500 to-lime-600',
    badge: 'outline',
    type: 'admin'
  },
  { 
    name: 'Viewer', 
    users: 15, 
    description: 'Перегляд метрик та моніторингу без можливості змін',
    color: 'from-lime-600 to-yellow-600',
    badge: 'secondary',
    type: 'admin'
  },
  {
    name: 'Data Analyst',
    users: 245,
    description: 'Аналіз даних та створення звітів',
    color: 'from-violet-500 to-purple-600',
    badge: 'default',
    type: 'user'
  },
  {
    name: 'Content Manager',
    users: 1823,
    description: 'Управління контентом системи',
    color: 'from-blue-500 to-cyan-600',
    badge: 'secondary',
    type: 'user'
  },
  {
    name: 'Report Viewer',
    users: 4521,
    description: 'Перегляд звітів та даних',
    color: 'from-indigo-500 to-violet-600',
    badge: 'outline',
    type: 'user'
  },
  {
    name: 'Guest User',
    users: 156,
    description: 'Обмежений доступ для гостей',
    color: 'from-slate-400 to-slate-500',
    badge: 'secondary',
    type: 'user'
  },
];

// Separate roles by type
export const adminRoles = roles.filter(role => role.type === 'admin');
export const userRoles = roles.filter(role => role.type === 'user');

// Calculate totals
export const totalAdmins = adminRoles.reduce((sum, role) => sum + role.users, 0);
export const totalUsers = userRoles.reduce((sum, role) => sum + role.users, 0);
