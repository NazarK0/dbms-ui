import type { UiSettings, UiDisplaySettings, RlsPolicies } from '../types';

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
