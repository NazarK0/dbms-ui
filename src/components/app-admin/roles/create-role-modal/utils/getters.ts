import type {
  UiSettings,
  UiDisplaySettings,
  RlsPolicies,
  RlsPolicy,
  RoleType,
} from '../types';

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
