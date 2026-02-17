import type {
  UiSettings,
  UiDisplaySettings,
  RlsPolicies,
  RlsPolicy,
} from '../types';

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
