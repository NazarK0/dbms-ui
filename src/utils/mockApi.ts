/**
 * Mock API utilities для імітації backend запитів
 * Використовується для реалістичної поведінки до інтеграції з реальним backend
 */

/**
 * Конфігурація затримок для різних типів запитів
 */
export const API_DELAYS = {
  // Швидкі запити (отримання простих даних)
  fast: { min: 200, max: 500 },
  
  // Стандартні запити (отримання списків, таблиць)
  normal: { min: 500, max: 1200 },
  
  // Повільні запити (складні запити, аналітика)
  slow: { min: 1200, max: 2500 },
  
  // Дуже повільні запити (backup, export, import)
  verySlow: { min: 2500, max: 5000 },
} as const;

/**
 * Типи затримок
 */
export type DelayType = keyof typeof API_DELAYS;

/**
 * Отримати випадкову затримку в межах діапазону
 */
function getRandomDelay(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Імітація API запиту з випадковою затримкою
 * @param data - Дані для повернення
 * @param delayType - Тип затримки (fast, normal, slow, verySlow)
 * @param successRate - Ймовірність успіху (0-1), за замовчуванням 1 (завжди успішно)
 * @returns Promise з даними або помилкою
 */
export async function mockApiCall<T>(
  data: T,
  delayType: DelayType = 'normal',
  successRate: number = 1
): Promise<T> {
  const { min, max } = API_DELAYS[delayType];
  const delay = getRandomDelay(min, max);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Імітація можливих помилок
      const shouldSucceed = Math.random() < successRate;
      
      if (shouldSucceed) {
        resolve(data);
      } else {
        reject(new Error('Network error: Failed to fetch data'));
      }
    }, delay);
  });
}

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

/**
 * Імітація пагінованого API запиту
 */
export async function mockPaginatedApiCall<T>(
  allData: T[],
  page: number,
  pageSize: number,
  delayType: DelayType = 'normal'
): Promise<{
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = allData.slice(startIndex, endIndex);

  return mockApiCall({
    data: paginatedData,
    total: allData.length,
    page,
    pageSize,
    totalPages: Math.ceil(allData.length / pageSize),
  }, delayType);
}

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

/**
 * Імітація прогресу довготривалої операції (backup, export тощо)
 */
export async function mockProgressApiCall(
  onProgress: (progress: number) => void,
  totalDuration: number = 5000,
  updateInterval: number = 200
): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve) => {
    let progress = 0;
    const steps = totalDuration / updateInterval;
    const progressIncrement = 100 / steps;

    const interval = setInterval(() => {
      progress += progressIncrement;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        onProgress(100);
        resolve({
          success: true,
          message: 'Операція завершена успішно',
        });
      } else {
        onProgress(Math.min(progress, 100));
      }
    }, updateInterval);
  });
}

/**
 * Імітація batch запиту (отримання декількох ресурсів одночасно)
 */
export async function mockBatchApiCall<T extends Record<string, any>>(
  requests: { [K in keyof T]: () => Promise<T[K]> }
): Promise<T> {
  const keys = Object.keys(requests) as (keyof T)[];
  const promises = keys.map(key => requests[key]());
  
  const results = await Promise.all(promises);
  
  return keys.reduce((acc, key, index) => {
    acc[key] = results[index];
    return acc;
  }, {} as T);
}

/**
 * Хелпер для створення mock API endpoint
 */
export function createMockEndpoint<TRequest, TResponse>(
  handler: (request: TRequest) => TResponse,
  delayType: DelayType = 'normal'
) {
  return async (request: TRequest): Promise<TResponse> => {
    return mockApiCall(handler(request), delayType);
  };
}

/**
 * Симуляція помилок мережі з різними типами
 */
export enum NetworkErrorType {
  TIMEOUT = 'TIMEOUT',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  SERVER_ERROR = 'SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
}

export class MockNetworkError extends Error {
  constructor(
    public type: NetworkErrorType,
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'MockNetworkError';
  }
}

/**
 * Імітація помилки з певним типом
 */
export async function mockApiCallWithError<T>(
  errorType: NetworkErrorType,
  delay: number = 1000
): Promise<T> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      const errors = {
        [NetworkErrorType.TIMEOUT]: new MockNetworkError(
          NetworkErrorType.TIMEOUT,
          408,
          'Час очікування вичерпано'
        ),
        [NetworkErrorType.NOT_FOUND]: new MockNetworkError(
          NetworkErrorType.NOT_FOUND,
          404,
          'Ресурс не знайдено'
        ),
        [NetworkErrorType.UNAUTHORIZED]: new MockNetworkError(
          NetworkErrorType.UNAUTHORIZED,
          401,
          'Необхідна авторизація'
        ),
        [NetworkErrorType.SERVER_ERROR]: new MockNetworkError(
          NetworkErrorType.SERVER_ERROR,
          500,
          'Внутрішня помилка сервера'
        ),
        [NetworkErrorType.BAD_REQUEST]: new MockNetworkError(
          NetworkErrorType.BAD_REQUEST,
          400,
          'Невірний запит'
        ),
      };
      
      reject(errors[errorType]);
    }, delay);
  });
}
