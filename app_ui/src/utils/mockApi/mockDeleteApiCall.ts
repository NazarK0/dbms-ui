import { API_DELAYS, type DelayType } from './constants';
import { getRandomDelay } from './helpers';

/**
 * Імітація запиту на видалення
 */
export async function mockDeleteApiCall(
  id: string | number,
  delayType: DelayType = 'fast',
  successRate: number = 0.95
): Promise<{ success: boolean; message: string }> {
  const { min, max } = API_DELAYS[delayType];
  const delay = getRandomDelay(min, max);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldSucceed = Math.random() < successRate;
      
      if (shouldSucceed) {
        resolve({
          success: true,
          message: `Запис ${id} успішно видалено`,
        });
      } else {
        reject({
          success: false,
          message: 'Помилка видалення запису',
          error: 'Network error',
        });
      }
    }, delay);
  });
}
