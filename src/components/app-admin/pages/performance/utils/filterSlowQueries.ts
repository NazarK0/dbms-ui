/**
 * Filter slow queries by minimum average time threshold
 */
export const filterSlowQueries = <T extends { avgTime: string }>(
  queries: T[],
  thresholdMs: number = 100
): T[] => {
  return queries.filter((query) => {
    const avgTime = parseFloat(query.avgTime);
    return avgTime >= thresholdMs;
  });
};
