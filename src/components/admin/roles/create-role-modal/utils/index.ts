/**
 * Utility functions for CreateRoleModal components
 */

// Style helpers
export {
  getRoleTypeColorClasses,
  getRadioButtonColorClasses,
  getRadioButtonFillColor,
  getIconColor,
  getDisplaySettingContainerClasses,
  getDisplaySettingCardClasses,
  getHintBoxClasses,
  getButtonStyleClass,
} from './styleHelpers';

// Text helpers
export {
  getRoleNamePlaceholder,
  getRlsDescription,
  getRoleTypeLabel,
  formatTableName,
} from './textHelpers';

// State updaters
export {
  updateUiSetting,
  updateUiDisplaySetting,
  toggleRlsPolicy,
  updateRlsPolicy,
  toggleRlsOperation,
  updateRlsUsing,
  updateRlsWithCheck,
  resetToDefaults,
} from './stateUpdaters';

// Validators
export {
  validateRoleName,
  validateRoleDescription,
  validateFormData,
  validateSqlExpression,
  canSubmitForm,
} from './validators';

// Counters
export {
  countEnabledUiSettings,
  countEnabledDisplaySettings,
  countEnabledRlsPolicies,
} from './counters';

// Getters and filters
export {
  getEnabledUiSettings,
  getEnabledDisplaySettings,
  getEnabledRlsTables,
  hasEnabledRlsPolicies,
  hasEnabledUiSettings,
  getRlsPolicySummary,
  isAdminOnlySetting,
  filterDisplaySettingsByRoleType,
  hasChangesFromDefaults,
} from './getters';

// SQL generators
export {
  generateRlsSqlPolicy,
  generateAllRlsSql,
} from './sqlGenerators';

// Export configuration
export { exportRoleConfig } from './exportConfig';
