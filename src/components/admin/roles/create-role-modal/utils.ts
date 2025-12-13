/**
 * Utility functions for CreateRoleModal components
 */

import type {
  RoleType,
  UiSettings,
  UiDisplaySettings,
  RlsPolicies,
  RlsPolicy,
  ValidationResult,
  ValidationError,
  FormData,
} from './types';
import { validationRules } from './data';

/**
 * Get color classes for role type
 */
export const getRoleTypeColorClasses = (
  roleType: RoleType,
  selected: boolean
) => {
  if (roleType === 'admin') {
    return selected
      ? 'border-lime-500 bg-lime-50'
      : 'border-slate-200 hover:border-slate-300';
  }
  return selected
    ? 'border-violet-500 bg-violet-50'
    : 'border-slate-200 hover:border-slate-300';
};

/**
 * Get radio button color classes
 */
export const getRadioButtonColorClasses = (
  roleType: RoleType,
  selected: boolean
) => {
  const borderColor = selected
    ? roleType === 'admin'
      ? 'border-lime-500'
      : 'border-violet-500'
    : 'border-slate-300';

  return borderColor;
};

/**
 * Get radio button fill color
 */
export const getRadioButtonFillColor = (roleType: RoleType) => {
  return roleType === 'admin' ? 'bg-lime-500' : 'bg-violet-500';
};

/**
 * Get icon color for role type
 */
export const getIconColor = (roleType: RoleType) => {
  return roleType === 'admin' ? 'text-lime-600' : 'text-violet-600';
};

/**
 * Get placeholder text for role name input
 */
export const getRoleNamePlaceholder = (roleType: RoleType) => {
  return roleType === 'user'
    ? 'Наприклад: Business User'
    : 'Наприклад: Backend Developer';
};

/**
 * Get display setting container classes
 */
export const getDisplaySettingContainerClasses = (roleType: RoleType) => {
  return roleType === 'admin'
    ? 'bg-lime-50/30 border-lime-200'
    : 'bg-violet-50/30 border-violet-200';
};

/**
 * Get display setting card classes
 */
export const getDisplaySettingCardClasses = (roleType: RoleType) => {
  const hoverColor =
    roleType === 'admin' ? 'hover:border-lime-300' : 'hover:border-violet-300';
  return `border-slate-200 ${hoverColor}`;
};

/**
 * Get hint box classes
 */
export const getHintBoxClasses = (roleType: RoleType) => {
  if (roleType === 'admin') {
    return 'bg-lime-50 border-lime-200 text-lime-900';
  }
  return 'bg-violet-50 border-violet-200 text-violet-900';
};

/**
 * Get RLS section description
 */
export const getRlsDescription = (roleType: RoleType) => {
  return roleType === 'admin'
    ? 'Налаштуйте політики безпеки на рівні рядків для таблиць'
    : 'Обмеження доступу користувачів до даних на рівні рядків';
};

/**
 * Update UI setting
 */
export const updateUiSetting = (
  settings: UiSettings,
  settingId: string
): UiSettings => {
  return {
    ...settings,
    [settingId]: !settings[settingId as keyof UiSettings],
  };
};

/**
 * Update UI display setting
 */
export const updateUiDisplaySetting = (
  settings: UiDisplaySettings,
  settingId: string
): UiDisplaySettings => {
  return {
    ...settings,
    [settingId]: !settings[settingId as keyof UiDisplaySettings],
  };
};

/**
 * Toggle RLS policy enabled state
 */
export const toggleRlsPolicy = (
  policies: RlsPolicies,
  tableName: string
): RlsPolicies => {
  return {
    ...policies,
    [tableName]: {
      ...policies[tableName],
      enabled: !policies[tableName].enabled,
    },
  };
};

/**
 * Update RLS policy
 */
export const updateRlsPolicy = (
  policies: RlsPolicies,
  tableName: string,
  updates: Partial<RlsPolicy>
): RlsPolicies => {
  return {
    ...policies,
    [tableName]: {
      ...policies[tableName],
      ...updates,
    },
  };
};

