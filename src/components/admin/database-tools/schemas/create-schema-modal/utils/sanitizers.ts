/**
 * Create Schema Modal - Sanitizers
 * =================================
 * 
 * Функції для очищення та форматування даних перед відправкою.
 * Видаляють зайві пробіли та підготовляють дані для SQL запитів.
 */

import { SchemaFormData } from '../types';

/**
 * Sanitizes form data before submission
 * Trims whitespace and removes optional fields if empty
 * @param data - Raw form data
 * @returns Sanitized form data
 */
export const sanitizeFormData = (data: SchemaFormData): SchemaFormData => {
  return {
    schemaName: data.schemaName.trim(),
    schemaOwner: data.schemaOwner,
    schemaDescription: data.schemaDescription.trim(),
  };
};

/**
 * Formats schema description for SQL COMMENT
 * Escapes single quotes and trims whitespace
 * @param description - Raw description
 * @returns SQL-safe description
 */
export const formatDescriptionForSQL = (description: string): string => {
  if (!description.trim()) return '';
  
  // Escape single quotes for SQL
  return description.trim().replace(/'/g, "''");
};
