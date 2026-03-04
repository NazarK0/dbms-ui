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
