/**
 * Mock data for CLI components
 */

import type { CommandHistory, SavedCommand, SavedExample } from './types';

export const initialHistory: CommandHistory[] = [
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
    executionTime: '8ms',
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
    executionTime: '3ms',
  },
];

export const defaultCommonCommands: SavedCommand[] = [
  { id: '1', cmd: '\\l', desc: 'Список баз даних', isCustom: false },
  { id: '2', cmd: '\\dt', desc: 'Список таблиць', isCustom: false },
  { id: '3', cmd: '\\du', desc: 'Список користувачів', isCustom: false },
  { id: '4', cmd: '\\d table_name', desc: 'Опис таблиці', isCustom: false },
  { id: '5', cmd: '\\c database_name', desc: 'Підключитись до БД', isCustom: false },
  { id: '6', cmd: '\\q', desc: 'Вийти з psql', isCustom: false },
  { id: '7', cmd: 'SELECT version();', desc: 'Версія PostgreSQL', isCustom: false },
  { id: '8', cmd: 'SELECT current_database();', desc: 'Поточна база даних', isCustom: false },
  { id: '9', cmd: 'SHOW all;', desc: 'Всі параметри', isCustom: false },
  { id: '10', cmd: '\\x', desc: 'Розширений вивід', isCustom: false },
];

export const defaultSQLExamples: SavedExample[] = [
  {
    id: '1',
    title: 'Перевірка розміру баз даних',
    query: "SELECT pg_database.datname, pg_size_pretty(pg_database_size(pg_database.datname)) AS size FROM pg_database ORDER BY pg_database_size(pg_database.datname) DESC;",
    isCustom: false,
  },
  {
    id: '2',
    title: 'Активні підключення',
    query: "SELECT pid, usename, application_name, client_addr, state, query_start FROM pg_stat_activity WHERE state = 'active';",
    isCustom: false,
  },
  {
    id: '3',
    title: 'Розмір таблиць',
    query: "SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size FROM pg_tables ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC LIMIT 10;",
    isCustom: false,
  },
  {
    id: '4',
    title: 'Індекси без використання',
    query: "SELECT schemaname, tablename, indexname FROM pg_stat_user_indexes WHERE idx_scan = 0 ORDER BY schemaname, tablename;",
    isCustom: false,
  },
];

export const welcomeMessage = {
  version: 'PostgreSQL 16.1 - Інтерактивний термінал',
  helpText: 'Введіть "\\?" для довідки або команду SQL для виконання.',
  navigationText: 'Використовуйте ↑/↓ для навігації по історії команд.',
};

export const terminalPrompt = 'postgres=#';

export const keyboardShortcuts = [
  { key: 'Enter', description: 'Виконати команду', action: 'execute' },
  { key: '↑', description: 'Попередня команда', action: 'history-prev' },
  { key: '↓', description: 'Наступна команда', action: 'history-next' },
  { key: 'Ctrl+L', description: 'Очистити екран', action: 'clear' },
  { key: 'Tab', description: 'Автодоповнення', action: 'autocomplete' },
];

export const psqlCommands = [
  { command: '\\l', description: 'List databases', category: 'database' },
  { command: '\\dt', description: 'List tables', category: 'table' },
  { command: '\\du', description: 'List users', category: 'user' },
  { command: '\\d [table]', description: 'Describe table', category: 'table' },
  { command: '\\c [database]', description: 'Connect to database', category: 'database' },
  { command: '\\di', description: 'List indexes', category: 'index' },
  { command: '\\dv', description: 'List views', category: 'view' },
  { command: '\\df', description: 'List functions', category: 'function' },
  { command: '\\dn', description: 'List schemas', category: 'schema' },
  { command: '\\x', description: 'Toggle expanded output', category: 'display' },
  { command: '\\q', description: 'Quit psql', category: 'system' },
  { command: '\\?', description: 'Show help', category: 'help' },
];

export const sqlKeywords = [
  'SELECT',
  'FROM',
  'WHERE',
  'INSERT',
  'UPDATE',
  'DELETE',
  'CREATE',
  'DROP',
  'ALTER',
  'TABLE',
  'INDEX',
  'VIEW',
  'FUNCTION',
  'TRIGGER',
  'DATABASE',
  'SCHEMA',
  'USER',
  'ROLE',
  'GRANT',
  'REVOKE',
  'JOIN',
  'LEFT',
  'RIGHT',
  'INNER',
  'OUTER',
  'ON',
  'AND',
  'OR',
  'NOT',
  'NULL',
  'IS',
  'IN',
  'BETWEEN',
  'LIKE',
  'ORDER',
  'BY',
  'GROUP',
  'HAVING',
  'LIMIT',
  'OFFSET',
];

export const mockDatabases = [
  { name: 'postgres', owner: 'postgres', encoding: 'UTF8' },
  { name: 'production', owner: 'postgres', encoding: 'UTF8' },
  { name: 'staging', owner: 'postgres', encoding: 'UTF8' },
  { name: 'development', owner: 'postgres', encoding: 'UTF8' },
];

export const mockTables = [
  { schema: 'public', name: 'users', type: 'table', owner: 'postgres' },
  { schema: 'public', name: 'orders', type: 'table', owner: 'postgres' },
  { schema: 'public', name: 'products', type: 'table', owner: 'postgres' },
  { schema: 'public', name: 'categories', type: 'table', owner: 'postgres' },
];

export const mockRoles = [
  { name: 'admin', attributes: 'Superuser, Create role, Create DB', memberOf: '{}' },
  { name: 'developer', attributes: 'Create DB', memberOf: '{}' },
  { name: 'postgres', attributes: 'Superuser, Create role, Create DB, Replication, Bypass RLS', memberOf: '{}' },
  { name: 'readonly', attributes: '', memberOf: '{}' },
];

export const mockVersion = {
  full: 'PostgreSQL 16.1 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 13.2.0, 64-bit',
  major: 16,
  minor: 1,
  patch: 0,
};
