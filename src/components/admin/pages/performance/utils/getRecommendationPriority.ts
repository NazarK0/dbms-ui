/**
 * Get recommendation priority based on impact
 */
export const getRecommendationPriority = (impact: string): number => {
  switch (impact) {
    case 'Висока':
      return 1;
    case 'Середня':
      return 2;
    case 'Низька':
      return 3;
    default:
      return 999;
  }
};
