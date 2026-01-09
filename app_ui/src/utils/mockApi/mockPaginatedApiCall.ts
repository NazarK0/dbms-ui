import type { DelayType } from './constants';
import { mockApiCall } from './mockApiCall';

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
