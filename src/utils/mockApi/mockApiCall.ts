import { API_DELAYS, type DelayType } from './constants';
import { getRandomDelay } from './helpers';

/**
 * Імітація API запиту з фіксованою затримкою (в мілісекундах)
 * @param endpoint - Назва endpoint (для логування)
 * @param params - Параметри запиту
 * @param delay - Фіксована затримка в мілісекундах
 * @param successRate - Ймовірність успіху (0-1)
 * @returns Promise з даними
 */
export async function mockApiCall<T = any>(
  endpoint: string,
  params: Record<string, any>,
  delay: number,
  successRate?: number
): Promise<T>;

/**
 * Імітація API запиту з випадковою затримкою
 * @param data - Дані для повернення
 * @param delayType - Тип затримки (fast, normal, slow, verySlow)
 * @param successRate - Ймовірність успіху (0-1), за замовчуванням 1 (завжди успішно)
 * @returns Promise з даними або помилкою
 */
export async function mockApiCall<T>(
  data: T,
  delayType: DelayType,
  successRate?: number
): Promise<T>;

/**
 * Реалізація mockApiCall з перевантаженнями
 */
export async function mockApiCall<T = any>(
  dataOrEndpoint: T | string,
  delayTypeOrParams: DelayType | Record<string, any> = 'normal',
  delayOrSuccessRate: number = 1,
  successRate: number = 1
): Promise<T> {
  let actualDelay: number;
  let actualSuccessRate: number;
  let actualData: T;

  // Перевірка чи це виклик з endpoint + params + delay
  if (typeof dataOrEndpoint === 'string') {
    // Endpoint-based call: mockApiCall('endpoint', {params}, 900)
    actualDelay = delayOrSuccessRate;
    actualSuccessRate = successRate;
    actualData = {} as T; // Повертаємо порожній об'єкт, реальні дані встановлюються в компоненті
  } else if (typeof delayTypeOrParams === 'string') {
    // DelayType-based call: mockApiCall(data, 'normal')
    const delayType = delayTypeOrParams as DelayType;
    const { min, max } = API_DELAYS[delayType];
    actualDelay = getRandomDelay(min, max);
    actualSuccessRate = delayOrSuccessRate;
    actualData = dataOrEndpoint;
  } else {
    // Fallback - не повинно статися
    actualDelay = 500;
    actualSuccessRate = 1;
    actualData = dataOrEndpoint;
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Імітація можливих помилок
      const shouldSucceed = Math.random() < actualSuccessRate;
      
      if (shouldSucceed) {
        resolve(actualData);
      } else {
        reject(new Error('Network error: Failed to fetch data'));
      }
    }, actualDelay);
  });
}
