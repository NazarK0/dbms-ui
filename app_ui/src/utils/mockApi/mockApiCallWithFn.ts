import { API_DELAYS, type DelayType } from './constants';
import { getRandomDelay } from './helpers';

/**
 * Імітація API запиту з функцією-генератором даних
 * Корисно коли дані потрібно генерувати динамічно
 */
export async function mockApiCallWithFn<T>(
  dataFn: () => T,
  delayType: DelayType = 'normal',
  successRate: number = 1
): Promise<T> {
  const { min, max } = API_DELAYS[delayType];
  const delay = getRandomDelay(min, max);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldSucceed = Math.random() < successRate;
      
      if (shouldSucceed) {
        resolve(dataFn());
      } else {
        reject(new Error('Network error: Failed to fetch data'));
      }
    }, delay);
  });
}
