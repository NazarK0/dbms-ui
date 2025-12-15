/**
 * Mathematical Calculation Utilities
 * 
 * Functions for calculating percentages and other mathematical operations.
 * 
 * @module utils/calculations
 */

/**
 * Calculate percentage
 * 
 * Calculates percentage of part relative to total, rounded to nearest integer.
 * Returns 0 if total is 0 (to avoid division by zero).
 * 
 * @param part - Part value
 * @param total - Total value
 * @returns Percentage (0-100, rounded)
 * 
 * @example
 * ```tsx
 * calculatePercentage(25, 100);  // 25
 * calculatePercentage(1, 3);     // 33
 * calculatePercentage(2, 3);     // 67
 * calculatePercentage(0, 100);   // 0
 * calculatePercentage(100, 100); // 100
 * calculatePercentage(50, 0);    // 0 (safe division by zero)
 * 
 * // Use in statistics
 * const activeUsers = getActiveUsers(users).length;
 * const totalUsers = users.length;
 * const activePercent = calculatePercentage(activeUsers, totalUsers);
 * console.log(`${activePercent}% of users are active`);
 * 
 * // Use in UI
 * const percentage = calculatePercentage(completed, total);
 * <div className="w-full bg-slate-200 rounded">
 *   <div
 *     className="bg-lime-500 h-2 rounded"
 *     style={{ width: `${percentage}%` }}
 *   />
 * </div>
 * ```
 */
export const calculatePercentage = (part: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
};
