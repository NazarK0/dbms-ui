import type { RoleType } from '../types';

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
 * Get button style class
 */
export const getButtonStyleClass = (isEditMode: boolean): string => {
  return isEditMode
    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
    : 'bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700';
};
