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
