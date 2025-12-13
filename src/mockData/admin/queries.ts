// Mock data for SQL queries (Admin)

export interface QueryHistoryItem {
  query: string;
  time: string;
  duration: string;
}

export interface QueryResult {
  columns: string[];
  rows: any[][];
  rowCount: number;
  executionTime: string;
}

export const queryHistory: QueryHistoryItem[] = [
  { query: 'SELECT COUNT(*) FROM orders WHERE status = \'completed\'', time: '10:45 AM', duration: '12мс' },
  { query: 'UPDATE users SET last_login = NOW() WHERE id = 123', time: '10:32 AM', duration: '8мс' },
  { query: 'INSERT INTO logs (message, level) VALUES (\'Test\', \'INFO\')', time: '10:15 AM', duration: '5мс' },
  { query: 'CREATE TABLE analytics (id SERIAL PRIMARY KEY, data JSONB)', time: '09:58 AM', duration: '145мс' },
];

export const sampleQueryResult: QueryResult = {
  columns: ['id', 'username', 'email', 'created_at', 'status'],
  rows: [
    [1, 'john_doe', 'john@example.com', '2024-01-15 10:30:00', 'active'],
    [2, 'jane_smith', 'jane@example.com', '2024-01-16 14:22:00', 'active'],
    [3, 'bob_wilson', 'bob@example.com', '2024-01-17 09:15:00', 'inactive'],
    [4, 'alice_brown', 'alice@example.com', '2024-01-18 16:45:00', 'active'],
    [5, 'charlie_davis', 'charlie@example.com', '2024-01-19 11:20:00', 'active'],
  ],
  rowCount: 5,
  executionTime: '15мс',
};
