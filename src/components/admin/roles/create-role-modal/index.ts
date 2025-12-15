// Central exports for CreateRoleModal components
export { default as RoleTypeOption } from './RoleTypeOption';
export { default as RoleTypeSelector } from './RoleTypeSelector';
export { default as BasicInfo } from './BasicInfo';
export { default as UiMenuItemCard } from './UiMenuItemCard';
export { default as UiVisibilitySettings } from './UiVisibilitySettings';
export { default as DisplaySettingCard } from './DisplaySettingCard';
export { default as UiDisplaySettings } from './UiDisplaySettings';
export { default as RlsOperations } from './RlsOperations';
export { default as RlsExpressions } from './RlsExpressions';
export { default as RlsTableCard } from './RlsTableCard';
export { default as RlsSettings } from './RlsSettings';
export { default as ModalHeader } from './ModalHeader';
export { default as ModalFooter } from './ModalFooter';
export * from './types';
export * from './utils';

// Export data constants from modular structure
export {
  defaultUiSettings,
  defaultUiDisplaySettings,
  defaultRlsPolicies,
  uiMenuItems,
  displaySettingItems,
  roleTypeData,
  userBaseRoles,
  adminBaseRoles,
  defaultRoleType,
  modalTitle,
  modalDescription,
  sectionTitles,
  sectionDescriptions,
  labels,
  placeholders,
  hints,
  buttonLabels,
  operationLabels,
  tableDescriptions,
  colorClasses,
  alertStyles,
  buttonStyles,
  gridLayouts,
  iconSizes,
  defaultFormData,
  validationRules,
  rlsTableNames,
} from './data/index';