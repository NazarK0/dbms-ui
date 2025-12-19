/**
 * Query Validation Utilities
 * ===========================
 * 
 * Функції для валідації SQL запитів та перевірки безпеки.
 */

/**
 * Результат валідації запиту
 */
export interface QueryValidationResult {
  /** Чи валідний запит */
  valid: boolean;
  /** Повідомлення про помилку (якщо є) */
  error?: string;
}

/**
 * Валідує SQL запит перед виконанням
 * 
 * @param query - SQL запит для валідації
 * @returns Об'єкт з результатом валідації та можливою помилкою
 * 
 * @example
 * ```typescript
 * validateQuery(''); 
 * // { valid: false, error: 'Запит не може бути порожнім' }
 * 
 * validateQuery('SELECT * FROM users'); 
 * // { valid: true }
 * 
 * validateQuery('SELECT ( FROM users'); 
 * // { valid: false, error: 'Незбалансовані дужки в запиті' }
 * ```
 */
export function validateQuery(query: string): QueryValidationResult {
  const trimmedQuery = query.trim();
  
  // Перевірка на порожній запит
  if (!trimmedQuery) {
    return { valid: false, error: 'Запит не може бути порожнім' };
  }
  
  // Перевірка на максимальну довжину
  if (trimmedQuery.length > 10000) {
    return { valid: false, error: 'Запит занадто довгий (максимум 10000 символів)' };
  }
  
  // Перевірка на збалансованість дужок
  const openParens = (trimmedQuery.match(/\(/g) || []).length;
  const closeParens = (trimmedQuery.match(/\)/g) || []).length;
  
  if (openParens !== closeParens) {
    return { valid: false, error: 'Незбалансовані дужки в запиті' };
  }
  
  // Перевірка на збалансованість лапок
  const singleQuotes = (trimmedQuery.match(/'/g) || []).length;
  const doubleQuotes = (trimmedQuery.match(/"/g) || []).length;
  
  if (singleQuotes % 2 !== 0) {
    return { valid: false, error: 'Незбалансовані одинарні лапки в запиті' };
  }
  
  if (doubleQuotes % 2 !== 0) {
    return { valid: false, error: 'Незбалансовані подвійні лапки в запиті' };
  }
  
  return { valid: true };
}

/**
 * Перевіряє чи є запит небезпечним (може видалити або змінити дані)
 * 
 * @param query - SQL запит для перевірки
 * @returns true якщо запит містить небезпечні операції
 * 
 * @example
 * ```typescript
 * isDangerousQuery('SELECT * FROM users'); // false
 * isDangerousQuery('DELETE FROM users'); // true
 * isDangerousQuery('DROP TABLE users'); // true
 * isDangerousQuery('UPDATE users SET name = "test"'); // true
 * ```
 */
export function isDangerousQuery(query: string): boolean {
  const trimmedQuery = query.trim().toUpperCase();
  
  const dangerousKeywords = [
    'DROP DATABASE',
    'DROP TABLE',
    'TRUNCATE',
    'DELETE FROM',
    'UPDATE',
  ];
  
  return dangerousKeywords.some(keyword => trimmedQuery.includes(keyword));
}

/**
 * Список дуже небезпечних операцій (незворотні зміни)
 */
const CRITICAL_KEYWORDS = [
  'DROP DATABASE',
  'DROP TABLE',
  'TRUNCATE',
  'DROP INDEX',
  'DROP VIEW',
];

/**
 * Перевіряє чи містить запит критично небезпечні операції
 * 
 * @param query - SQL запит для перевірки
 * @returns true якщо запит містить критично небезпечні операції
 * 
 * @example
 * ```typescript
 * isCriticalQuery('DELETE FROM users'); // false (можна відновити)
 * isCriticalQuery('DROP TABLE users'); // true (незворотньо)
 * isCriticalQuery('TRUNCATE users'); // true (незворотньо)
 * ```
 */
export function isCriticalQuery(query: string): boolean {
  const trimmedQuery = query.trim().toUpperCase();
  return CRITICAL_KEYWORDS.some(keyword => trimmedQuery.includes(keyword));
}

/**
 * Перевіряє чи має запит WHERE clause (для UPDATE/DELETE)
 * 
 * @param query - SQL запит для перевірки
 * @returns true якщо запит має WHERE clause
 * 
 * @example
 * ```typescript
 * hasWhereClause('DELETE FROM users'); // false (небезпечно!)
 * hasWhereClause('DELETE FROM users WHERE id = 1'); // true (безпечніше)
 * hasWhereClause('UPDATE users SET name = "test"'); // false
 * hasWhereClause('UPDATE users SET name = "test" WHERE id = 1'); // true
 * ```
 */
export function hasWhereClause(query: string): boolean {
  const trimmedQuery = query.trim().toUpperCase();
  return trimmedQuery.includes('WHERE');
}

/**
 * Перевіряє чи є UPDATE/DELETE без WHERE (дуже небезпечно)
 * 
 * @param query - SQL запит для перевірки
 * @returns true якщо це UPDATE/DELETE без WHERE clause
 * 
 * @example
 * ```typescript
 * isUnconditionalModification('DELETE FROM users'); // true (видалить ВСІ рядки!)
 * isUnconditionalModification('DELETE FROM users WHERE id = 1'); // false
 * isUnconditionalModification('UPDATE users SET active = false'); // true
 * isUnconditionalModification('SELECT * FROM users'); // false
 * ```
 */
export function isUnconditionalModification(query: string): boolean {
  const trimmedQuery = query.trim().toUpperCase();
  
  const isUpdate = trimmedQuery.startsWith('UPDATE');
  const isDelete = trimmedQuery.startsWith('DELETE');
  const hasWhere = hasWhereClause(query);
  
  return (isUpdate || isDelete) && !hasWhere;
}

/**
 * Отримує рівень небезпеки запиту
 * 
 * @param query - SQL запит для аналізу
 * @returns Рівень небезпеки: 'safe', 'warning', 'danger', 'critical'
 * 
 * @example
 * ```typescript
 * getQueryDangerLevel('SELECT * FROM users'); // 'safe'
 * getQueryDangerLevel('UPDATE users SET active = true WHERE id = 1'); // 'warning'
 * getQueryDangerLevel('DELETE FROM users'); // 'danger' (без WHERE)
 * getQueryDangerLevel('DROP TABLE users'); // 'critical'
 * ```
 */
export function getQueryDangerLevel(
  query: string
): 'safe' | 'warning' | 'danger' | 'critical' {
  // Critical операції (незворотні)
  if (isCriticalQuery(query)) {
    return 'critical';
  }
  
  // Небезпечні операції без WHERE
  if (isUnconditionalModification(query)) {
    return 'danger';
  }
  
  // Будь-які операції зміни даних
  if (isDangerousQuery(query)) {
    return 'warning';
  }
  
  // SELECT та інші безпечні запити
  return 'safe';
}
