/**
 * Get performance status based on cache hit ratio
 */
export const getPerformanceStatus = (hitRatio: number): {
  status: 'excellent' | 'good' | 'fair' | 'poor';
  label: string;
  color: string;
} => {
  if (hitRatio >= 95) {
    return { status: 'excellent', label: 'Відмінно', color: 'green' };
  }
  if (hitRatio >= 85) {
    return { status: 'good', label: 'Добре', color: 'blue' };
  }
  if (hitRatio >= 70) {
    return { status: 'fair', label: 'Задовільно', color: 'yellow' };
  }
  return { status: 'poor', label: 'Погано', color: 'red' };
};