/**
 * Toggle RLS operation
 */
export const toggleRlsOperation = (
  policies: RlsPolicies,
  tableName: string,
  operation: keyof Pick<RlsPolicy, 'select' | 'insert' | 'update' | 'delete'>
): RlsPolicies => {
  return {
    ...policies,
    [tableName]: {
      ...policies[tableName],
      [operation]: !policies[tableName][operation],
    },
  };
};

/**
 * Update RLS using expression
 */
export const updateRlsUsing = (
  policies: RlsPolicies,
  tableName: string,
  using: string
): RlsPolicies => {
  return {
    ...policies,
    [tableName]: {
      ...policies[tableName],
      using,
    },
  };
};

/**
 * Update RLS with check expression
 */
export const updateRlsWithCheck = (
  policies: RlsPolicies,
  tableName: string,
  withCheck: string
): RlsPolicies => {
  return {
    ...policies,
    [tableName]: {
      ...policies[tableName],
      withCheck,
    },
  };
};

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
 * Count enabled UI settings
 */
export const countEnabledUiSettings = (settings: UiSettings): number => {
  return Object.values(settings).filter((value) => value === true).length;
};

/**
 * Count enabled display settings
 */
export const countEnabledDisplaySettings = (
  settings: UiDisplaySettings
): number => {
  return Object.values(settings).filter((value) => value === true).length;
};

/**
 * Count enabled RLS policies
 */
export const countEnabledRlsPolicies = (policies: RlsPolicies): number => {
  return Object.values(policies).filter((policy) => policy.enabled).length;
};

/**
 * Get enabled UI settings
 */
export const getEnabledUiSettings = (
  settings: UiSettings
): Array<keyof UiSettings> => {
  return Object.entries(settings)
    .filter(([_, value]) => value === true)
    .map(([key]) => key as keyof UiSettings);
};

/**
 * Get enabled display settings
 */
export const getEnabledDisplaySettings = (
  settings: UiDisplaySettings
): Array<keyof UiDisplaySettings> => {
  return Object.entries(settings)
    .filter(([_, value]) => value === true)
    .map(([key]) => key as keyof UiDisplaySettings);
};

/**
 * Get enabled RLS tables
 */
export const getEnabledRlsTables = (policies: RlsPolicies): string[] => {
  return Object.entries(policies)
    .filter(([_, policy]) => policy.enabled)
    .map(([tableName]) => tableName);
};

/**
 * Check if any RLS policy is enabled
 */
export const hasEnabledRlsPolicies = (policies: RlsPolicies): boolean => {
  return Object.values(policies).some((policy) => policy.enabled);
};

/**
 * Check if any UI setting is enabled
 */
export const hasEnabledUiSettings = (settings: UiSettings): boolean => {
  return Object.values(settings).some((value) => value === true);
};

/**
 * Get RLS policy summary
 */
export const getRlsPolicySummary = (policy: RlsPolicy) => {
  const operations = [];
  if (policy.select) operations.push('SELECT');
  if (policy.insert) operations.push('INSERT');
  if (policy.update) operations.push('UPDATE');
  if (policy.delete) operations.push('DELETE');

  return {
    enabled: policy.enabled,
    operationsCount: operations.length,
    operations,
    hasUsing: policy.using.trim().length > 0,
    hasWithCheck: policy.withCheck.trim().length > 0,
  };
};

/**
 * Export role configuration to JSON
 */
export const exportRoleConfig = (
  roleType: RoleType,
  formData: FormData,
  uiSettings: UiSettings,
  uiDisplaySettings: UiDisplaySettings,
  rlsPolicies: RlsPolicies
) => {
  return JSON.stringify(
    {
      roleType,
      ...formData,
      uiSettings,
      uiDisplaySettings,
      rlsPolicies,
      metadata: {
        createdAt: new Date().toISOString(),
        enabledUiSettings: countEnabledUiSettings(uiSettings),
        enabledDisplaySettings: countEnabledDisplaySettings(uiDisplaySettings),
        enabledRlsPolicies: countEnabledRlsPolicies(rlsPolicies),
      },
    },
    null,
    2
  );
};

