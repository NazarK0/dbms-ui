/**
 * Create Schema Modal - Generators
 * =================================
 * 
 * Функції для генерації назв схем та SQL запитів.
 * Створюють SQL statements для створення схем в PostgreSQL.
 */

import { SchemaFormData } from '../types';
import { sanitizeFormData, formatDescriptionForSQL } from './sanitizers';

/**
 * Generates a schema name suggestion based on purpose
 * @param purpose - Purpose of the schema (e.g., 'analytics', 'reporting')
 * @returns Suggested schema name
 */
export const generateSchemaNameSuggestion = (purpose: string = 'custom'): string => {
  const timestamp = Date.now().toString(36).slice(-4);
  const cleanPurpose = purpose.toLowerCase().replace(/[^a-z0-9]/g, '_');
  return `${cleanPurpose}_schema_${timestamp}`;
};

/**
 * Generates CREATE SCHEMA SQL statement
 * @param data - Schema form data
 * @returns SQL statement
 */
export const generateCreateSchemaSQL = (data: SchemaFormData): string => {
  const { schemaName, schemaOwner, schemaDescription } = sanitizeFormData(data);
  
  let sql = `CREATE SCHEMA ${schemaName}`;
  
  if (schemaOwner) {
    sql += ` AUTHORIZATION ${schemaOwner}`;
  }
  
  sql += ';';
  
  // Add COMMENT if description provided
  if (schemaDescription.trim()) {
    const safDescription = formatDescriptionForSQL(schemaDescription);
    sql += `\n\nCOMMENT ON SCHEMA ${schemaName} IS '${safDescription}';`;
  }
  
  return sql;
};
