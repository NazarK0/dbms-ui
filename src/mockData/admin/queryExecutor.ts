/**
 * Mock Data for Query Executor
 * =============================
 * 
 * ВАЖЛИВО: Ці дані мають бути замінені на реальні API запити до бекенду.
 * Це тимчасові дані для розробки та тестування UI.
 * 
 * Backend Endpoints Required:
 * ---------------------------
 * 
 * 1. POST /api/database/:databaseId/query/execute
 *    Виконує SQL запит до вказаної бази даних
 *    Request body: { query: string, limit?: number, timeout?: number }
 *    Response: QueryResult
 * 
 * 2. GET /api/database/:databaseId/query/history
 *    Отримує історію виконаних запитів користувача
 *    Query params: ?limit=50&offset=0&status=all
 *    Response: QueryHistoryItem[]
 * 
 * 3. POST /api/database/:databaseId/query/save
 *    Зберігає запит у збережені
 *    Request body: { name: string, query: string, description?: string, tags?: string[] }
 *    Response: SavedQuery
 * 
 * 4. GET /api/database/:databaseId/query/saved
 *    Отримує список збережених запитів
 *    Query params: ?search=&tags=
 *    Response: SavedQuery[]
 * 
 * 5. DELETE /api/database/:databaseId/query/saved/:queryId
 *    Видаляє збережений запит
 *    Response: { success: boolean }
 * 
 * 6. PUT /api/database/:databaseId/query/saved/:queryId
 *    Оновлює збережений запит
 *    Request body: { name?: string, query?: string, description?: string, tags?: string[] }
 *    Response: SavedQuery
 * 
 * 7. GET /api/database/:databaseId/query/stats
 *    Отримує статистику використання редактора запитів
 *    Response: QueryStats
 */

import type { QueryHistoryItem, QueryResult, SavedQuery, QueryStats } from '../../components/admin/database-tools/query-executor/types';

/**
 * Mock історія запитів
 * TODO: Замінити на GET /api/database/:databaseId/query/history
 */
export const mockQueryHistory: QueryHistoryItem[] = [
  {
    id: 'qh-001',
    query: 'SELECT COUNT(*) FROM orders WHERE status = \'completed\'',
    time: '2024-12-14T10:45:00Z',
    duration: '12мс',
    database: 'production_db',
    status: 'success',
    rowCount: 1,
  },
  {
    id: 'qh-002',
    query: 'UPDATE users SET last_login = NOW() WHERE id = 123',
    time: '2024-12-14T10:32:00Z',
    duration: '8мс',
    database: 'production_db',
    status: 'success',
    rowCount: 1,
  },
  {
    id: 'qh-003',
    query: 'INSERT INTO logs (message, level) VALUES (\'Test\', \'INFO\')',
    time: '2024-12-14T10:15:00Z',
    duration: '5мс',
    database: 'production_db',
    status: 'success',
    rowCount: 1,
  },
  {
    id: 'qh-004',
    query: 'CREATE TABLE analytics (id SERIAL PRIMARY KEY, data JSONB)',
    time: '2024-12-14T09:58:00Z',
    duration: '145мс',
    database: 'analytics_db',
    status: 'success',
  },
  {
    id: 'qh-005',
    query: 'SELECT * FROM users WHERE email LIKE \'%@example.com\'',
    time: '2024-12-14T09:45:00Z',
    duration: '23мс',
    database: 'production_db',
    status: 'success',
    rowCount: 15,
  },
  {
    id: 'qh-006',
    query: 'DELETE FROM temp_data WHERE created_at < NOW() - INTERVAL \'7 days\'',
    time: '2024-12-14T09:30:00Z',
    duration: '342мс',
    database: 'production_db',
    status: 'success',
    rowCount: 127,
  },
  {
    id: 'qh-007',
    query: 'SELECT id, username FROM non_existent_table',
    time: '2024-12-14T09:15:00Z',
    duration: '5мс',
    database: 'production_db',
    status: 'error',
    error: 'relation "non_existent_table" does not exist',
  },
];

