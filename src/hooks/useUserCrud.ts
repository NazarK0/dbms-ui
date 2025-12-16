/**
 * useUserCrud Hook
 * Provides CRUD operations for User UI
 * Automatically switches between stub (preview mode) and real API
 */

import { useUserPreview } from '../contexts/UserPreviewContext';
import { userCrudStub } from '../services/userCrudStub';

export interface CrudOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDir?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface CrudResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface RecordsResponse {
  data: Record<string, any>[];
  total: number;
}

/**
 * Hook for CRUD operations
 * In preview mode: uses in-memory stub service
 * In production mode: uses real API endpoints (to be implemented)
 */
export function useUserCrud() {
  const { config } = useUserPreview();
  const isPreviewMode = config.isPreviewMode;

  /**
   * GET all records
   */
  const getRecords = async (
    database: string,
    table: string,
    options?: CrudOptions
  ): Promise<RecordsResponse> => {
    if (isPreviewMode) {
      return userCrudStub.getRecords(database, table, options);
    }

    // TODO: Real API implementation
    // return fetch(`/api/databases/${database}/tables/${table}/records`, {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(options),
    // }).then(res => res.json());

    throw new Error('Real API not implemented yet');
  };

  /**
   * GET single record
   */
  const getRecord = async (
    database: string,
    table: string,
    id: string | number
  ): Promise<Record<string, any> | null> => {
    if (isPreviewMode) {
      return userCrudStub.getRecord(database, table, id);
    }

    // TODO: Real API implementation
    // return fetch(`/api/databases/${database}/tables/${table}/records/${id}`)
    //   .then(res => res.json());

    throw new Error('Real API not implemented yet');
  };

  /**
   * POST - Create record
   */
  const createRecord = async (
    database: string,
    table: string,
    data: Record<string, any>
  ): Promise<CrudResponse<Record<string, any>>> => {
    if (isPreviewMode) {
      try {
        const result = await userCrudStub.createRecord(database, table, data);
        return {
          success: result.success,
          data: result.data,
          message: result.message,
        };
      } catch (error: any) {
        return {
          success: false,
          error: error.message || 'Помилка створення запису',
        };
      }
    }

    // TODO: Real API implementation
    // return fetch(`/api/databases/${database}/tables/${table}/records`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // }).then(res => res.json());

    throw new Error('Real API not implemented yet');
  };

  /**
   * PUT/PATCH - Update record
   */
  const updateRecord = async (
    database: string,
    table: string,
    id: string | number,
    data: Record<string, any>
  ): Promise<CrudResponse<Record<string, any>>> => {
    if (isPreviewMode) {
      try {
        const result = await userCrudStub.updateRecord(database, table, id, data);
        return {
          success: result.success,
          data: result.data,
          message: result.message,
        };
      } catch (error: any) {
        return {
          success: false,
          error: error.message || 'Помилка оновлення запису',
        };
      }
    }

    // TODO: Real API implementation
    // return fetch(`/api/databases/${database}/tables/${table}/records/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // }).then(res => res.json());

    throw new Error('Real API not implemented yet');
  };

  /**
   * DELETE - Delete record
   */
  const deleteRecord = async (
    database: string,
    table: string,
    id: string | number
  ): Promise<CrudResponse<void>> => {
    if (isPreviewMode) {
      try {
        const result = await userCrudStub.deleteRecord(database, table, id);
        return {
          success: result.success,
          message: result.message,
        };
      } catch (error: any) {
        return {
          success: false,
          error: error.message || 'Помилка видалення запису',
        };
      }
    }

    // TODO: Real API implementation
    // return fetch(`/api/databases/${database}/tables/${table}/records/${id}`, {
    //   method: 'DELETE',
    // }).then(res => res.json());

    throw new Error('Real API not implemented yet');
  };

  /**
   * DELETE multiple records
   */
  const deleteRecords = async (
    database: string,
    table: string,
    ids: (string | number)[]
  ): Promise<CrudResponse<{ deletedCount: number }>> => {
    if (isPreviewMode) {
      try {
        const result = await userCrudStub.deleteRecords(database, table, ids);
        return {
          success: result.success,
          message: result.message,
          data: { deletedCount: result.deletedCount },
        };
      } catch (error: any) {
        return {
          success: false,
          error: error.message || 'Помилка видалення записів',
        };
      }
    }

    // TODO: Real API implementation
    // return fetch(`/api/databases/${database}/tables/${table}/records/batch`, {
    //   method: 'DELETE',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ids }),
    // }).then(res => res.json());

    throw new Error('Real API not implemented yet');
  };

  return {
    getRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord,
    deleteRecords,
    isPreviewMode,
  };
}
