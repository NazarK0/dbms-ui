import type {
  RoleType,
  FormData,
  UiSettings,
  UiDisplaySettings,
  RlsPolicies,
} from '../types';
import {
  countEnabledUiSettings,
  countEnabledDisplaySettings,
  countEnabledRlsPolicies,
} from './counters';

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
