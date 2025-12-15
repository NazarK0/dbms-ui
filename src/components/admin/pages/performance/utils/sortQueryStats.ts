/**
 * Sort query stats by selected metric
 */
export const sortQueryStats = <T extends Record<string, any>>(
  stats: T[],
  sortBy: string
): T[] => {
  return [...stats].sort((a, b) => {
    switch (sortBy) {
      case 'total_time':
        // Assuming totalTime is a string like "1.2s"
        return parseFloat(b.totalTime) - parseFloat(a.totalTime);
      case 'avg_time':
        return parseFloat(b.avgTime) - parseFloat(a.avgTime);
      case 'calls':
        return b.calls - a.calls;
      case 'hit_ratio':
        return b.hitRatio - a.hitRatio;
      default:
        return 0;
    }
  });
};
