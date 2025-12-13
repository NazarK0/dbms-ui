// Table Browser Mock Data

export interface TableColumn {
  column: string;
  type: string;
  nullable: boolean;
  default: string | null;
  key: '' | 'PRI' | 'UNI' | 'FOR';
}

export interface TableSchema {
  [tableName: string]: TableColumn[];
}

export interface TableData {
  [tableName: string]: any[];
}

export const tables = ['users', 'orders', 'products', 'customers', 'payments', 'invoices', 'shipping'];

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
    { column: 'category_id', type: 'integer', nullable: true, default: null, key: 'FOR' },
  ],
  customers: [
    { column: 'id', type: 'integer', nullable: false, default: 'nextval()', key: 'PRI' },
    { column: 'name', type: 'varchar(255)', nullable: false, default: null, key: '' },
    { column: 'email', type: 'varchar(255)', nullable: false, default: null, key: 'UNI' },
    { column: 'phone', type: 'varchar(50)', nullable: true, default: null, key: '' },
    { column: 'address', type: 'text', nullable: true, default: null, key: '' },
  ],
  payments: [
    { column: 'id', type: 'integer', nullable: false, default: 'nextval()', key: 'PRI' },
    { column: 'order_id', type: 'integer', nullable: false, default: null, key: 'FOR' },
    { column: 'amount', type: 'decimal(10,2)', nullable: false, default: null, key: '' },
    { column: 'method', type: 'varchar(50)', nullable: false, default: null, key: '' },
    { column: 'status', type: 'varchar(50)', nullable: false, default: "'pending'", key: '' },
    { column: 'processed_at', type: 'timestamp', nullable: true, default: null, key: '' },
  ],
  invoices: [
    { column: 'id', type: 'integer', nullable: false, default: 'nextval()', key: 'PRI' },
    { column: 'order_id', type: 'integer', nullable: false, default: null, key: 'FOR' },
    { column: 'invoice_number', type: 'varchar(100)', nullable: false, default: null, key: 'UNI' },
    { column: 'issued_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP', key: '' },
    { column: 'due_at', type: 'timestamp', nullable: false, default: null, key: '' },
  ],
  shipping: [
    { column: 'id', type: 'integer', nullable: false, default: 'nextval()', key: 'PRI' },
    { column: 'order_id', type: 'integer', nullable: false, default: null, key: 'FOR' },
    { column: 'tracking_number', type: 'varchar(100)', nullable: true, default: null, key: '' },
    { column: 'carrier', type: 'varchar(100)', nullable: false, default: null, key: '' },
    { column: 'shipped_at', type: 'timestamp', nullable: true, default: null, key: '' },
    { column: 'delivered_at', type: 'timestamp', nullable: true, default: null, key: '' },
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
    { id: 1, name: 'Laptop', description: 'Gaming laptop', price: '1299.99', stock: 15, category_id: 1 },
    { id: 2, name: 'Mouse', description: 'Wireless mouse', price: '29.99', stock: 150, category_id: 1 },
    { id: 3, name: 'Keyboard', description: 'Mechanical keyboard', price: '89.99', stock: 75, category_id: 1 },
  ],
  customers: [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', address: '123 Main St' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', address: '456 Oak Ave' },
  ],
  payments: [
    { id: 1, order_id: 1, amount: '149.99', method: 'credit_card', status: 'completed', processed_at: '2024-01-20 10:30:00' },
    { id: 2, order_id: 2, amount: '89.50', method: 'paypal', status: 'pending', processed_at: null },
  ],
  invoices: [
    { id: 1, order_id: 1, invoice_number: 'INV-2024-001', issued_at: '2024-01-20', due_at: '2024-02-20' },
    { id: 2, order_id: 2, invoice_number: 'INV-2024-002', issued_at: '2024-01-21', due_at: '2024-02-21' },
  ],
  shipping: [
    { id: 1, order_id: 3, tracking_number: 'TRK123456', carrier: 'FedEx', shipped_at: '2024-01-22 14:00:00', delivered_at: null },
  ],
};
