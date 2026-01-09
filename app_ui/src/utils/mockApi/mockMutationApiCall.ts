import { API_DELAYS, type DelayType } from './constants';
import { getRandomDelay } from './helpers';

/**
 * Імітація запиту на створення/оновлення даних
 */
export async function mockMutationApiCall<T>(
  data: T,
  delayType: DelayType = 'normal',
  successRate: number = 0.95
): Promise<{ success: boolean; data: T; message: string }> {
  const { min, max } = API_DELAYS[delayType];
  const delay = getRandomDelay(min, max);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldSucceed = Math.random() < successRate;
      
      if (shouldSucceed) {
        resolve({
          success: true,
          data,
          message: 'Операція виконана успішно',
        });
      } else {
        reject({
          success: false,
          message: 'Помилка виконання операції',
          error: 'Network error',
        });
      }
    }, delay);
  });
}
