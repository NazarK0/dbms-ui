/**
 * Validation functions for PostgreSQL Configuration
 */

import type { ConfigParam } from '../types';

/**
 * Validate configuration parameter value
 */
export const validateParamValue = (param: ConfigParam, value: string): {
  valid: boolean;
  error?: string;
} => {
  // Basic validation - can be extended
  if (!value || value.trim() === '') {
    return { valid: false, error: 'Значення не може бути порожнім' };
  }

  // Validate numeric values
  if (param.unit && !value.match(/^\d+[A-Za-z]*$/)) {
    return { valid: false, error: 'Неправильний формат значення' };
  }

  // Validate boolean values
  if (['on', 'off'].includes(param.defaultValue)) {
    if (!['on', 'off'].includes(value)) {
      return { valid: false, error: 'Значення має бути "on" або "off"' };
    }
  }

  return { valid: true };
};

/**
 * Check if parameter has been modified
 */
export const isParamModified = (param: ConfigParam): boolean => {
  return param.value !== param.defaultValue;
};
