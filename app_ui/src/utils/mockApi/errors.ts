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
