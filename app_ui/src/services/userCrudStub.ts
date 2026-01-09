/**
 * User CRUD Stub Service
 * Provides in-memory CRUD operations for User UI preview mode
 * Simulates backend API calls with realistic delays and responses
 */

import { mockMutationApiCall } from '../utils/mockApi/mockMutationApiCall';
import { mockDeleteApiCall } from '../utils/mockApi/mockDeleteApiCall';
import { mockApiCall } from '../utils/mockApi';
import type { DelayType } from '../utils/mockApi/constants';

// In-memory storage for preview mode
interface InMemoryDatabase {
  [database: string]: {
    [table: string]: Record<string, any>[];
  };
}

class UserCrudStubService {
  private storage: InMemoryDatabase = {};
  private recordIdCounter: number = 1000;

  /**
   * Initialize database and table if not exists
   */
  private initStorage(database: string, table: string): void {
    if (!this.storage[database]) {
      this.storage[database] = {};
    }
    if (!this.storage[database][table]) {
      this.storage[database][table] = this.generateMockRecords(table);
    }
  }

  /**
   * Generate mock records for a table
   */
  private generateMockRecords(table: string): Record<string, any>[] {
    const mockRecords: Record<string, any>[] = [];
    const recordCount = Math.floor(Math.random() * 15) + 5; // 5-20 records

    for (let i = 0; i < recordCount; i++) {
      mockRecords.push({
        id: this.recordIdCounter++,
        name: `${table} Record ${i + 1}`,
        description: `Це тестовий запис #${i + 1} в таблиці ${table}`,
        created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
        status: ['active', 'pending', 'archived'][Math.floor(Math.random() * 3)],
        priority: Math.floor(Math.random() * 5) + 1,
      });
    }

    return mockRecords;
  }

  /**
   * GET - Read all records from a table
   */
  async getRecords(
    database: string,
    table: string,
    options?: {
      limit?: number;
      offset?: number;
      orderBy?: string;
      orderDir?: 'asc' | 'desc';
      filters?: Record<string, any>;
    }
  ): Promise<{ data: Record<string, any>[]; total: number }> {
    this.initStorage(database, table);

    let records = [...this.storage[database][table]];

    // Apply filters
    if (options?.filters) {
      Object.keys(options.filters).forEach((key) => {
        const value = options.filters![key];
        if (value !== undefined && value !== null && value !== '') {
          records = records.filter((record) => 
            String(record[key]).toLowerCase().includes(String(value).toLowerCase())
          );
        }
      });
    }

    const total = records.length;

    // Apply sorting
    if (options?.orderBy) {
      records.sort((a, b) => {
        const aVal = a[options.orderBy!];
        const bVal = b[options.orderBy!];
        const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        return options.orderDir === 'desc' ? -comparison : comparison;
      });
    }

    // Apply pagination
    if (options?.offset !== undefined || options?.limit !== undefined) {
      const offset = options.offset || 0;
      const limit = options.limit || records.length;
      records = records.slice(offset, offset + limit);
    }

    return mockApiCall({ data: records, total }, 'normal');
  }

  /**
   * GET - Read a single record by ID
   */
  async getRecord(
    database: string,
    table: string,
    id: string | number
  ): Promise<Record<string, any> | null> {
    this.initStorage(database, table);

    const record = this.storage[database][table].find(
      (r) => String(r.id) === String(id)
    );

    return mockApiCall(record || null, 'fast');
  }

  /**
   * POST - Create a new record
   */
  async createRecord(
    database: string,
    table: string,
    data: Record<string, any>
  ): Promise<{ success: boolean; data: Record<string, any>; message: string }> {
    this.initStorage(database, table);

    const newRecord = {
      id: this.recordIdCounter++,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.storage[database][table].push(newRecord);

    return mockMutationApiCall(newRecord, 'normal', 0.98);
  }

  /**
   * PUT/PATCH - Update an existing record
   */
  async updateRecord(
    database: string,
    table: string,
    id: string | number,
    data: Record<string, any>
  ): Promise<{ success: boolean; data: Record<string, any>; message: string }> {
    this.initStorage(database, table);

    const index = this.storage[database][table].findIndex(
      (r) => String(r.id) === String(id)
    );

    if (index === -1) {
      throw new Error(`Запис з ID ${id} не знайдено`);
    }

    const updatedRecord = {
      ...this.storage[database][table][index],
      ...data,
      id: this.storage[database][table][index].id, // Preserve original ID
      updated_at: new Date().toISOString(),
    };

    this.storage[database][table][index] = updatedRecord;

    return mockMutationApiCall(updatedRecord, 'normal', 0.98);
  }

  /**
   * DELETE - Delete a record
   */
  async deleteRecord(
    database: string,
    table: string,
    id: string | number
  ): Promise<{ success: boolean; message: string }> {
    this.initStorage(database, table);

    const index = this.storage[database][table].findIndex(
      (r) => String(r.id) === String(id)
    );

    if (index === -1) {
      throw new Error(`Запис з ID ${id} не знайдено`);
    }

    this.storage[database][table].splice(index, 1);

    return mockDeleteApiCall(id, 'fast', 0.98);
  }

  /**
   * Batch operations
   */
  async deleteRecords(
    database: string,
    table: string,
    ids: (string | number)[]
  ): Promise<{ success: boolean; message: string; deletedCount: number }> {
    this.initStorage(database, table);

    let deletedCount = 0;

    ids.forEach((id) => {
      const index = this.storage[database][table].findIndex(
        (r) => String(r.id) === String(id)
      );
      if (index !== -1) {
        this.storage[database][table].splice(index, 1);
        deletedCount++;
      }
    });

    return mockApiCall(
      {
        success: true,
        message: `Видалено ${deletedCount} з ${ids.length} записів`,
        deletedCount,
      },
      'normal'
    );
  }

  /**
   * Reset storage (for testing purposes)
   */
  resetStorage(): void {
    this.storage = {};
    this.recordIdCounter = 1000;
  }

  /**
   * Get storage state (for debugging)
   */
  getStorageState(): InMemoryDatabase {
    return JSON.parse(JSON.stringify(this.storage));
  }
}

// Export singleton instance
export const userCrudStub = new UserCrudStubService();
