/**
 * Query Type Detection Utilities
 * ===============================
 * 
 * Функції для визначення типу SQL запиту.
 */

/**
 * SQL Query Types
 */
export type QueryType = 
  | 'SELECT' 
  | 'INSERT' 
  | 'UPDATE' 
  | 'DELETE' 
  | 'CREATE' 
  | 'DROP' 
  | 'ALTER' 
  | 'OTHER';

/**
 * Визначає тип SQL запиту на основі першого ключового слова
 * 
 * @param query - SQL запит для аналізу
 * @returns Тип запиту (SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER, OTHER)
 * 
 * @example
 * ```typescript
 * detectQueryType('SELECT * FROM users'); // 'SELECT'
 * detectQueryType('INSERT INTO users VALUES (...)'); // 'INSERT'
 * detectQueryType('-- Comment\nSELECT * FROM orders'); // 'SELECT'
 * ```
 */
export function detectQueryType(query: string): QueryType {
  const trimmedQuery = query.trim().toUpperCase();
  
  if (trimmedQuery.startsWith('SELECT')) return 'SELECT';
  if (trimmedQuery.startsWith('INSERT')) return 'INSERT';
  if (trimmedQuery.startsWith('UPDATE')) return 'UPDATE';
  if (trimmedQuery.startsWith('DELETE')) return 'DELETE';
  if (trimmedQuery.startsWith('CREATE')) return 'CREATE';
  if (trimmedQuery.startsWith('DROP')) return 'DROP';
  if (trimmedQuery.startsWith('ALTER')) return 'ALTER';
  
  return 'OTHER';
}

/**
 * Перевіряє чи є запит запитом на читання (не змінює дані)
 * 
 * @param query - SQL запит для перевірки
 * @returns true якщо запит тільки читає дані
 * 
 * @example
 * ```typescript
 * isReadOnlyQuery('SELECT * FROM users'); // true
 * isReadOnlyQuery('INSERT INTO users ...'); // false
 * ```
 */
export function isReadOnlyQuery(query: string): boolean {
  const queryType = detectQueryType(query);
  return queryType === 'SELECT';
}

/**
 * Перевіряє чи змінює запит дані
 * 
 * @param query - SQL запит для перевірки
 * @returns true якщо запит змінює дані (INSERT, UPDATE, DELETE)
 * 
 * @example
 * ```typescript
 * isDataModificationQuery('UPDATE users SET ...'); // true
 * isDataModificationQuery('SELECT * FROM users'); // false
 * ```
 */
export function isDataModificationQuery(query: string): boolean {
  const queryType = detectQueryType(query);
  return ['INSERT', 'UPDATE', 'DELETE'].includes(queryType);
}

/**
 * Перевіряє чи змінює запит схему БД
 * 
 * @param query - SQL запит для перевірки
 * @returns true якщо запит змінює схему (CREATE, DROP, ALTER)
 * 
 * @example
 * ```typescript
 * isSchemaModificationQuery('CREATE TABLE users ...'); // true
 * isSchemaModificationQuery('SELECT * FROM users'); // false
 * ```
 */
export function isSchemaModificationQuery(query: string): boolean {
  const queryType = detectQueryType(query);
  return ['CREATE', 'DROP', 'ALTER'].includes(queryType);
}
