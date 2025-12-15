import type { TableSchema } from './types';

// Reports Database Tables - 6 tables with various business reports
export const reportsSchemas: Record<string, TableSchema> = {
  financial_reports: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'report_name', type: 'varchar', required: true },
      { name: 'period', type: 'varchar', required: true },
      { name: 'revenue', type: 'decimal', required: true },
      { name: 'expenses', type: 'decimal', required: true },
      { name: 'profit', type: 'decimal', required: true },
      { name: 'attachments', type: 'array', required: false },
      { name: 'generated_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, report_name: 'Q1 2024 Financial Summary', period: '2024-Q1', revenue: '1250000.00', expenses: '780000.00', profit: '470000.00', attachments: ['financial_report_q1.pdf', 'detailed_breakdown.xlsx', 'charts.png'], generated_at: '2024-02-01 10:00:00' },
      { id: 2, report_name: 'January 2024', period: '2024-01', revenue: '420000.00', expenses: '265000.00', profit: '155000.00', attachments: ['jan_report.pdf'], generated_at: '2024-02-01 11:30:00' },
    ],
  },

  sales_reports: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'report_name', type: 'varchar', required: true },
      { name: 'period', type: 'varchar', required: true },
      { name: 'total_orders', type: 'integer', required: true },
      { name: 'total_revenue', type: 'decimal', required: true },
      { name: 'average_order_value', type: 'decimal', required: true },
      { name: 'attachments', type: 'array', required: false },
      { name: 'generated_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, report_name: 'February 2024 Sales', period: '2024-02', total_orders: 156, total_revenue: '542000.00', average_order_value: '3474.36', attachments: ['feb_sales.pdf', 'sales_analytics.xlsx'], generated_at: '2024-02-10 10:00:00' },
      { id: 2, report_name: 'January 2024 Sales', period: '2024-01', total_orders: 142, total_revenue: '498000.00', average_order_value: '3507.04', attachments: ['jan_sales.pdf'], generated_at: '2024-02-01 11:30:00' },
    ],
  },

  inventory_reports: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'report_name', type: 'varchar', required: true },
      { name: 'warehouse', type: 'varchar', required: true },
      { name: 'total_items', type: 'integer', required: true },
      { name: 'total_value', type: 'decimal', required: true },
      { name: 'low_stock_items', type: 'integer', required: true },
      { name: 'generated_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, report_name: 'Київ-Центр Inventory', warehouse: 'Київ-Центр', total_items: 1245, total_value: '3580000.00', low_stock_items: 23, generated_at: '2024-02-12 10:00:00' },
      { id: 2, report_name: 'Львів-Схід Inventory', warehouse: 'Львів-Схід', total_items: 892, total_value: '2340000.00', low_stock_items: 15, generated_at: '2024-02-12 11:30:00' },
    ],
  },

  customer_reports: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'report_name', type: 'varchar', required: true },
      { name: 'period', type: 'varchar', required: true },
      { name: 'new_customers', type: 'integer', required: true },
      { name: 'active_customers', type: 'integer', required: true },
      { name: 'retention_rate', type: 'decimal', required: true },
      { name: 'generated_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, report_name: 'Q1 2024 Customer Analytics', period: '2024-Q1', new_customers: 234, active_customers: 3421, retention_rate: '87.5', generated_at: '2024-02-10 10:00:00' },
      { id: 2, report_name: 'January 2024 Customers', period: '2024-01', new_customers: 78, active_customers: 3187, retention_rate: '89.2', generated_at: '2024-02-01 11:30:00' },
    ],
  },

  performance_reports: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'report_name', type: 'varchar', required: true },
      { name: 'metric_name', type: 'varchar', required: true },
      { name: 'current_value', type: 'decimal', required: true },
      { name: 'previous_value', type: 'decimal', required: true },
      { name: 'change_percent', type: 'decimal', required: true },
      { name: 'generated_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, report_name: 'System Performance Feb 2024', metric_name: 'Average Response Time', current_value: '0.245', previous_value: '0.268', change_percent: '-8.58', generated_at: '2024-02-12 10:00:00' },
      { id: 2, report_name: 'System Performance Feb 2024', metric_name: 'Query Success Rate', current_value: '99.8', previous_value: '99.5', change_percent: '0.30', generated_at: '2024-02-12 10:00:00' },
    ],
  },

  scheduled_reports: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'report_type', type: 'varchar', required: true },
      { name: 'name', type: 'varchar', required: true },
      { name: 'schedule', type: 'varchar', required: true },
      { name: 'recipients', type: 'text', required: true },
      { name: 'is_active', type: 'boolean', required: true },
      { name: 'last_run', type: 'timestamp', required: false },
    ],
    data: [
      { id: 1, report_type: 'financial', name: 'Weekly Financial Summary', schedule: 'weekly', recipients: 'finance@company.com, ceo@company.com', is_active: true, last_run: '2024-02-12 08:00:00' },
      { id: 2, report_type: 'sales', name: 'Daily Sales Report', schedule: 'daily', recipients: 'sales@company.com', is_active: true, last_run: '2024-02-13 09:00:00' },
      { id: 3, report_type: 'performance', name: 'Monthly System Performance', schedule: 'monthly', recipients: 'tech@company.com', is_active: true, last_run: '2024-02-01 10:00:00' },
    ],
  },
};