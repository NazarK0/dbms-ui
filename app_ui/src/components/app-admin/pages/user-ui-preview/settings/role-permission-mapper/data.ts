import {PermissionConfig, RolePermissions } from '../../types';


export const permissionConfigs: PermissionConfig[] = [
  {
    key: 'createProjects',
    label: 'Створення проєктів',
    description: 'Дозволяє створювати нові проєкти',
  },
  {
    key: 'deleteProjects',
    label: 'Видалення проєктів',
    description: 'Дозволяє видаляти існуючі проєкти',
  },
  {
    key: 'shareProjects',
    label: 'Спільний доступ',
    description: 'Дозволяє ділитися проєктами з іншими користувачами',
  },
  {
    key: 'exportData',
    label: 'Експорт даних',
    description: 'Дозволяє експортувати дані з системи',
  },
  {
    key: 'importData',
    label: 'Імпорт даних',
    description: 'Дозволяє імпортувати дані в систему',
  },
  {
    key: 'useApi',
    label: 'Використання API',
    description: 'Дозволяє доступ до API системи',
  },
  {
    key: 'customBranding',
    label: 'Свій брендинг',
    description: 'Дозволяє налаштування власного брендингу',
  },
  {
    key: 'prioritySupport',
    label: 'Пріоритетна підтримка',
    description: 'Надає доступ до пріоритетної підтримки',
  },
];

export const rolePermissions: RolePermissions = {
  // Default roles and their permissions
  'data-analyst': {
    createProjects: true,
    deleteProjects: true,
    shareProjects: true,
    exportData: true,
    importData: true,
    useApi: true,
    customBranding: true,
    prioritySupport: true,
  },
  'content-manager': {
    createProjects: true,
    deleteProjects: true,
    shareProjects: true,
    exportData: true,
    importData: false,
    useApi: false,
    customBranding: false,
    prioritySupport: false,
  },
  'report-viewer': {
    createProjects: true,
    deleteProjects: false,
    shareProjects: false,
    exportData: false,
    importData: false,
    useApi: false,
    customBranding: false,
    prioritySupport: false,
  },
  'guest-user': {
    createProjects: true,
    deleteProjects: true,
    shareProjects: true,
    exportData: true,
    importData: true,
    useApi: true,
    customBranding: false,
    prioritySupport: true,
  },
};

