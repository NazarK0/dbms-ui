/**
 * Device Utility Functions
 * 
 * Functions for device-specific configurations and settings.
 * 
 * @module utils/devices
 */

import type { DeviceType, DeviceSize } from '../types';

/**
 * Get device size configuration
 * 
 * Returns width and height for different device types.
 * 
 * @param deviceType - Type of device (desktop, tablet, mobile)
 * @returns Device size configuration
 * 
 * @example
 * ```tsx
 * getDeviceSize('desktop');  // { width: '100%', height: '600px' }
 * getDeviceSize('tablet');   // { width: '768px', height: '600px' }
 * getDeviceSize('mobile');   // { width: '375px', height: '667px' }
 * ```
 */
export const getDeviceSize = (deviceType: DeviceType): DeviceSize => {
  const sizes: Record<DeviceType, DeviceSize> = {
    desktop: { width: '100%', height: '600px' },
    tablet: { width: '768px', height: '600px' },
    mobile: { width: '375px', height: '667px' },
  };
  return sizes[deviceType];
};

/**
 * Get device display name
 * 
 * Returns the Ukrainian display name for device type.
 * 
 * @param deviceType - Type of device
 * @returns Ukrainian display name
 * 
 * @example
 * ```tsx
 * getDeviceDisplayName('desktop');  // "Комп'ютер"
 * getDeviceDisplayName('tablet');   // "Планшет"
 * getDeviceDisplayName('mobile');   // "Телефон"
 * ```
 */
export const getDeviceDisplayName = (deviceType: DeviceType): string => {
  const names: Record<DeviceType, string> = {
    desktop: 'Комп\'ютер',
    tablet: 'Планшет',
    mobile: 'Телефон',
  };
  return names[deviceType];
};

/**
 * Check if device should show navigation
 * 
 * Determines whether navigation should be displayed for device type.
 * Currently only desktop shows full navigation.
 * 
 * @param deviceType - Type of device
 * @returns True if navigation should be shown
 * 
 * @example
 * ```tsx
 * shouldShowNavigation('desktop');  // true
 * shouldShowNavigation('tablet');   // false
 * shouldShowNavigation('mobile');   // false
 * ```
 */
export const shouldShowNavigation = (deviceType: DeviceType): boolean => {
  return deviceType === 'desktop';
};

/**
 * Get action grid columns for device
 * 
 * Returns the number of grid columns for action buttons based on device.
 * Mobile uses 2 columns, tablet and desktop use 3 columns.
 * 
 * @param deviceType - Type of device
 * @returns Number of grid columns
 * 
 * @example
 * ```tsx
 * getActionGridCols('desktop');  // 3
 * getActionGridCols('tablet');   // 3
 * getActionGridCols('mobile');   // 2
 * ```
 */
export const getActionGridCols = (deviceType: DeviceType): number => {
  return deviceType === 'mobile' ? 2 : 3;
};

/**
 * Validate device type
 * 
 * Checks if a string is a valid DeviceType.
 * 
 * @param device - String to validate
 * @returns True if valid device type
 * 
 * @example
 * ```tsx
 * isValidDeviceType('desktop');  // true
 * isValidDeviceType('tablet');   // true
 * isValidDeviceType('laptop');   // false
 * isValidDeviceType('invalid');  // false
 * ```
 */
export const isValidDeviceType = (device: string): device is DeviceType => {
  return ['desktop', 'tablet', 'mobile'].includes(device);
};
