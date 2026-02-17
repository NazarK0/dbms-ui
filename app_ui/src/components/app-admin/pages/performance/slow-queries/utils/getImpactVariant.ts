/**
 * Get badge variant based on impact level
 */
export const getImpactVariant = (impact: string): 'destructive' | 'default' | 'secondary' => {
  switch (impact) {
    case 'Висока':
      return 'destructive';
    case 'Середня':
      return 'default';
    default:
      return 'secondary';
  }
};
