import type { TableSchema } from './types';

// Ecommerce Database Tables - 10 tables with online store data
export const ecommerceSchemas: Record<string, TableSchema> = {
  products: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'name', type: 'varchar', required: true },
      { name: 'description', type: 'text', required: false },
      { name: 'price', type: 'decimal', required: true },
      { name: 'stock', type: 'integer', required: true },
      { name: 'category_id', type: 'integer', required: false },
      { name: 'attachments', type: 'array', required: false },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, name: 'Ноутбук Dell XPS 15', description: 'Потужний ноутбук для професіоналів', price: '45000.00', stock: 15, category_id: 1, attachments: ['dell_xps_front.jpg', 'dell_xps_back.jpg', 'dell_xps_specs.pdf', 'user_manual.pdf'], created_at: '2024-01-10 10:00:00' },
      { id: 2, name: 'Бездротова миша Logitech', description: 'Ергономічна миша з USB приймачем', price: '850.00', stock: 50, category_id: 2, attachments: ['logitech_mouse.jpg', 'warranty.pdf'], created_at: '2024-01-12 11:30:00' },
      { id: 3, name: 'Механічна клавіатура', description: 'RGB підсвітка, перемикачі Cherry MX', price: '2500.00', stock: 30, category_id: 2, attachments: ['keyboard_main.jpg', 'keyboard_rgb.jpg', 'manual.pdf'], created_at: '2024-01-15 14:20:00' },
      { id: 4, name: 'Монітор Samsung 27"', description: '4K UHD, 144Hz', price: '12000.00', stock: 20, category_id: 1, attachments: ['monitor_front.jpg', 'monitor_specs.pdf'], created_at: '2024-01-18 09:45:00' },
      { id: 5, name: 'Навушники Sony WH-1000XM5', description: 'Активне шумозаглушення', price: '8500.00', stock: 25, category_id: 3, attachments: ['headphones_black.jpg', 'headphones_silver.jpg', 'quick_start_guide.pdf'], created_at: '2024-01-20 16:30:00' },
    ],
  },

  orders: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'customer_id', type: 'integer', required: true },
      { name: 'order_number', type: 'varchar', required: true },
      { name: 'total_amount', type: 'decimal', required: true },
      { name: 'status', type: 'varchar', required: true },
      { name: 'payment_method', type: 'varchar', required: true },
      { name: 'attachments', type: 'array', required: false },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, customer_id: 1, order_number: 'ORD-2024-001', total_amount: '45850.00', status: 'completed', payment_method: 'card', attachments: ['invoice_001.pdf', 'receipt.pdf'], created_at: '2024-02-01 10:00:00' },
      { id: 2, customer_id: 2, order_number: 'ORD-2024-002', total_amount: '12000.00', status: 'processing', payment_method: 'card', attachments: ['invoice_002.pdf'], created_at: '2024-02-03 11:30:00' },
      { id: 3, customer_id: 3, order_number: 'ORD-2024-003', total_amount: '3350.00', status: 'shipped', payment_method: 'cash', attachments: ['invoice_003.pdf', 'packing_slip.pdf'], created_at: '2024-02-05 14:20:00' },
      { id: 4, customer_id: 1, order_number: 'ORD-2024-004', total_amount: '8500.00', status: 'pending', payment_method: 'card', attachments: [], created_at: '2024-02-08 09:45:00' },
    ],
  },

  categories: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'name', type: 'varchar', required: true },
      { name: 'description', type: 'text', required: false },
      { name: 'parent_id', type: 'integer', required: false },
      { name: 'sort_order', type: 'integer', required: false },
    ],
    data: [
      { id: 1, name: 'Електроніка', description: 'Електронні пристрої', parent_id: null, sort_order: 1 },
      { id: 2, name: 'Аксесуари', description: 'Комп\'ютерні аксесуари', parent_id: null, sort_order: 2 },
      { id: 3, name: 'Аудіо', description: 'Аудіо обладнання', parent_id: null, sort_order: 3 },
      { id: 4, name: 'Ноутбуки', description: 'Портативні комп\'ютери', parent_id: 1, sort_order: 1 },
      { id: 5, name: 'Монітори', description: 'Дисплеї та монітори', parent_id: 1, sort_order: 2 },
    ],
  },

  reviews: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'product_id', type: 'integer', required: true },
      { name: 'customer_id', type: 'integer', required: true },
      { name: 'rating', type: 'integer', required: true },
      { name: 'title', type: 'varchar', required: true },
      { name: 'comment', type: 'text', required: false },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, product_id: 1, customer_id: 1, rating: 5, title: 'Чудовий ноутбук!', comment: 'Дуже задоволений покупкою. Швидкий та потужний.', created_at: '2024-02-05 14:30:00' },
      { id: 2, product_id: 2, customer_id: 2, rating: 4, title: 'Хороша миша', comment: 'Зручна, але батарейки швидко розряджаються.', created_at: '2024-02-07 11:20:00' },
      { id: 3, product_id: 5, customer_id: 3, rating: 5, title: 'Найкращі навушники!', comment: 'Якість звуку неймовірна, шумозаглушення працює відмінно.', created_at: '2024-02-09 16:45:00' },
    ],
  },

  inventory: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'product_id', type: 'integer', required: true },
      { name: 'warehouse', type: 'varchar', required: true },
      { name: 'quantity', type: 'integer', required: true },
      { name: 'reserved', type: 'integer', required: true },
      { name: 'last_updated', type: 'timestamp', required: true },
    ],
    data: [
      { id: 1, product_id: 1, warehouse: 'Київ-Центр', quantity: 10, reserved: 2, last_updated: '2024-02-13 10:00:00' },
      { id: 2, product_id: 1, warehouse: 'Львів-Схід', quantity: 5, reserved: 0, last_updated: '2024-02-13 10:00:00' },
      { id: 3, product_id: 2, warehouse: 'Київ-Центр', quantity: 35, reserved: 5, last_updated: '2024-02-13 10:00:00' },
      { id: 4, product_id: 3, warehouse: 'Одеса-Південь', quantity: 20, reserved: 3, last_updated: '2024-02-13 10:00:00' },
    ],
  },

  carts: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'customer_id', type: 'integer', required: true },
      { name: 'product_id', type: 'integer', required: true },
      { name: 'quantity', type: 'integer', required: true },
      { name: 'added_at', type: 'timestamp', required: true },
    ],
    data: [
      { id: 1, customer_id: 2, product_id: 4, quantity: 1, added_at: '2024-02-12 14:30:00' },
      { id: 2, customer_id: 3, product_id: 2, quantity: 2, added_at: '2024-02-13 09:15:00' },
      { id: 3, customer_id: 3, product_id: 3, quantity: 1, added_at: '2024-02-13 09:20:00' },
    ],
  },

  payments: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'order_id', type: 'integer', required: true },
      { name: 'amount', type: 'decimal', required: true },
      { name: 'payment_method', type: 'varchar', required: true },
      { name: 'status', type: 'varchar', required: true },
      { name: 'transaction_id', type: 'varchar', required: false },
      { name: 'paid_at', type: 'timestamp', required: false },
    ],
    data: [
      { id: 1, order_id: 1, amount: '45850.00', payment_method: 'card', status: 'completed', transaction_id: 'TXN-2024-0001', paid_at: '2024-02-01 10:05:00' },
      { id: 2, order_id: 2, amount: '12000.00', payment_method: 'card', status: 'processing', transaction_id: 'TXN-2024-0002', paid_at: null },
      { id: 3, order_id: 3, amount: '3350.00', payment_method: 'cash', status: 'completed', transaction_id: null, paid_at: '2024-02-05 14:30:00' },
    ],
  },

  discounts: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'code', type: 'varchar', required: true },
      { name: 'description', type: 'text', required: false },
      { name: 'discount_percent', type: 'decimal', required: true },
      { name: 'valid_from', type: 'date', required: true },
      { name: 'valid_until', type: 'date', required: true },
      { name: 'is_active', type: 'boolean', required: true },
    ],
    data: [
      { id: 1, code: 'WINTER2024', description: 'Зимова розпродаж', discount_percent: '15.00', valid_from: '2024-01-01', valid_until: '2024-02-29', is_active: true },
      { id: 2, code: 'NEWUSER', description: 'Знижка для нових клієнтів', discount_percent: '10.00', valid_from: '2024-01-01', valid_until: '2024-12-31', is_active: true },
      { id: 3, code: 'TECH50', description: 'Знижка на електроніку', discount_percent: '5.00', valid_from: '2024-02-01', valid_until: '2024-03-31', is_active: true },
    ],
  },

  shipping: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'order_id', type: 'integer', required: true },
      { name: 'carrier', type: 'varchar', required: true },
      { name: 'tracking_number', type: 'varchar', required: false },
      { name: 'status', type: 'varchar', required: true },
      { name: 'shipped_at', type: 'timestamp', required: false },
      { name: 'delivered_at', type: 'timestamp', required: false },
    ],
    data: [
      { id: 1, order_id: 1, carrier: 'Нова Пошта', tracking_number: '59000123456789', status: 'delivered', shipped_at: '2024-02-02 10:00:00', delivered_at: '2024-02-04 14:30:00' },
      { id: 2, order_id: 3, carrier: 'УкрПошта', tracking_number: '0310098765432', status: 'in_transit', shipped_at: '2024-02-06 09:00:00', delivered_at: null },
      { id: 3, order_id: 2, carrier: 'Нова Пошта', tracking_number: null, status: 'preparing', shipped_at: null, delivered_at: null },
    ],
  },
};