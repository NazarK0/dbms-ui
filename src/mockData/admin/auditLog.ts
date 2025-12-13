// Audit Log Mock Data

export type ActionType = 'create' | 'update' | 'delete' | 'select' | 'grant' | 'revoke' | 'login' | 'backup';

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: ActionType;
  category: string;
  target: string;
  details: string;
  ip: string;
  status: 'success' | 'failed';
}

export const auditEntries: AuditEntry[] = [
  {
    id: '1',
    timestamp: '2024-12-12 14:23:15',
    user: 'admin',
    action: 'create',
    category: 'База даних',
    target: 'production_v2',
    details: 'Створено нову базу даних з кодуванням UTF-8',
    ip: '192.168.1.100',
    status: 'success',
  },
  {
    id: '2',
    timestamp: '2024-12-12 14:15:42',
    user: 'developer',
    action: 'update',
    category: 'Таблиця',
    target: 'users.email',
    details: 'Змінено тип поля з VARCHAR(255) на TEXT',
    ip: '192.168.1.105',
    status: 'success',
  },
  {
    id: '3',
    timestamp: '2024-12-12 14:08:33',
    user: 'analyst',
    action: 'select',
    category: 'Запит',
    target: 'SELECT * FROM orders',
    details: 'Виконано SELECT запит, повернуто 1523 рядки',
    ip: '192.168.1.110',
    status: 'success',
  },
  {
    id: '4',
    timestamp: '2024-12-12 13:55:19',
    user: 'admin',
    action: 'grant',
    category: 'Права доступу',
    target: 'developer → staging_db',
    details: 'Надано права SELECT, INSERT, UPDATE на staging_db',
    ip: '192.168.1.100',
    status: 'success',
  },
  {
    id: '5',
    timestamp: '2024-12-12 13:42:07',
    user: 'app_user',
    action: 'delete',
    category: 'Таблиця',
    target: 'temp_cache',
    details: 'Видалено 342 застарілих записів з таблиці',
    ip: '10.0.0.45',
    status: 'success',
  },
  {
    id: '6',
    timestamp: '2024-12-12 13:30:25',
    user: 'backup_service',
    action: 'backup',
    category: 'Резервна копія',
    target: 'production_db',
    details: 'Створено повну резервну копію (2.3 GB)',
    ip: '10.0.0.50',
    status: 'success',
  },
  {
    id: '7',
    timestamp: '2024-12-12 13:15:52',
    user: 'developer',
    action: 'create',
    category: 'Функція',
    target: 'calculate_order_total()',
    details: 'Створено PL/pgSQL функцію для розрахунку суми замовлень',
    ip: '192.168.1.105',
    status: 'success',
  },
  {
    id: '8',
    timestamp: '2024-12-12 12:58:41',
    user: 'developer',
    action: 'delete',
    category: 'База даних',
    target: 'test_old',
    details: 'Спроба видалення бази даних (відмовлено - активні підключення)',
    ip: '192.168.1.105',
    status: 'failed',
  },
  {
    id: '9',
    timestamp: '2024-12-12 12:45:18',
    user: 'admin',
    action: 'create',
    category: 'Користувач',
    target: 'new_analyst',
    details: 'Створено нового користувача з роллю Analyst',
    ip: '192.168.1.100',
    status: 'success',
  },
  {
    id: '10',
    timestamp: '2024-12-12 12:30:09',
    user: 'analyst',
    action: 'login',
    category: 'Автентифікація',
    target: 'PostgreSQL Server',
    details: 'Успішний вхід в систему',
    ip: '192.168.1.110',
    status: 'success',
  },
  {
    id: '11',
    timestamp: '2024-12-12 12:15:33',
    user: 'developer',
    action: 'create',
    category: 'Тригер',
    target: 'before_user_update',
    details: 'Створено тригер для валідації даних перед оновленням',
    ip: '192.168.1.105',
    status: 'success',
  },
  {
    id: '12',
    timestamp: '2024-12-12 11:58:22',
    user: 'admin',
    action: 'revoke',
    category: 'Права доступу',
    target: 'temp_user → production_db',
    details: 'Відкликано всі права доступу до production_db',
    ip: '192.168.1.100',
    status: 'success',
  },
];
