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
export const getPermissionBadgeVariant = (enabled: boolean): 'default' | 'outline' => {
  return enabled ? 'default' : 'outline';
};
