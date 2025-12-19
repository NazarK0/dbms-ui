/**
 * Parse time range value to readable format
 */
export const getTimeRangeLabel = (timeRange: string): string => {
  switch (timeRange) {
    case '15m':
      return 'Останні 15 хвилин';
    case '1h':
      return 'Остання година';
    case '24h':
      return 'Останні 24 години';
    case '7d':
      return 'Останні 7 днів';
    default:
      return timeRange;
  }
};
