/**
 * Query History Utilities
 * ========================
 * 
 * Функції для роботи з історією запитів (фільтрація, сортування).
 */

import { QueryHistoryItem } from '../types';

/**
 * Типи сортування історії
 */
export type HistorySortBy = 'time' | 'duration' | 'status';

/**
 * Фільтрує історію запитів за пошуковим запитом
 * 
 * @param history - Масив елементів історії
 * @param searchTerm - Пошуковий термін
 * @returns Відфільтрований масив історії
 * 
 * @example
 * ```typescript
 * const history = [
 *   { query: 'SELECT * FROM users', database: 'production' },
 *   { query: 'UPDATE orders SET status = "done"', database: 'staging' }
 * ];
 * 
 * filterQueryHistory(history, 'users');
 * // [{ query: 'SELECT * FROM users', database: 'production' }]
 * 
 * filterQueryHistory(history, 'staging');
 * // [{ query: 'UPDATE orders...', database: 'staging' }]
 * ```
 */
export function filterQueryHistory(
  history: QueryHistoryItem[],
  searchTerm: string
): QueryHistoryItem[] {
  if (!searchTerm.trim()) {
    return history;
  }
  
  const lowerSearch = searchTerm.toLowerCase();
  return history.filter(item =>
    item.query.toLowerCase().includes(lowerSearch) ||
    item.database?.toLowerCase().includes(lowerSearch)
  );
}

/**
 * Сортує історію запитів за заданим критерієм
 * 
 * @param history - Масив елементів історії
 * @param sortBy - Критерій сортування ('time', 'duration', 'status')
 * @returns Відсортований масив історії
 * 
 * @example
 * ```typescript
 * const history = [
 *   { time: '2024-12-15T10:00:00Z', duration: '100мс', status: 'success' },
 *   { time: '2024-12-15T09:00:00Z', duration: '2.5с', status: 'error' }
 * ];
 * 
 * sortQueryHistory(history, 'time');
 * // [newer first, older last]
 * 
 * sortQueryHistory(history, 'duration');
 * // [slower first, faster last]
 * ```
 */
export function sortQueryHistory(
  history: QueryHistoryItem[],
  sortBy: HistorySortBy
): QueryHistoryItem[] {
  return [...history].sort((a, b) => {
    switch (sortBy) {
      case 'time':
        return new Date(b.time).getTime() - new Date(a.time).getTime();
      case 'duration':
        return parseDuration(b.duration) - parseDuration(a.duration);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });
}

/**
 * Парсить тривалість з рядка в мілісекунди
 * 
 * @param duration - Рядок тривалості (наприклад, "150мс", "2.5с")
 * @returns Тривалість в мілісекундах
 * 
 * @example
 * ```typescript
 * parseDuration('150мс'); // 150
 * parseDuration('2.5с'); // 2500
 * parseDuration('0.5с'); // 500
 * parseDuration('invalid'); // 0
 * ```
 */
export function parseDuration(duration: string): number {
  const match = duration.match(/([\d.]+)(мс|с)/);
  if (!match) return 0;
  
  const value = parseFloat(match[1]);
  const unit = match[2];
  
  return unit === 'с' ? value * 1000 : value;
}

/**
 * Групує історію запитів за датою
 * 
 * @param history - Масив елементів історії
 * @returns Об'єкт з групами історії по датах
 * 
 * @example
 * ```typescript
 * const history = [
 *   { time: '2024-12-15T10:00:00Z', query: 'SELECT...' },
 *   { time: '2024-12-15T11:00:00Z', query: 'UPDATE...' },
 *   { time: '2024-12-14T10:00:00Z', query: 'DELETE...' }
 * ];
 * 
 * groupHistoryByDate(history);
 * // {
 * //   '2024-12-15': [item1, item2],
 * //   '2024-12-14': [item3]
 * // }
 * ```
 */
export function groupHistoryByDate(
  history: QueryHistoryItem[]
): Record<string, QueryHistoryItem[]> {
  const grouped: Record<string, QueryHistoryItem[]> = {};
  
  history.forEach(item => {
    const date = new Date(item.time).toISOString().split('T')[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });
  
  return grouped;
}

/**
 * Групує історію запитів за статусом
 * 
 * @param history - Масив елементів історії
 * @returns Об'єкт з групами історії по статусах
 * 
 * @example
 * ```typescript
 * const history = [
 *   { status: 'success', query: 'SELECT...' },
 *   { status: 'success', query: 'UPDATE...' },
 *   { status: 'error', query: 'DELETE...' }
 * ];
 * 
 * groupHistoryByStatus(history);
 * // {
 * //   success: [item1, item2],
 * //   error: [item3]
 * // }
 * ```
 */
export function groupHistoryByStatus(
  history: QueryHistoryItem[]
): Record<string, QueryHistoryItem[]> {
  const grouped: Record<string, QueryHistoryItem[]> = {};
  
  history.forEach(item => {
    const status = item.status;
    if (!grouped[status]) {
      grouped[status] = [];
    }
    grouped[status].push(item);
  });
  
  return grouped;
}

/**
 * Отримує статистику по історії запитів
 * 
 * @param history - Масив елементів історії
 * @returns Об'єкт зі статистикою
 * 
 * @example
 * ```typescript
 * const stats = getHistoryStats(history);
 * // {
 * //   total: 10,
 * //   successful: 8,
 * //   failed: 2,
 * //   averageDuration: 1250, // в мілісекундах
 * //   slowestQuery: { ... },
 * //   fastestQuery: { ... }
 * // }
 * ```
 */
export function getHistoryStats(history: QueryHistoryItem[]): {
  total: number;
  successful: number;
  failed: number;
  averageDuration: number;
  slowestQuery?: QueryHistoryItem;
  fastestQuery?: QueryHistoryItem;
} {
  const total = history.length;
  const successful = history.filter(item => item.status === 'success').length;
  const failed = total - successful;
  
  if (total === 0) {
    return {
      total: 0,
      successful: 0,
      failed: 0,
      averageDuration: 0,
    };
  }
  
  const durations = history.map(item => parseDuration(item.duration));
  const averageDuration = durations.reduce((sum, d) => sum + d, 0) / total;
  
  const maxDuration = Math.max(...durations);
  const minDuration = Math.min(...durations);
  
  const slowestQuery = history.find(
    item => parseDuration(item.duration) === maxDuration
  );
  const fastestQuery = history.find(
    item => parseDuration(item.duration) === minDuration
  );
  
  return {
    total,
    successful,
    failed,
    averageDuration,
    slowestQuery,
    fastestQuery,
  };
}
