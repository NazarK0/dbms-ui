// CLI Mock Data

export interface CommandHistory {
  id: string;
  command: string;
  output: string;
  timestamp: string;
  status: 'success' | 'error';
  executionTime: string;
}

export interface SavedCommand {
  id: string;
  cmd: string;
  desc: string;
  isCustom: boolean;
}

export interface SavedExample {
  id: string;
  title: string;
  query: string;
  isCustom: boolean;
}

export const welcomeMessage = {
  version: 'psql (PostgreSQL) 16.1',
  helpText: 'Введіть "help" для довідки.',
  navigationText: 'Введіть "\\?" для переліку всіх команд psql.'
};

export const terminalPrompt = 'postgres=#';

export const initialCommandHistory: CommandHistory[] = [
  {
    id: '1',
    command: '\\l',
    output: `                                  List of databases
   Name    |  Owner   | Encoding |   Collate   |    Ctype    |   Access privileges   
-----------+----------+----------+-------------+-------------+-----------------------
 postgres  | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 template0 | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
           |          |          |             |             | postgres=CTc/postgres
 template1 | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
           |          |          |             |             | postgres=CTc/postgres
 production| postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
(4 rows)`,
    timestamp: '14:23:45',
    status: 'success',
    executionTime: '8ms'
  },
  {
    id: '2',
    command: 'SELECT version();',
    output: `                                                 version                                                  
----------------------------------------------------------------------------------------------------------
 PostgreSQL 16.1 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 13.2.0, 64-bit
(1 row)`,
    timestamp: '14:24:12',
    status: 'success',
    executionTime: '3ms'
  },
];

export const defaultCommonCommands: SavedCommand[] = [
  { id: '1', cmd: '\\l', desc: 'Список баз даних', isCustom: false },
  { id: '2', cmd: '\\dt', desc: 'Список таблиць', isCustom: false },
  { id: '3', cmd: '\\du', desc: 'Список користувачів', isCustom: false },
  { id: '4', cmd: '\\d table_name', desc: 'Опис таблиці', isCustom: false },
  { id: '5', cmd: '\\df', desc: 'Список функцій', isCustom: false },
  { id: '6', cmd: '\\di', desc: 'Список індексів', isCustom: false },
  { id: '7', cmd: '\\dv', desc: 'Список представлень', isCustom: false },
  { id: '8', cmd: '\\timing', desc: 'Увімкнути/вимкнути вимірювання часу', isCustom: false },
  { id: '9', cmd: 'SELECT version();', desc: 'Версія PostgreSQL', isCustom: false },
  { id: '10', cmd: 'SELECT current_database();', desc: 'Поточна БД', isCustom: false },
];

export const defaultSQLExamples: SavedExample[] = [
  {
    id: '1',
    title: 'Базова вибірка',
    query: "SELECT * FROM users WHERE status = 'active' LIMIT 10;",
    isCustom: false
  },
  {
    id: '2',
    title: "З'єднання таблиць",
    query: "SELECT u.name, o.total FROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE o.created_at > NOW() - INTERVAL '7 days';",
    isCustom: false
  },
  {
    id: '3',
    title: 'Агрегація даних',
    query: "SELECT \n  DATE(created_at) as date,\n  COUNT(*) as order_count,\n  SUM(total) as daily_total\nFROM orders\nGROUP BY DATE(created_at)\nORDER BY date DESC;",
    isCustom: false
  },
  {
    id: '4',
    title: 'Оновлення записів',
    query: "UPDATE products\nSET price = price * 1.1\nWHERE category = 'electronics'\nRETURNING id, name, price;",
    isCustom: false
  },
  {
    id: '5',
    title: 'Складний підзапит',
    query: "SELECT \n  u.name,\n  u.email,\n  (SELECT COUNT(*) FROM orders WHERE user_id = u.id) as order_count\nFROM users u\nWHERE u.id IN (\n  SELECT DISTINCT user_id FROM orders\n  WHERE created_at > NOW() - INTERVAL '30 days'\n);",
    isCustom: false
  },
  {
    id: '6',
    title: 'Створення індексу',
    query: "CREATE INDEX idx_users_email ON users(email);\nCREATE INDEX idx_orders_user_created ON orders(user_id, created_at);",
    isCustom: false
  },
  {
    id: '7',
    title: 'Window функції',
    query: "SELECT \n  name,\n  department,\n  salary,\n  AVG(salary) OVER (PARTITION BY department) as dept_avg,\n  RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank\nFROM employees;",
    isCustom: false
  },
  {
    id: '8',
    title: 'CTE (Common Table Expression)',
    query: "WITH monthly_sales AS (\n  SELECT \n    DATE_TRUNC('month', created_at) as month,\n    SUM(total) as total_sales\n  FROM orders\n  GROUP BY month\n)\nSELECT \n  month,\n  total_sales,\n  LAG(total_sales) OVER (ORDER BY month) as prev_month,\n  total_sales - LAG(total_sales) OVER (ORDER BY month) as growth\nFROM monthly_sales;",
    isCustom: false
  },
];