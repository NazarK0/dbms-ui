/**
 * UI Styling Utility Functions
 * 
 * Functions for generating CSS classes and styling attributes for UI components.
 * 
 * @module utils/styling
 */

/**
 * Get enabled action button class
 * 
 * Returns Tailwind CSS classes for action buttons based on enabled state.
 * Enabled buttons use lime colors, disabled buttons use slate with reduced opacity.
 * 
 * @param enabled - Whether the action is enabled
 * @returns Tailwind CSS class string
 * 
 * @example
 * ```tsx
 * // Enabled button
 * getActionButtonClass(true);
 * // "p-4 rounded-lg border-2 border-lime-200 bg-lime-50 hover:border-lime-300 text-center"
 * 
 * // Disabled button
 * getActionButtonClass(false);
 * // "p-4 rounded-lg border-2 border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed text-center"
 * ```
 */
export const getActionButtonClass = (enabled: boolean): string => {
  if (enabled) {
    return 'p-4 rounded-lg border-2 border-lime-200 bg-lime-50 hover:border-lime-300 text-center';
  }
  return 'p-4 rounded-lg border-2 border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed text-center';
};

/**
 * Get action icon class
 * 
 * Returns Tailwind CSS classes for action icons based on enabled state.
 * Enabled icons use lime color, disabled icons use slate.
 * 
 * @param enabled - Whether the action is enabled
 * @returns Tailwind CSS class string
 * 
 * @example
 * ```tsx
 * getActionIconClass(true);   // "w-6 h-6 mx-auto mb-2 text-lime-600"
 * getActionIconClass(false);  // "w-6 h-6 mx-auto mb-2 text-slate-400"
 * ```
 */
export const getActionIconClass = (enabled: boolean): string => {
  const baseClass = 'w-6 h-6 mx-auto mb-2';
  const colorClass = enabled ? 'text-lime-600' : 'text-slate-400';
  return `${baseClass} ${colorClass}`;
};

/**
 * Get permission badge variant
 * 
 * Returns shadcn/ui Badge variant based on permission state.
 * 
 * @param enabled - Whether the permission is enabled
 * @returns Badge variant ('default' or 'outline')
 * 
 * @example
 * ```tsx
 * getPermissionBadgeVariant(true);   // 'default'
 * getPermissionBadgeVariant(false);  // 'outline'
 * 
 * // Usage with Badge component
 * <Badge variant={getPermissionBadgeVariant(enabled)}>
 *   {getPermissionBadgeText(enabled)}
 * </Badge>
 * ```
 */
export const getPermissionBadgeVariant = (
  enabled: boolean
): 'default' | 'outline' => {
  return enabled ? 'default' : 'outline';
};

/**
 * Get permission badge text
 * 
 * Returns Ukrainian text for permission badge based on state.
 * 
 * @param enabled - Whether the permission is enabled
 * @returns Badge text in Ukrainian
 * 
 * @example
 * ```tsx
 * getPermissionBadgeText(true);   // "Дозволено"
 * getPermissionBadgeText(false);  // "Заборонено"
 * 
 * // Usage with Badge component
 * <Badge variant={getPermissionBadgeVariant(enabled)}>
 *   {getPermissionBadgeText(enabled)}
 * </Badge>
 * ```
 */
export const getPermissionBadgeText = (enabled: boolean): string => {
  return enabled ? 'Дозволено' : 'Заборонено';
};
