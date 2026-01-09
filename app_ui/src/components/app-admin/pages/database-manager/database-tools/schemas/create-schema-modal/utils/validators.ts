/**
 * Create Schema Modal - Validators
 * =================================
 * 
 * Функції для валідації форми створення схеми.
 * Перевіряють коректність введених даних згідно з правилами PostgreSQL.
 */

import { SchemaFormData } from '../types';

/**
 * Validates if the form data is complete and valid for submission
 * @param data - Schema form data to validate
 * @returns true if valid, false otherwise
 */
export const validateSchemaForm = (data: SchemaFormData): boolean => {
  return Boolean(data.schemaName.trim());
};

/**
 * Validates schema name according to PostgreSQL naming rules
 * @param name - Schema name to validate
 * @returns Validation result with optional error message
 */
export const validateSchemaName = (name: string): { valid: boolean; error?: string } => {
  if (!name.trim()) {
    return { valid: false, error: 'Назва схеми не може бути порожньою' };
  }

  if (name.length > 63) {
    return { valid: false, error: 'Назва схеми не може перевищувати 63 символи' };
  }

  // PostgreSQL identifier rules: start with letter or underscore, contain only letters, digits, underscores
  const validPattern = /^[a-z_][a-z0-9_]*$/i;
  if (!validPattern.test(name)) {
    return { 
      valid: false, 
      error: 'Назва схеми може містити тільки літери, цифри та підкреслення, і повинна починатися з літери або підкреслення' 
    };
  }

  // Check for reserved schema names
  const reservedNames = ['pg_catalog', 'information_schema', 'pg_toast', 'pg_temp'];
  if (reservedNames.includes(name.toLowerCase())) {
    return {
      valid: false,
      error: 'Це зарезервована системна назва схеми'
    };
  }

  return { valid: true };
};

/**
 * Validates schema description length
 * @param description - Description to validate
 * @returns Validation result
 */
export const validateSchemaDescription = (description: string): { valid: boolean; error?: string } => {
  if (description.length > 1000) {
    return {
      valid: false,
      error: 'Опис схеми не може перевищувати 1000 символів'
    };
  }

  return { valid: true };
};

/**
 * Checks if a schema name is reserved by PostgreSQL
 * @param name - Schema name to check
 * @returns true if reserved, false otherwise
 */
export const isReservedSchemaName = (name: string): boolean => {
  const reservedPrefixes = ['pg_', 'information_'];
  const lowerName = name.toLowerCase();
  
  return reservedPrefixes.some(prefix => lowerName.startsWith(prefix));
};
