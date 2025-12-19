/**
 * Type Definitions for Query Executor
 * ====================================
 * 
 * Типи даних для компонента виконання SQL запитів.
 * Описує структури запитів, результатів та історії.
 */

/**
 * Результат виконання SQL запиту
 */
export interface QueryResult {
  /** Назви стовпців */
  columns: string[];
  /** Дані рядків */
  rows: any[][];
  /** Кількість повернутих рядків */
  rowCount: number;
  /** Час виконання запиту */
  executionTime: string;
  /** Тип операції (SELECT, INSERT, UPDATE, DELETE, CREATE, DROP тощо) */
  queryType?: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'CREATE' | 'DROP' | 'ALTER' | 'OTHER';
  /** Кількість порушених рядків (для INSERT/UPDATE/DELETE) */
  affectedRows?: number;
  /** Повідомлення про результат виконання */
  message?: string;
}

/**
 * Запис з історії запитів
 */
export interface QueryHistoryItem {
  /** Унікальний ідентифікатор запису */
  id: string;
  /** SQL запит */
  query: string;
  /** Час виконання */
  time: string;
  /** Тривалість виконання */
  duration: string;
  /** База даних де виконувався запит */
  database?: string;
  /** Статус виконання */
  status: 'success' | 'error';
  /** Повідомлення про помилку (якщо status === 'error') */
  error?: string;
  /** Кількість порушених рядків */
  rowCount?: number;
}

/**
 * Збережений запит
 */
export interface SavedQuery {
  /** Унікальний ідентифікатор */
  id: string;
  /** Назва запиту */
  name: string;
  /** SQL запит */
  query: string;
  /** Опис запиту */
  description?: string;
  /** Дата створення */
  createdAt: string;
  /** Дата останнього редагування */
  updatedAt: string;
  /** Теги для категоризації */
  tags?: string[];
  /** ID користувача який створив */
  createdBy?: string;
}

/**
 * Помилка виконання запиту
 */
export interface QueryError {
  /** Повідомлення про помилку */
  message: string;
  /** Тип помилки */
  type: 'syntax' | 'permission' | 'connection' | 'timeout' | 'other';
  /** Позиція помилки в запиті (якщо доступно) */
  position?: number;
  /** Деталі помилки */
  details?: string;
  /** Код помилки PostgreSQL */
  code?: string;
}

/**
 * Параметри виконання запиту
 */
export interface QueryExecutionParams {
  /** SQL запит для виконання */
  query: string;
  /** ID бази даних */
  databaseId: string;
  /** Максимальна кількість рядків для повернення */
  limit?: number;
  /** Таймаут виконання в мілісекундах */
  timeout?: number;
}

/**
 * Статистика використання редактора запитів
 */
export interface QueryStats {
  /** Загальна кількість виконаних запитів */
  totalQueries: number;
  /** Кількість успішних запитів */
  successfulQueries: number;
  /** Кількість невдалих запитів */
  failedQueries: number;
  /** Середній час виконання */
  averageExecutionTime: number;
  /** Найчастіше використовувані таблиці */
  mostUsedTables: string[];
}