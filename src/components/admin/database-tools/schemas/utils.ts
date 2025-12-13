/**
 * Utility functions for SchemasManager component
 */

/**
 * Validate schema name (PostgreSQL naming rules)
 */
export const isValidSchemaName = (name: string): boolean => {
  // Must start with letter or underscore
  // Can contain letters, numbers, underscores
  // Max 63 characters
  // Cannot be reserved names
  const regex = /^[a-zA-Z_][a-zA-Z0-9_]{0,62}$/;
  const reservedNames = ['pg_', 'information_schema'];
  
  return (
    regex.test(name) && 
    !reservedNames.some(reserved => name.startsWith(reserved))
  );
};

/**
 * Check if schema is a system schema
 */
export const isSystemSchema = (schemaName: string): boolean => {
  const systemSchemas = [
    'pg_catalog',
    'information_schema',
    'pg_toast',
    'pg_temp_1',
    'pg_toast_temp_1',
  ];
  
  return systemSchemas.includes(schemaName) || schemaName.startsWith('pg_');
};

/**
 * Check if schema is the public schema
 */
export const isPublicSchema = (schemaName: string): boolean => {
  return schemaName === 'public';
};

/**
 * Check if schema can be deleted
 */
export const canDeleteSchema = (schemaName: string): boolean => {
  return !isPublicSchema(schemaName) && !isSystemSchema(schemaName);
};

/**
 * Format schema identifier for SQL
 */
export const formatSchemaIdentifier = (database: string, schema: string): string => {
  return `${database}.${schema}`;
};

/**
 * Validate schema form data
 */
export const validateSchemaForm = (data: {
  schemaName: string;
  schemaOwner: string;
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.schemaName.trim()) {
    errors.push('Назва схеми обов\'язкова');
  } else if (!isValidSchemaName(data.schemaName)) {
    errors.push('Невірний формат назви схеми');
  } else if (isSystemSchema(data.schemaName)) {
    errors.push('Не можна створювати схеми з системними іменами');
  }

  if (!data.schemaOwner) {
    errors.push('Оберіть власника схеми');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Get schema statistics summary
 */
export const getSchemaStatsSummary = (schema: {
  tables: number;
  functions: number;
}): string => {
  const parts: string[] = [];
  
  if (schema.tables > 0) {
    parts.push(`${schema.tables} табл.`);
  }
  
  if (schema.functions > 0) {
    parts.push(`${schema.functions} функц.`);
  }
  
  return parts.length > 0 ? parts.join(', ') : 'Порожня';
};

/**
 * Sort schemas with public first
 */
export const sortSchemas = <T extends { name: string }>(schemas: T[]): T[] => {
  return [...schemas].sort((a, b) => {
    // Public schema always first
    if (a.name === 'public') return -1;
    if (b.name === 'public') return 1;
    
    // Then alphabetically
    return a.name.localeCompare(b.name);
  });
};
