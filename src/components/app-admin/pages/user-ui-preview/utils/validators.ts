/**
 * Validation Utility Functions
 * 
 * Functions for validating role IDs and device types.
 * 
 * @module utils/validators
 */

import type { DeviceType } from '../types';
import { userRoles } from '../data';

/**
 * Validate device type
 * 
 * Type guard function to check if a string is a valid DeviceType.
 * 
 * @param device - String to validate
 * @returns True if valid DeviceType, also narrows TypeScript type
 * 
 * @example
 * ```tsx
 * const input: string = getUserInput();
 * 
 * if (isValidDeviceType(input)) {
 *   // TypeScript now knows input is DeviceType
 *   const size = getDeviceSize(input);  // Type-safe!
 * } else {
 *   console.error('Invalid device type');
 * }
 * 
 * // Test cases
 * isValidDeviceType('desktop');  // true
 * isValidDeviceType('tablet');   // true
 * isValidDeviceType('mobile');   // true
 * isValidDeviceType('laptop');   // false
 * isValidDeviceType('invalid');  // false
 * isValidDeviceType('');         // false
 * ```
 */
export const isValidDeviceType = (device: string): device is DeviceType => {
  return ['desktop', 'tablet', 'mobile'].includes(device);
};

/**
 * Validate role ID
 * 
 * Checks if a role ID exists in the system.
 * 
 * @param roleId - Role identifier to validate
 * @returns True if role exists
 * 
 * @example
 * ```tsx
 * const roleId: string = getSelectedRole();
 * 
 * if (isValidRoleId(roleId)) {
 *   const permissions = getPermissionsForRole(roleId);
 *   // Process permissions...
 * } else {
 *   console.error('Role not found');
 * }
 * 
 * // Test cases
 * isValidRoleId('developer');        // true
 * isValidRoleId('data-analyst');     // true
 * isValidRoleId('content-manager');  // true
 * isValidRoleId('viewer');           // true
 * isValidRoleId('invalid-role');     // false
 * isValidRoleId('');                 // false
 * ```
 */
export const isValidRoleId = (roleId: string): boolean => {
  return userRoles.some((role) => role.id === roleId);
};
