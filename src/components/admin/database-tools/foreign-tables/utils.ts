import { Badge } from '../../../ui/badge';

/**
 * Get status badge component for foreign table
 */
export const getStatusBadge = (status: 'active' | 'error') => {
  if (status === 'active') {
    return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Активна</Badge>;
  }
  return <Badge variant="destructive">Помилка</Badge>;
};

/**
 * Format remote table reference
 */
export const formatRemoteTable = (schema: string, table: string): string => {
  return `${schema}.${table}`;
};

/**
 * Validate table name (PostgreSQL naming rules)
 */
export const isValidTableName = (name: string): boolean => {
  // Must start with letter or underscore
  // Can contain letters, numbers, underscores
  // Max 63 characters
  const regex = /^[a-zA-Z_][a-zA-Z0-9_]{0,62}$/;
  return regex.test(name);
};

/**
 * Validate foreign table form data
 */
export const validateTableForm = (data: {
  tableName: string;
  serverName: string;
  remoteSchema: string;
  remoteTable: string;
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.tableName.trim()) {
    errors.push('Назва локальної таблиці обов\'язкова');
  } else if (!isValidTableName(data.tableName)) {
    errors.push('Невірний формат назви таблиці');
  }

  if (!data.serverName) {
    errors.push('Оберіть зовнішній сервер');
  }

  if (!data.remoteSchema.trim()) {
    errors.push('Віддалена схема обов\'язкова');
  }

  if (!data.remoteTable.trim()) {
    errors.push('Віддалена таблиця обов\'язкова');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
