/**
 * Mock data for Table Browser
 */

import type { TableSchema, TableData } from './types';

export const tables: string[] = [
  'users',
  'orders',
  'products',
  'customers',
  'payments',
  'invoices',
  'shipping',
];

export const tableSchema: TableSchema = {
  users: [
    { column: 'id', type: 'integer', nullable: false, default: 'nextval()', key: 'PRI' },
    { column: 'username', type: 'varchar(255)', nullable: false, default: null, key: 'UNI' },
    { column: 'email', type: 'varchar(255)', nullable: false, default: null, key: 'UNI' },
    { column: 'password_hash', type: 'varchar(255)', nullable: false, default: null, key: '' },
    { column: 'created_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP', key: '' },
    { column: 'updated_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP', key: '' },
    { column: 'status', type: 'varchar(50)', nullable: false, default: "'active'", key: '' },
  ],
  orders: [
    { column: 'id', type: 'integer', nullable: false, default: 'nextval()', key: 'PRI' },
    { column: 'user_id', type: 'integer', nullable: false, default: null, key: 'FOR' },
    { column: 'total_amount', type: 'decimal(10,2)', nullable: false, default: null, key: '' },
    { column: 'status', type: 'varchar(50)', nullable: false, default: "'pending'", key: '' },
    { column: 'created_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP', key: '' },
  ],
  products: [
    { column: 'id', type: 'integer', nullable: false, default: 'nextval()', key: 'PRI' },
    { column: 'name', type: 'varchar(255)', nullable: false, default: null, key: '' },
    { column: 'description', type: 'text', nullable: true, default: null, key: '' },
    { column: 'price', type: 'decimal(10,2)', nullable: false, default: null, key: '' },
    { column: 'stock', type: 'integer', nullable: false, default: '0', key: '' },
    { column: 'created_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP', key: '' },
  ],
  customers: [
    { column: 'id', type: 'integer', nullable: false, default: 'nextval()', key: 'PRI' },
    { column: 'first_name', type: 'varchar(100)', nullable: false, default: null, key: '' },
    { column: 'last_name', type: 'varchar(100)', nullable: false, default: null, key: '' },
    { column: 'email', type: 'varchar(255)', nullable: false, default: null, key: 'UNI' },
    { column: 'phone', type: 'varchar(20)', nullable: true, default: null, key: '' },
    { column: 'address', type: 'text', nullable: true, default: null, key: '' },
  ],
};

export const tableData: TableData = {
  users: [
    { id: 1, username: 'john_doe', email: 'john@example.com', password_hash: '***', created_at: '2024-01-15', updated_at: '2024-01-15', status: 'active' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', password_hash: '***', created_at: '2024-01-16', updated_at: '2024-01-16', status: 'active' },
    { id: 3, username: 'bob_wilson', email: 'bob@example.com', password_hash: '***', created_at: '2024-01-17', updated_at: '2024-01-17', status: 'inactive' },
  ],
  orders: [
    { id: 1, user_id: 1, total_amount: '149.99', status: 'completed', created_at: '2024-01-20' },
    { id: 2, user_id: 2, total_amount: '89.50', status: 'pending', created_at: '2024-01-21' },
    { id: 3, user_id: 1, total_amount: '299.00', status: 'shipped', created_at: '2024-01-22' },
  ],
  products: [
    { id: 1, name: 'Laptop', description: 'High-performance laptop', price: '1299.99', stock: 15, created_at: '2024-01-10' },
    { id: 2, name: 'Mouse', description: 'Wireless optical mouse', price: '29.99', stock: 50, created_at: '2024-01-11' },
    { id: 3, name: 'Keyboard', description: 'Mechanical keyboard', price: '89.99', stock: 30, created_at: '2024-01-12' },
  ],
  customers: [
    { id: 1, first_name: 'Alice', last_name: 'Johnson', email: 'alice@example.com', phone: '+1234567890', address: '123 Main St' },
    { id: 2, first_name: 'Charlie', last_name: 'Brown', email: 'charlie@example.com', phone: '+1987654321', address: '456 Oak Ave' },
    { id: 3, first_name: 'Diana', last_name: 'Prince', email: 'diana@example.com', phone: null, address: '789 Elm Rd' },
  ],
};