/**
 * Reset all settings to defaults
 */
export const resetToDefaults = (
  defaultUiSettings: UiSettings,
  defaultUiDisplaySettings: UiDisplaySettings,
  defaultRlsPolicies: RlsPolicies
) => {
  return {
    uiSettings: { ...defaultUiSettings },
    uiDisplaySettings: { ...defaultUiDisplaySettings },
    rlsPolicies: { ...defaultRlsPolicies },
  };
};

/**
 * Check if settings are different from defaults
 */
export const hasChangesFromDefaults = (
  currentUiSettings: UiSettings,
  currentDisplaySettings: UiDisplaySettings,
  currentRlsPolicies: RlsPolicies,
  defaultUiSettings: UiSettings,
  defaultDisplaySettings: UiDisplaySettings,
  defaultRlsPolicies: RlsPolicies
): boolean => {
  const uiChanged =
    JSON.stringify(currentUiSettings) !== JSON.stringify(defaultUiSettings);
  const displayChanged =
    JSON.stringify(currentDisplaySettings) !==
    JSON.stringify(defaultDisplaySettings);
  const rlsChanged =
    JSON.stringify(currentRlsPolicies) !== JSON.stringify(defaultRlsPolicies);

  return uiChanged || displayChanged || rlsChanged;
};

/**
 * Get button style class
 */
export const getButtonStyleClass = (isEditMode: boolean): string => {
  return isEditMode
    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
    : 'bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700';
};

/**
 * Format table name for display
 */
export const formatTableName = (tableName: string): string => {
  return tableName
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Check if display setting is admin only
 */
export const isAdminOnlySetting = (
  settingId: keyof UiDisplaySettings
): boolean => {
  const adminOnlySettings: Array<keyof UiDisplaySettings> = [
    'restApi',
    'technicalIds',
    'debugInfo',
    'queryPlans',
    'rawSql',
    'systemSchemas',
  ];

  return adminOnlySettings.includes(settingId);
};

/**
 * Filter display settings by role type
 */
export const filterDisplaySettingsByRoleType = (
  roleType: RoleType,
  allSettings: Array<keyof UiDisplaySettings>
): Array<keyof UiDisplaySettings> => {
  if (roleType === 'admin') {
    return allSettings;
  }

  return allSettings.filter((setting) => !isAdminOnlySetting(setting));
};

/**
 * Generate RLS SQL policy
 */
export const generateRlsSqlPolicy = (
  tableName: string,
  policy: RlsPolicy
): string => {
  if (!policy.enabled) return '';

  const operations = [];
  if (policy.select) operations.push('SELECT');
  if (policy.insert) operations.push('INSERT');
  if (policy.update) operations.push('UPDATE');
  if (policy.delete) operations.push('DELETE');

  let sql = `-- Enable RLS on ${tableName}\n`;
  sql += `ALTER TABLE ${tableName} ENABLE ROW LEVEL SECURITY;\n\n`;

  sql += `-- Create policy for ${tableName}\n`;
  sql += `CREATE POLICY ${tableName}_policy ON ${tableName}\n`;
  sql += `  FOR ${operations.join(', ')}\n`;
  sql += `  USING (${policy.using})`;

  if (policy.insert || policy.update) {
    sql += `\n  WITH CHECK (${policy.withCheck})`;
  }

  sql += ';';

  return sql;
};

/**
 * Generate all RLS SQL
 */
export const generateAllRlsSql = (policies: RlsPolicies): string => {
  const enabledPolicies = Object.entries(policies).filter(
    ([_, policy]) => policy.enabled
  );

  if (enabledPolicies.length === 0) {
    return '-- No RLS policies enabled';
  }

  return enabledPolicies
    .map(([tableName, policy]) => generateRlsSqlPolicy(tableName, policy))
    .join('\n\n');
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
 * Get role type label
 */
export const getRoleTypeLabel = (roleType: RoleType): string => {
  return roleType === 'admin' ? 'Роль адміністратора' : 'Роль користувача';
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
