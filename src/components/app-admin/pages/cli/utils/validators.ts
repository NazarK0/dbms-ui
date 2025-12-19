/**
 * Validation functions for CLI commands
 */

import type { CommandValidationResult } from '../types';

/**
 * Validate SQL command
 */
export const validateCommand = (command: string): CommandValidationResult => {
  const trimmed = command.trim();

  if (!trimmed) {
    return {
      isValid: false,
      errors: ['Команда не може бути порожньою'],
    };
  }

  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for potentially dangerous commands
  const dangerous = ['drop database', 'drop table', 'truncate', 'delete from'];
  const lower = trimmed.toLowerCase();

  for (const cmd of dangerous) {
    if (lower.includes(cmd)) {
      warnings.push(`Небезпечна команда: ${cmd.toUpperCase()}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
};
