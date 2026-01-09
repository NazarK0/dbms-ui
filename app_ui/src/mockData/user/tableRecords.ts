/**
 * Mock data for table records (rows of data)
 * This represents actual data in database tables that users can view/edit
 */

export interface TableRecord {
  id: number | string;
  [key: string]: any; // Dynamic fields based on table schema
}

/**
 * Sample table records for different tables
 */
export const customersTableRecords: TableRecord[] = [
  {
    id: 1,
    name: 'Олексій Коваленко',
    email: 'oleksiy.kovalenko@example.com',
    phone: '+380501234567',
    company: 'ТОВ "Інноваційні рішення"',
    status: 'active',
    created_at: '2024-01-15',
  },
  {
    id: 2,
    name: 'Марія Шевченко',
    email: 'maria.shevchenko@example.com',
    phone: '+380672345678',
    company: 'ПП "Технології майбутнього"',
    status: 'active',
    created_at: '2024-02-10',
  },
  {
    id: 3,
    name: 'Іван Петренко',
    email: 'ivan.petrenko@example.com',
    phone: '+380933456789',
    company: 'АТ "Софт Груп"',
    status: 'inactive',
    created_at: '2024-03-05',
  },
];

export const productsTableRecords: TableRecord[] = [
  {
    id: 1,
    name: 'Ноутбук Dell XPS 15',
    sku: 'DELL-XPS15-001',
    price: 45000,
    stock: 15,
    category: 'Електроніка',
    status: 'available',
  },
  {
    id: 2,
    name: 'Клавіатура механічна',
    sku: 'KB-MECH-002',
    price: 2500,
    stock: 42,
    category: 'Аксесуари',
    status: 'available',
  },
  {
    id: 3,
    name: 'Монітор LG 27"',
    sku: 'LG-MON27-003',
    price: 8500,
    stock: 8,
    category: 'Електроніка',
    status: 'low_stock',
  },
];

export const ordersTableRecords: TableRecord[] = [
  {
    id: 1,
    order_number: 'ORD-2024-001',
    customer_id: 1,
    total_amount: 47500,
    status: 'completed',
    order_date: '2024-11-15',
    delivery_date: '2024-11-18',
  },
  {
    id: 2,
    order_number: 'ORD-2024-002',
    customer_id: 2,
    total_amount: 11000,
    status: 'processing',
    order_date: '2024-12-01',
    delivery_date: null,
  },
  {
    id: 3,
    order_number: 'ORD-2024-003',
    customer_id: 3,
    total_amount: 25000,
    status: 'shipped',
    order_date: '2024-12-10',
    delivery_date: '2024-12-15',
  },
];

export const usersTableRecords: TableRecord[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: 'Administrator',
    last_login: '2024-12-17 14:30:00',
    is_active: true,
  },
  {
    id: 2,
    username: 'developer',
    email: 'dev@example.com',
    role: 'Developer',
    last_login: '2024-12-17 12:15:00',
    is_active: true,
  },
  {
    id: 3,
    username: 'analyst',
    email: 'analyst@example.com',
    role: 'Data Analyst',
    last_login: '2024-12-16 18:45:00',
    is_active: true,
  },
];

/**
 * Get table records by database and table name
 * In production, this would be a real database query
 */
export const getTableRecords = (database: string, table: string): TableRecord[] => {
  const key = `${database}.${table}`.toLowerCase();
  
  // Map to appropriate mock data based on table name
  if (table.toLowerCase().includes('customer') || table.toLowerCase() === 'clients') {
    return customersTableRecords;
  }
  
  if (table.toLowerCase().includes('product') || table.toLowerCase() === 'items') {
    return productsTableRecords;
  }
  
  if (table.toLowerCase().includes('order') || table.toLowerCase() === 'sales') {
    return ordersTableRecords;
  }
  
  if (table.toLowerCase().includes('user') || table.toLowerCase() === 'accounts') {
    return usersTableRecords;
  }
  
  // Default generic records
  return [
    { id: 1, name: 'Запис 1', value: 100, created_at: '2024-01-01' },
    { id: 2, name: 'Запис 2', value: 200, created_at: '2024-02-01' },
    { id: 3, name: 'Запис 3', value: 300, created_at: '2024-03-01' },
  ];
};

/**
 * Default empty table records for new tables
 */
export const defaultTableRecords: TableRecord[] = [];
