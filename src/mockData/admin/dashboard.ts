// Mock data for admin dashboard (Admin)

import { Database, Users, Table2, HardDrive, UserCog } from 'lucide-react';

// Dashboard Card Configuration
export interface DashboardCard {
  id: string;
  name: string;
  description: string;
  visible: boolean;
  category: 'stats' | 'performance' | 'activity';
}

export const defaultDashboardCards: DashboardCard[] = [
  { id: 'databases', name: 'Всього баз даних', description: 'Кількість баз даних у системі', visible: true, category: 'stats' },
  { id: 'admins', name: 'Адміністраторів', description: 'Кількість адміністраторів системи', visible: true, category: 'stats' },
  { id: 'users', name: 'Користувачів', description: 'Кількість звичайних користувачів', visible: true, category: 'stats' },
  { id: 'tables', name: 'Всього таблиць', description: 'Загальна кількість таблиць', visible: true, category: 'stats' },
  { id: 'storage', name: 'Використано сховища', description: 'Використаний дисковий простір', visible: true, category: 'stats' },
  { id: 'performance', name: 'Огляд продуктивності', description: 'Ключові метрики продуктивності', visible: true, category: 'performance' },
  { id: 'activity', name: 'Остання активність', description: 'Нещодавні події системи', visible: true, category: 'activity' },
  { id: 'connections', name: 'Активні з\'єднання', description: 'Поточні підключення', visible: true, category: 'activity' },
];

export const statsData = [
  { id: 'databases', label: 'Всього баз даних', value: '12', icon: Database, color: 'from-lime-500 to-green-600', change: '+2', trend: 'up' as const },
  { id: 'admins', label: 'Адміністраторів', value: '8', icon: UserCog, color: 'from-lime-600 to-green-500', change: '+1', trend: 'up' as const },
  { id: 'users', label: 'Користувачів', value: '39', icon: Users, color: 'from-violet-500 to-purple-600', change: '+4', trend: 'up' as const },
  { id: 'tables', label: 'Всього таблиць', value: '248', icon: Table2, color: 'from-yellow-500 to-lime-600', change: '+12', trend: 'up' as const },
  { id: 'storage', label: 'Використано сховища', value: '3.2 ГБ', icon: HardDrive, color: 'from-lime-600 to-yellow-600', change: '-0.4 ГБ', trend: 'down' as const },
];

export const recentActivity = [
  { action: 'База даних створена', details: 'production_db', user: 'admin', time: '2 хвилини тому', type: 'success' as const },
  { action: 'Користувач створений', details: 'developer_user', user: 'root', time: '15 хвилин тому', type: 'info' as const },
  { action: 'Таблицю змінено', details: 'users.customers', user: 'admin', time: '1 годину тому', type: 'warning' as const },
  { action: 'Резервне копіювання завершено', details: 'staging_db', user: 'system', time: '2 години тому', type: 'success' as const },
  { action: 'Запит виконано', details: 'SELECT * FROM orders', user: 'analyst', time: '3 години тому', type: 'info' as const },
];

export const activeConnections = [
  { database: 'production_db', user: 'app_user', state: 'активний', duration: '00:45:32', queries: 1234 },
  { database: 'analytics_db', user: 'analyst', state: 'очікує', duration: '01:23:45', queries: 45 },
  { database: 'staging_db', user: 'developer', state: 'активний', duration: '00:12:18', queries: 678 },
  { database: 'production_db', user: 'api_service', state: 'активний', duration: '05:34:21', queries: 8921 },
];

export const performanceMetrics = [
  { label: 'CPU', value: 45, color: 'lime' },
  { label: 'Memory', value: 68, color: 'yellow' },
  { label: 'Disk I/O', value: 32, color: 'green' },
  { label: 'Network', value: 28, color: 'blue' },
];