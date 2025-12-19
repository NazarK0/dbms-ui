/**
 * Utility functions for theme configuration
 */

import type { UserType } from '../types';

/**
 * Get theme color based on user type
 */
export const getThemeColor = (userType: UserType): string => {
  return userType === 'admin' ? 'lime' : 'violet';
};

/**
 * Get gradient classes for buttons based on user type
 */
export const getButtonGradient = (userType: UserType): string => {
  return userType === 'admin'
    ? 'from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700'
    : 'from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700';
};

/**
 * Get background color classes for info boxes
 */
export const getInfoBoxClasses = (userType: UserType): string => {
  return userType === 'admin'
    ? 'bg-lime-50 border-lime-200'
    : 'bg-violet-50 border-violet-200';
};

/**
 * Get text color classes for info boxes
 */
export const getInfoBoxTextClasses = (userType: UserType): string => {
  return userType === 'admin' ? 'text-lime-900' : 'text-violet-900';
};

/**
 * Get icon color classes based on user type
 */
export const getIconColorClasses = (userType: UserType): string => {
  return userType === 'admin' ? 'text-lime-600' : 'text-violet-600';
};

/**
 * Get category icon background classes
 */
export const getCategoryIconBgClasses = (userType: UserType): string => {
  return userType === 'admin' ? 'bg-lime-100' : 'bg-violet-100';
};

/**
 * Get border color classes for inputs
 */
export const getInputBorderClasses = (userType: UserType, hasValue: boolean): string => {
  if (!hasValue) return '';
  const color = getThemeColor(userType);
  return `border-${color}-300`;
};