/**
 * Mock результати виконання запиту
 * TODO: Замінити на POST /api/database/:databaseId/query/execute
 */
export const mockQueryResult: QueryResult = {
  columns: ['id', 'username', 'email', 'created_at', 'status'],
  rows: [
    [1, 'john_doe', 'john@example.com', '2024-01-15 10:30:00', 'active'],
    [2, 'jane_smith', 'jane@example.com', '2024-01-16 14:22:00', 'active'],
    [3, 'bob_wilson', 'bob@example.com', '2024-01-17 09:15:00', 'inactive'],
    [4, 'alice_brown', 'alice@example.com', '2024-01-18 16:45:00', 'active'],
    [5, 'charlie_davis', 'charlie@example.com', '2024-01-19 11:20:00', 'active'],
    [6, 'diana_miller', 'diana@example.com', '2024-01-20 13:10:00', 'active'],
    [7, 'edward_jones', 'edward@example.com', '2024-01-21 15:35:00', 'inactive'],
    [8, 'fiona_taylor', 'fiona@example.com', '2024-01-22 11:55:00', 'active'],
  ],
  rowCount: 8,
  executionTime: '15мс',
  queryType: 'SELECT',
};

/**
 * Mock збережені запити
 * TODO: Замінити на GET /api/database/:databaseId/query/saved
 */
export const mockSavedQueries: SavedQuery[] = [
  {
    id: 'sq-001',
    name: 'Активні користувачі за останній місяць',
    query: 'SELECT * FROM users WHERE status = \'active\' AND created_at > NOW() - INTERVAL \'1 month\' ORDER BY created_at DESC',
    description: 'Показує всіх активних користувачів, які зареєструвалися за останній місяць',
    createdAt: '2024-11-15T10:00:00Z',
    updatedAt: '2024-12-01T14:30:00Z',
    tags: ['users', 'active', 'monthly'],
    createdBy: 'admin-001',
  },
  {
    id: 'sq-002',
    name: 'Статистика замовлень',
    query: 'SELECT status, COUNT(*) as count, SUM(total_amount) as total FROM orders GROUP BY status',
    description: 'Агрегована статистика замовлень за статусами',
    createdAt: '2024-11-20T09:00:00Z',
    updatedAt: '2024-11-20T09:00:00Z',
    tags: ['orders', 'statistics', 'analytics'],
    createdBy: 'admin-001',
  },
  {
    id: 'sq-003',
    name: 'Топ 10 продуктів',
    query: 'SELECT p.name, COUNT(oi.id) as sales FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id ORDER BY sales DESC LIMIT 10',
    description: 'Найпопулярніші 10 продуктів за кількістю продажів',
    createdAt: '2024-11-25T16:00:00Z',
    updatedAt: '2024-12-05T11:20:00Z',
    tags: ['products', 'top', 'sales'],
    createdBy: 'admin-001',
  },
  {
    id: 'sq-004',
    name: 'Очищення старих логів',
    query: 'DELETE FROM logs WHERE created_at < NOW() - INTERVAL \'30 days\'',
    description: 'Видаляє логи старші за 30 днів',
    createdAt: '2024-10-10T08:00:00Z',
    updatedAt: '2024-10-10T08:00:00Z',
    tags: ['maintenance', 'logs', 'cleanup'],
    createdBy: 'admin-001',
  },
  {
    id: 'sq-005',
    name: 'Дублікати email',
    query: 'SELECT email, COUNT(*) as count FROM users GROUP BY email HAVING COUNT(*) > 1',
    description: 'Знаходить дублікати email адрес у таблиці користувачів',
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z',
    tags: ['users', 'duplicates', 'data-quality'],
    createdBy: 'admin-001',
  },
];

/**
 * Mock статистика запитів
 * TODO: Замінити на GET /api/database/:databaseId/query/stats
 */
export const mockQueryStats: QueryStats = {
  totalQueries: 1547,
  successfulQueries: 1489,
  failedQueries: 58,
  averageExecutionTime: 45.7, // в мілісекундах
  mostUsedTables: ['users', 'orders', 'products', 'logs', 'sessions'],
};