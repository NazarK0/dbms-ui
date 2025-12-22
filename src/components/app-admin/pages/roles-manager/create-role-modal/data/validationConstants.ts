/**
 * Validation rules and configuration constants
 */

// Default form data
export const defaultFormData = {
  name: '',
  description: '',
  baseRole: '',
};

// Validation rules
export const validationRules = {
  nameMinLength: 3,
  nameMaxLength: 50,
  descriptionMaxLength: 500,
};

// RLS table names
export const rlsTableNames = ['users', 'orders', 'products', 'audit_logs'];
