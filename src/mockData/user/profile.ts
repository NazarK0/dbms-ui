// User Profile Mock Data

// Activity Statistics
export interface ActivityStat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export const activityStats: ActivityStat[] = [
  { label: 'Запитів сьогодні', value: '1,245', change: '+12%', trend: 'up' },
  { label: 'Створено записів', value: '47', change: '+5%', trend: 'up' },
  { label: 'Оновлено записів', value: '123', change: '+8%', trend: 'up' },
  { label: 'Помилок', value: '3', change: '-25%', trend: 'down' },
];

// Grouped Databases for Profile
export interface DatabaseGroup {
  group: string;
  databases: Array<{
    name: string;
    tables: number;
    role: string;
    lastAccess: string;
  }>;
}

export const groupedDatabases: DatabaseGroup[] = [
  {
    group: 'Production Databases',
    databases: [
      { name: 'crm_database', tables: 24, role: 'Редактор', lastAccess: '5 хв тому' },
      { name: 'ecommerce_db', tables: 32, role: 'Редактор', lastAccess: '1 год тому' },
    ],
  },
  {
    group: 'Analytics & Reports',
    databases: [
      { name: 'analytics_db', tables: 12, role: 'Читач', lastAccess: '2 год тому' },
      { name: 'bi_reports', tables: 8, role: 'Читач', lastAccess: 'вчора' },
    ],
  },
  {
    group: 'Development',
    databases: [
      { name: 'project_management', tables: 18, role: 'Адміністратор', lastAccess: '15 хв тому' },
      { name: 'test_db', tables: 15, role: 'Редактор', lastAccess: '3 год тому' },
    ],
  },
];

// User Info
export interface UserInfo {
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
  lastLogin: string;
  status: 'active' | 'away' | 'offline';
}

export const currentUserInfo: UserInfo = {
  name: 'Іван Петренко',
  email: 'ivan.petrenko@company.com',
  role: 'Data Analyst',
  department: 'Аналітика',
  joinDate: '15 березня 2023',
  lastLogin: '10 хвилин тому',
  status: 'active',
};

// Recent Activity (detailed)
export interface RecentActivity {
  id: number;
  type: 'create' | 'update' | 'delete' | 'export' | 'query';
  description: string;
  database: string;
  table: string;
  timestamp: string;
  status: 'success' | 'error' | 'warning';
}

export const recentActivity: RecentActivity[] = [
  {
    id: 1,
    type: 'update',
    description: 'Оновлено запис у таблиці companies',
    database: 'crm_database',
    table: 'companies',
    timestamp: '5 хвилин тому',
    status: 'success',
  },
  {
    id: 2,
    type: 'create',
    description: 'Створено новий проєкт',
    database: 'project_management',
    table: 'projects',
    timestamp: '12 хвилин тому',
    status: 'success',
  },
  {
    id: 3,
    type: 'export',
    description: 'Експортовано дані таблиці orders',
    database: 'ecommerce_db',
    table: 'orders',
    timestamp: '45 хвилин тому',
    status: 'success',
  },
  {
    id: 4,
    type: 'query',
    description: 'Виконано складний запит до аналітики',
    database: 'analytics_db',
    table: 'reports',
    timestamp: '1 годину тому',
    status: 'warning',
  },
  {
    id: 5,
    type: 'delete',
    description: 'Видалено застарілі записи',
    database: 'crm_database',
    table: 'activities',
    timestamp: '2 години тому',
    status: 'success',
  },
  {
    id: 6,
    type: 'update',
    description: 'Масове оновлення продуктів',
    database: 'ecommerce_db',
    table: 'products',
    timestamp: '3 години тому',
    status: 'error',
  },
];

// Database Access Permissions
export interface DatabaseAccess {
  database: string;
  permissions: {
    read: boolean;
    write: boolean;
    delete: boolean;
    export: boolean;
  };
  tables: string[];
  grantedBy: string;
  grantedDate: string;
}

export const databaseAccessPermissions: DatabaseAccess[] = [
  {
    database: 'crm_database',
    permissions: { read: true, write: true, delete: true, export: true },
    tables: ['companies', 'contacts', 'deals', 'activities', 'notes'],
    grantedBy: 'Марія Коваленко',
    grantedDate: '1 березня 2024',
  },
  {
    database: 'project_management',
    permissions: { read: true, write: true, delete: true, export: true },
    tables: ['projects', 'tasks', 'milestones', 'team_members', 'time_logs'],
    grantedBy: 'Олексій Шевченко',
    grantedDate: '15 лютого 2024',
  },
  {
    database: 'analytics_db',
    permissions: { read: true, write: false, delete: false, export: true },
    tables: ['reports', 'metrics', 'kpis', 'dashboards'],
    grantedBy: 'Анна Мельник',
    grantedDate: '20 січня 2024',
  },
  {
    database: 'ecommerce_db',
    permissions: { read: true, write: true, delete: false, export: true },
    tables: ['products', 'orders', 'customers', 'categories', 'reviews', 'inventory'],
    grantedBy: 'Дмитро Коваль',
    grantedDate: '10 січня 2024',
  },
];
