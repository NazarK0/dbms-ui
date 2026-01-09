/**
 * Validators for Table Browser
 * 
 * Функції для валідації імен таблиць та інших правил PostgreSQL
 */

/**
 * Validate table name
 * 
 * @param name - Table name to validate
 * @returns True if name follows PostgreSQL naming rules
 * 
 * @description
 * PostgreSQL table name rules:
 * - Must start with a letter (a-z, A-Z) or underscore (_)
 * - Can contain letters, numbers, and underscores
 * - Maximum length: 63 characters (not checked here)
 * - Case-insensitive (PostgreSQL folds to lowercase unless quoted)
 * 
 * @example
 * ```typescript
 * isValidTableName('users');         // true
 * isValidTableName('user_profiles'); // true
 * isValidTableName('_temp');         // true
 * isValidTableName('123_invalid');   // false - starts with number
 * isValidTableName('user-profiles'); // false - contains hyphen
 * isValidTableName('user profiles'); // false - contains space
 * ```
 */
export const isValidTableName = (name: string): boolean => {
  // PostgreSQL table name rules
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
};
