import { validationRules } from '../../../../../mockData/admin';

/**
 * Validates database name according to PostgreSQL naming rules
 */
export const validateDatabaseName = (name: string): string | null => {
  if (!name) {
    return "Назва бази даних обов'язкова";
  }

  if (name.length < validationRules.dbName.minLength) {
    return 'Назва бази даних занадто коротка';
  }

  if (name.length > validationRules.dbName.maxLength) {
    return `Назва бази даних не може перевищувати ${validationRules.dbName.maxLength} символів`;
  }

  if (!validationRules.dbName.pattern.test(name)) {
    return validationRules.dbName.errorMessage;
  }

  // Check for reserved names
  for (const reserved of validationRules.reservedNames) {
    if (name === reserved || name.startsWith(reserved)) {
      return `Назва "${reserved}" зарезервована системою`;
    }
  }

  return null;
};

/**
 * Checks if form is valid for submission
 */
export const isFormValid = (dbName: string, dbOwner: string, nameError: string | null): boolean => {
  return Boolean(dbName && dbOwner && !nameError);
};

/**
 * Sanitizes database name to ensure it follows PostgreSQL rules
 */
export const sanitizeDatabaseName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/^[0-9]/, '_$&')
    .slice(0, validationRules.dbName.maxLength);
};
