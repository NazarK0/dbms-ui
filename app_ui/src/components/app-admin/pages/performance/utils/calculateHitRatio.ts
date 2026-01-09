/**
 * Calculate cache hit ratio percentage
 */
export const calculateHitRatio = (hits: number, misses: number): number => {
  const total = hits + misses;
  if (total === 0) return 0;
  return Math.round((hits / total) * 100);
};
