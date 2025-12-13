// User Dashboard Mock Data

// Last Modified Records
export interface ModifiedRecord {
  id: number;
  title: string;
  table: string;
  database: string;
  action: 'created' | 'updated';
  timestamp: string;
  user: string;
}

export const lastModifiedRecords: ModifiedRecord[] = [
  {
    id: 1,
    title: 'Інтернет-маркетинг компанія "WebPro"',
    table: 'companies',
    database: 'crm_database',
    action: 'updated',
    timestamp: '5 хвилин тому',
    user: 'Іван Петренко',
  },
  {
    id: 2,
    title: 'Розробка мобільного додатку для e-commerce',
    table: 'projects',
    database: 'project_management',
    action: 'created',
    timestamp: '12 хвилин тому',
    user: 'Марія Коваленко',
  },
  {
    id: 3,
    title: 'Квартальний звіт продажів Q4 2024',
    table: 'reports',
    database: 'analytics_db',
    action: 'updated',
    timestamp: '1 годину тому',
    user: 'Олексій Шевченко',
  },
  {
    id: 4,
    title: 'Контракт з постачальником IT-обладнання',
    table: 'contracts',
    database: 'procurement_db',
    action: 'created',
    timestamp: '2 години тому',
    user: 'Анна Мельник',
  },
  {
    id: 5,
    title: 'Оновлення каталогу продуктів',
    table: 'products',
    database: 'ecommerce_db',
    action: 'updated',
    timestamp: '3 години тому',
    user: 'Дмитро Коваль',
  },
];

// Last Accessed Tables
export interface AccessedTable {
  id: number;
  name: string;
  database: string;
  records: number;
  lastAccessed: string;
  accessType: 'read' | 'write';
  icon: string;
}

export const lastAccessedTables: AccessedTable[] = [
  {
    id: 1,
    name: 'companies',
    database: 'crm_database',
    records: 1254,
    lastAccessed: '5 хвилин тому',
    accessType: 'write',
    icon: '🏢',
  },
  {
    id: 2,
    name: 'projects',
    database: 'project_management',
    records: 847,
    lastAccessed: '15 хвилин тому',
    accessType: 'read',
    icon: '📊',
  },
  {
    id: 3,
    name: 'customers',
    database: 'crm_database',
    records: 3421,
    lastAccessed: '45 хвилин тому',
    accessType: 'read',
    icon: '👥',
  },
  {
    id: 4,
    name: 'orders',
    database: 'ecommerce_db',
    records: 12456,
    lastAccessed: '1 годину тому',
    accessType: 'write',
    icon: '🛒',
  },
  {
    id: 5,
    name: 'reports',
    database: 'analytics_db',
    records: 234,
    lastAccessed: '2 години тому',
    accessType: 'read',
    icon: '📈',
  },
];

// User Databases
export interface UserDatabase {
  id: number;
  name: string;
  description: string;
  tables: number;
  size: string;
  lastAccessed: string;
  color: string;
  icon: string;
}

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

// Database Browser - Full list of databases with tables
export interface DatabaseWithTables {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  tables: Array<{
    id: number;
    name: string;
    records: number;
    icon: string;
  }>;
}

export const databasesWithTables: DatabaseWithTables[] = [
  {
    id: 1,
    name: 'crm_database',
    description: 'CRM система',
    icon: '👥',
    color: 'from-violet-500 to-purple-600',
    tables: [
      { id: 1, name: 'companies', records: 1254, icon: '🏢' },
      { id: 2, name: 'contacts', records: 3421, icon: '👤' },
      { id: 3, name: 'deals', records: 892, icon: '💼' },
      { id: 4, name: 'activities', records: 5678, icon: '📅' },
      { id: 5, name: 'notes', records: 2341, icon: '📝' },
    ],
  },
  {
    id: 2,
    name: 'project_management',
    description: 'Управління проєктами',
    icon: '📊',
    color: 'from-blue-500 to-cyan-600',
    tables: [
      { id: 6, name: 'projects', records: 847, icon: '📊' },
      { id: 7, name: 'tasks', records: 4521, icon: '✅' },
      { id: 8, name: 'milestones', records: 234, icon: '🎯' },
      { id: 9, name: 'team_members', records: 156, icon: '👥' },
      { id: 10, name: 'time_logs', records: 12456, icon: '⏱️' },
    ],
  },
  {
    id: 3,
    name: 'analytics_db',
    description: 'Аналітика',
    icon: '📈',
    color: 'from-indigo-500 to-violet-600',
    tables: [
      { id: 11, name: 'reports', records: 234, icon: '📈' },
      { id: 12, name: 'metrics', records: 567, icon: '📊' },
      { id: 13, name: 'kpis', records: 89, icon: '🎯' },
      { id: 14, name: 'dashboards', records: 45, icon: '📱' },
    ],
  },
  {
    id: 4,
    name: 'ecommerce_db',
    description: 'E-commerce',
    icon: '🛒',
    color: 'from-green-500 to-lime-600',
    tables: [
      { id: 15, name: 'products', records: 8921, icon: '📦' },
      { id: 16, name: 'orders', records: 12456, icon: '🛒' },
      { id: 17, name: 'customers', records: 3421, icon: '👤' },
      { id: 18, name: 'categories', records: 89, icon: '📂' },
      { id: 19, name: 'reviews', records: 2341, icon: '⭐' },
      { id: 20, name: 'inventory', records: 8921, icon: '📊' },
    ],
  },
];
