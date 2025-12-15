import type {
  ValidationError,
  ValidationResult,
  FormData,
  RlsPolicies,
} from '../types';
import { validationRules } from '../data';

/**
 * Validate role name
 */
export const validateRoleName = (name: string): ValidationError | null => {
  if (!name || name.trim().length === 0) {
    return {
      field: 'name',
      message: 'Назва ролі обов\'язкова',
    };
  }

  if (name.length < validationRules.nameMinLength) {
    return {
      field: 'name',
      message: `Назва ролі повинна містити мінімум ${validationRules.nameMinLength} символи`,
    };
  }

  if (name.length > validationRules.nameMaxLength) {
    return {
      field: 'name',
      message: `Назва ролі не може перевищувати ${validationRules.nameMaxLength} символів`,
    };
  }

  return null;
};

/**
 * Validate role description
 */
export const validateRoleDescription = (
  description: string
): ValidationError | null => {
  if (description.length > validationRules.descriptionMaxLength) {
    return {
      field: 'description',
      message: `Опис не може перевищувати ${validationRules.descriptionMaxLength} символів`,
    };
  }

  return null;
};

/**
 * Validate form data
 */
export const validateFormData = (formData: FormData): ValidationResult => {
  const errors: ValidationError[] = [];

  const nameError = validateRoleName(formData.name);
  if (nameError) errors.push(nameError);

  const descriptionError = validateRoleDescription(formData.description);
  if (descriptionError) errors.push(descriptionError);

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Parse SQL expression for validation
 */
export const validateSqlExpression = (expression: string): boolean => {
  if (!expression || expression.trim().length === 0) return false;

  // Basic validation: check for common SQL injection patterns
  const dangerous = ['DROP', 'DELETE FROM', 'TRUNCATE', 'ALTER', 'CREATE'];
  const upper = expression.toUpperCase();

  return !dangerous.some((pattern) => upper.includes(pattern));
};

/**
 * Check if form is valid for submission
 */
export const canSubmitForm = (
  formData: FormData,
  rlsPolicies: RlsPolicies
): boolean => {
  const validation = validateFormData(formData);
  if (!validation.isValid) return false;

  // Check if any enabled RLS policy has valid expressions
  const enabledPolicies = Object.values(rlsPolicies).filter((p) => p.enabled);
  if (enabledPolicies.length > 0) {
    const hasInvalidExpressions = enabledPolicies.some(
      (policy) =>
        !validateSqlExpression(policy.using) ||
        (policy.insert &&
          !validateSqlExpression(policy.withCheck)) ||
        (policy.update && !validateSqlExpression(policy.withCheck))
    );

    if (hasInvalidExpressions) return false;
  }

  return true;
};
