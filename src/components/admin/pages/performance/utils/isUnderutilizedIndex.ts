/**
 * Determine if index is underutilized
 */
export const isUnderutilizedIndex = (usage: number, threshold: number = 10): boolean => {
  return usage < threshold;
};
