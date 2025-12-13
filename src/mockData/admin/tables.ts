// Mock data for database tables (Admin)

export interface TableColumn {
  column: string;
  type: string;
  nullable: boolean;
  default: string | null;
  key: 'PRI' | 'UNI' | 'FOR' | '';
}

export interface TableRow {
  [key: string]: any;
}

export const tablesList: string[] = ['users', 'orders', 'products', 'customers', 'payments', 'invoices', 'shipping'];

export const tableSchemas: Record<string, TableColumn[]> = {
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
    { column: 'price', type: 'decimal(10,2)', nullable: false, default: null, key: '' },
    { column: 'stock', type: 'integer', nullable: false, default: '0', key: '' },
    { column: 'category', type: 'varchar(100)', nullable: true, default: null, key: '' },
  ],
};

export const tableData: Record<string, TableRow[]> = {
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
    { id: 1, name: 'Laptop', price: '999.99', stock: 15, category: 'Electronics' },
    { id: 2, name: 'Mouse', price: '29.99', stock: 50, category: 'Accessories' },
    { id: 3, name: 'Keyboard', price: '79.99', stock: 30, category: 'Accessories' },
  ],
};
