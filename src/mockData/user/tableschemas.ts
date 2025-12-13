// Mock data for table schemas used in user interface

export interface TableColumn {
  name: string;
  type: string;
  nullable?: boolean;
  required?: boolean;
  autoIncrement?: boolean;
  primaryKey?: boolean;
  enumValues?: string[]; // For enum types
  min?: number; // For numeric types
  max?: number; // For numeric types
  systemGenerated?: boolean; // For system-generated fields like created_at, updated_at
}

export interface TableRecord {
  id: number;
  [key: string]: any;
}

export interface TableSchema {
  columns: TableColumn[];
  data: TableRecord[];
}

export const tableSchemas: Record<string, TableSchema> = {
  users: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'email', type: 'varchar', required: true },
      { name: 'name', type: 'varchar', required: true },
      { name: 'role', type: 'varchar', required: false },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
      { name: 'attachments', type: 'array', required: false },
    ],
    data: [
      { id: 1, email: 'john.doe@example.com', name: 'John Doe', role: 'admin', created_at: '2024-01-15 10:30:00', attachments: ['resume.pdf', 'certificate.jpg'] },
      { id: 2, email: 'jane.smith@example.com', name: 'Jane Smith', role: 'user', created_at: '2024-01-16 14:20:00', attachments: [] },
      { id: 3, email: 'bob.johnson@example.com', name: 'Bob Johnson', role: 'user', created_at: '2024-01-17 09:15:00', attachments: ['contract.pdf'] },
      { id: 4, email: 'alice.williams@example.com', name: 'Alice Williams', role: 'moderator', created_at: '2024-01-18 11:45:00', attachments: ['photo.jpg', 'docs.docx', 'data.xlsx'] },
      { id: 5, email: 'charlie.brown@example.com', name: 'Charlie Brown', role: 'user', created_at: '2024-01-19 16:00:00', attachments: [] },
      { id: 42, email: 'test.user@example.com', name: 'Test User', role: 'developer', created_at: '2024-02-10 14:20:00', attachments: ['report.pdf'] },
      { id: 43, email: 'new.user@example.com', name: 'New User', role: 'user', created_at: '2024-02-10 16:30:00', attachments: [] },
    ],
  },
  orders: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'user_id', type: 'integer', required: true },
      { name: 'product_name', type: 'varchar', required: true },
      { name: 'quantity', type: 'integer', required: true },
      { name: 'total_price', type: 'decimal', required: true },
      { name: 'status', type: 'varchar', required: true },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, user_id: 1, product_name: 'Laptop', quantity: 1, total_price: '1299.99', status: 'completed', created_at: '2024-02-01 10:00:00' },
      { id: 2, user_id: 2, product_name: 'Mouse', quantity: 2, total_price: '49.98', status: 'pending', created_at: '2024-02-02 11:30:00' },
      { id: 3, user_id: 1, product_name: 'Keyboard', quantity: 1, total_price: '89.99', status: 'completed', created_at: '2024-02-03 14:15:00' },
      { id: 4, user_id: 3, product_name: 'Monitor', quantity: 1, total_price: '349.99', status: 'shipped', created_at: '2024-02-04 09:20:00' },
      { id: 158, user_id: 5, product_name: 'Headphones', quantity: 1, total_price: '199.99', status: 'pending', created_at: '2024-02-10 11:15:00' },
    ],
  },
  products: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'name', type: 'varchar', required: true },
      { name: 'description', type: 'text', required: false },
      { name: 'price', type: 'decimal', required: true },
      { name: 'stock', type: 'integer', required: true },
      { name: 'category', type: 'varchar', required: false },
    ],
    data: [
      { id: 1, name: 'Laptop', description: 'High-performance laptop', price: '1299.99', stock: 15, category: 'Electronics' },
      { id: 2, name: 'Mouse', description: 'Wireless mouse', price: '24.99', stock: 50, category: 'Accessories' },
      { id: 3, name: 'Keyboard', description: 'Mechanical keyboard', price: '89.99', stock: 30, category: 'Accessories' },
      { id: 4, name: 'Monitor', description: '27-inch 4K monitor', price: '349.99', stock: 20, category: 'Electronics' },
    ],
  },
  audit_logs: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'user_id', type: 'integer', required: true },
      { name: 'action', type: 'varchar', required: true },
      { name: 'table_name', type: 'varchar', required: true },
      { name: 'record_id', type: 'integer', required: false },
      { name: 'timestamp', type: 'timestamp', required: true },
    ],
    data: [
      { id: 1, user_id: 1, action: 'CREATE', table_name: 'users', record_id: 5, timestamp: '2024-01-19 16:00:00' },
      { id: 2, user_id: 2, action: 'UPDATE', table_name: 'orders', record_id: 2, timestamp: '2024-02-02 11:35:00' },
      { id: 3, user_id: 1, action: 'DELETE', table_name: 'products', record_id: 10, timestamp: '2024-02-03 15:20:00' },
    ],
  },
};

// Simple table schema for CreateRecord and EditRecord components
export const simpleTableSchema: TableColumn[] = [
  { name: 'id', type: 'integer', nullable: false, autoIncrement: true, primaryKey: true },
  { name: 'title', type: 'varchar(255)', nullable: false, autoIncrement: false, primaryKey: false },
  { name: 'description', type: 'text', nullable: true, autoIncrement: false, primaryKey: false },
  { name: 'status', type: 'enum', nullable: false, autoIncrement: false, primaryKey: false, enumValues: ['draft', 'active', 'pending', 'completed', 'archived'] },
  { name: 'priority', type: 'enum', nullable: true, autoIncrement: false, primaryKey: false, enumValues: ['low', 'medium', 'high', 'urgent'] },
  { name: 'price', type: 'decimal', nullable: true, autoIncrement: false, primaryKey: false, min: 0 },
  { name: 'quantity', type: 'integer', nullable: true, autoIncrement: false, primaryKey: false, min: 0, max: 1000 },
  { name: 'is_active', type: 'boolean', nullable: false, autoIncrement: false, primaryKey: false },
  { name: 'start_date', type: 'date', nullable: true, autoIncrement: false, primaryKey: false },
  { name: 'end_date', type: 'date', nullable: true, autoIncrement: false, primaryKey: false },
  { name: 'created_at', type: 'timestamp', nullable: true, autoIncrement: false, primaryKey: false, systemGenerated: true },
];

// Default schema for unknown tables
export const defaultTableSchema: TableSchema = {
  columns: [
    { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
    { name: 'data', type: 'text', required: false },
  ],
  data: [],
};