/**
 * Configuration data and constants for UsersManager components
 */

import { Users, UserCog, Shield, Calendar } from 'lucide-react';
import type { UserStatsCardData, RoleInfo } from './types';

export const userStatsCardConfig: Omit<UserStatsCardData, 'value'>[] = [
  {
    icon: Users,
    title: 'Всього користувачів',
    description: 'Адміни та користувачі',
    gradient: 'from-lime-500 to-green-600',
  },
  {
    icon: UserCog,
    title: 'Адміністраторів',
    description: 'З доступом до панелі',
    gradient: 'from-green-500 to-lime-600',
  },
  {
    icon: Shield,
    title: 'Кінцевих користувачів',
    description: 'Користувачі застосунку',
    gradient: 'from-yellow-500 to-lime-600',
  },
  {
    icon: Calendar,
    title: 'Цього місяця',
    description: 'Нових користувачів',
    gradient: 'from-blue-500 to-cyan-600',
  },
];

export const microsoftADInfo = {
  title: 'Управління через Microsoft Active Directory',
  description:
    'Користувачі автоматично синхронізуються з корпоративного Active Directory. Для створення нових облікових записів зверніться до системного адміністратора вашої організації.',
};

export const userTableTabs = {
  admin: {
    label: 'Адміністратори',
    icon: UserCog,
  },
  user: {
    label: 'Користувачі',
    icon: Users,
  },
};

export const adminRoles: RoleInfo[] = [
  {
    name: 'Superadmin',
    color: 'from-red-500 to-red-600',
    permissions: ['all'],
    description: 'Повний доступ до всіх функцій системи',
    userCount: 0,
  },
  {
    name: 'Database Admin',
    color: 'from-lime-500 to-green-600',
    permissions: ['database_management', 'user_management', 'monitoring'],
    description: 'Управління базами даних та користувачами',
    userCount: 0,
  },
  {
    name: 'Developer',
    color: 'from-yellow-500 to-lime-600',
    permissions: ['query_execution', 'schema_view', 'table_browse'],
    description: 'Виконання запитів та перегляд схем',
    userCount: 0,
  },
  {
    name: 'Analyst',
    color: 'from-green-500 to-lime-600',
    permissions: ['query_execution', 'table_browse', 'reports'],
    description: 'Аналіз даних та створення звітів',
    userCount: 0,
  },
  {
    name: 'Viewer',
    color: 'from-lime-600 to-yellow-600',
    permissions: ['table_browse', 'schema_view'],
    description: 'Тільки перегляд даних',
    userCount: 0,
  },
];

export const endUserRoles: RoleInfo[] = [
  {
    name: 'Data Analyst',
    color: 'from-violet-500 to-purple-600',
    permissions: ['query_builder', 'reports', 'dashboards'],
    description: 'Створення запитів та звітів',
    userCount: 0,
  },
  {
    name: 'Content Manager',
    color: 'from-blue-500 to-cyan-600',
    permissions: ['content_edit', 'media_upload'],
    description: 'Управління контентом',
    userCount: 0,
  },
  {
    name: 'Report Viewer',
    color: 'from-indigo-500 to-violet-600',
    permissions: ['reports_view', 'dashboards_view'],
    description: 'Перегляд звітів та дашбордів',
    userCount: 0,
  },
  {
    name: 'Guest User',
    color: 'from-slate-400 to-slate-500',
    permissions: ['basic_view'],
    description: 'Обмежений доступ',
    userCount: 0,
  },
];

export const userStatusLabels = {
  active: 'Активний',
  inactive: 'Неактивний',
};

export const userStatusColors = {
  active: 'text-green-600',
  inactive: 'text-slate-400',
};

export const userFilterOptions = {
  status: [
    { value: 'all', label: 'Всі статуси' },
    { value: 'active', label: 'Активні' },
    { value: 'inactive', label: 'Неактивні' },
  ],
};

export const userSortOptions = [
  { value: 'name', label: 'За іменем' },
  { value: 'email', label: 'За email' },
  { value: 'role', label: 'За роллю' },
  { value: 'lastActive', label: 'За активністю' },
  { value: 'registered', label: 'За датою реєстрації' },
  { value: 'status', label: 'За статусом' },
];

export const userTableColumns = {
  admin: ['name', 'email', 'role', 'lastActive', 'status', 'actions'],
  user: ['name', 'email', 'role', 'registered', 'status', 'actions'],
};

export const userExportFormats = [
  { value: 'csv', label: 'CSV', extension: '.csv' },
  { value: 'json', label: 'JSON', extension: '.json' },
  { value: 'excel', label: 'Excel', extension: '.xlsx' },
];

export const userImportFormats = [
  { value: 'csv', label: 'CSV', extension: '.csv' },
  { value: 'json', label: 'JSON', extension: '.json' },
  { value: 'excel', label: 'Excel', extension: '.xlsx' },
];

export const bulkActionTypes = [
  { value: 'activate', label: 'Активувати' },
  { value: 'deactivate', label: 'Деактивувати' },
  { value: 'assignRole', label: 'Призначити роль' },
  { value: 'changeTimezone', label: 'Змінити часовий пояс' },
  { value: 'delete', label: 'Видалити' },
];

export const defaultUserFilter = {
  search: '',
  role: '',
  status: undefined as 'active' | 'inactive' | undefined,
  timezone: '',
};

export const defaultUserSort = {
  field: 'name' as const,
  direction: 'asc' as const,
};

export const userActivityThresholds = {
  online: 5, // minutes
  recent: 60, // minutes
  inactive: 24 * 60, // 1 day in minutes
};

export const avatarGradients = [
  'from-lime-500 to-green-600',
  'from-green-500 to-lime-600',
  'from-yellow-500 to-lime-600',
  'from-blue-500 to-cyan-600',
  'from-violet-500 to-purple-600',
  'from-indigo-500 to-violet-600',
  'from-red-500 to-red-600',
  'from-orange-500 to-red-600',
];

export const paginationConfig = {
  defaultPageSize: 10,
  pageSizeOptions: [10, 25, 50, 100],
};

export const searchConfig = {
  minSearchLength: 2,
  searchFields: ['name', 'email', 'role', 'timezone'],
  highlightMatches: true,
};

export const validationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Невірний формат email',
  },
  name: {
    minLength: 2,
    maxLength: 100,
    message: "Ім'я має бути від 2 до 100 символів",
  },
};

export const defaultAvatarColors = [
  'from-lime-500 to-green-600',
  'from-green-500 to-lime-600',
  'from-yellow-500 to-lime-600',
  'from-lime-600 to-yellow-600',
];
