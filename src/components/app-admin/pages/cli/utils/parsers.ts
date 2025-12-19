/**
 * Parsing functions for CLI commands
 */

/**
 * Parse command type
 */
export const getCommandType = (command: string): string => {
  const lower = command.toLowerCase().trim();

  if (lower.startsWith('\\')) {
    return 'psql';
  }

  if (lower.startsWith('select')) return 'query';
  if (lower.startsWith('insert')) return 'insert';
  if (lower.startsWith('update')) return 'update';
  if (lower.startsWith('delete')) return 'delete';
  if (lower.startsWith('create')) return 'ddl';
  if (lower.startsWith('drop')) return 'ddl';
  if (lower.startsWith('alter')) return 'ddl';
  if (lower.startsWith('grant')) return 'permission';
  if (lower.startsWith('revoke')) return 'permission';

  return 'unknown';
};

/**
 * Get command category
 */
export const getCommandCategory = (command: string): string => {
  const type = getCommandType(command);

  switch (type) {
    case 'psql':
      return 'Meta Commands';
    case 'query':
      return 'Data Query';
    case 'insert':
    case 'update':
    case 'delete':
      return 'Data Manipulation';
    case 'ddl':
      return 'Schema Definition';
    case 'permission':
      return 'Access Control';
    default:
      return 'General';
  }
};

/**
 * Is psql command
 */
export const isPsqlCommand = (command: string): boolean => {
  return command.trim().startsWith('\\');
};

/**
 * Is SQL command
 */
export const isSQLCommand = (command: string): boolean => {
  const sqlKeywords = ['select', 'insert', 'update', 'delete', 'create', 'drop', 'alter'];
  const lower = command.trim().toLowerCase();
  return sqlKeywords.some((keyword) => lower.startsWith(keyword));
};
