/**
 * UI helper functions for Replica Clusters
 */

/**
 * Get status badge variant based on cluster status
 */
export const getStatusVariant = (status: 'healthy' | 'warning' | 'error'): 'default' | 'secondary' | 'destructive' => {
  switch (status) {
    case 'healthy':
      return 'default';
    case 'warning':
      return 'secondary';
    case 'error':
      return 'destructive';
    default:
      return 'secondary';
  }
};

/**
 * Get status text for display
 */
export const getStatusText = (status: 'healthy' | 'warning' | 'error'): string => {
  switch (status) {
    case 'healthy':
      return 'Healthy';
    case 'warning':
      return 'Warning';
    case 'error':
      return 'Error';
    default:
      return 'Unknown';
  }
};

/**
 * Get lag badge variant based on lag value
 */
export const getLagVariant = (lag: string): 'default' | 'secondary' | 'destructive' => {
  const lagValue = parseInt(lag);
  
  if (lagValue === 0 || isNaN(lagValue)) {
    return 'default';
  } else if (lagValue > 100) {
    return 'destructive';
  } else {
    return 'secondary';
  }
};
