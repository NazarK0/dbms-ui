import type { TableSchema } from './types';

// Analytics Database Tables - 7 tables with analytics and reporting data
export const analyticsSchemas: Record<string, TableSchema> = {
  reports: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'name', type: 'varchar', required: true },
      { name: 'type', type: 'varchar', required: true },
      { name: 'description', type: 'text', required: false },
      { name: 'created_by', type: 'varchar', required: true },
      { name: 'attachments', type: 'array', required: false },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, name: 'Quarterly Sales Report', type: 'sales', description: 'Звіт по продажам за квартал', created_by: 'Наталія Бондаренко', attachments: ['q1_sales.pdf', 'sales_charts.xlsx'], created_at: '2024-02-01 10:00:00' },
      { id: 2, name: 'User Activity Dashboard', type: 'analytics', description: 'Активність користувачів системи', created_by: 'Марія Коваленко', attachments: ['user_stats.pdf', 'activity_graphs.png'], created_at: '2024-02-05 11:30:00' },
      { id: 3, name: 'Performance Metrics', type: 'performance', description: 'Показники продуктивності', created_by: 'Іван Шевченко', attachments: ['performance_report.pdf'], created_at: '2024-02-08 14:20:00' },
    ],
  },

  metrics: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'name', type: 'varchar', required: true },
      { name: 'value', type: 'decimal', required: true },
      { name: 'unit', type: 'varchar', required: true },
      { name: 'category', type: 'varchar', required: true },
      { name: 'recorded_at', type: 'timestamp', required: true },
    ],
    data: [
      { id: 1, name: 'Total Revenue', value: '1250000.00', unit: 'UAH', category: 'financial', recorded_at: '2024-02-01 00:00:00' },
      { id: 2, name: 'Active Users', value: '3421', unit: 'count', category: 'users', recorded_at: '2024-02-01 00:00:00' },
      { id: 3, name: 'Average Response Time', value: '0.245', unit: 'seconds', category: 'performance', recorded_at: '2024-02-01 00:00:00' },
      { id: 4, name: 'Database Size', value: '156.7', unit: 'GB', category: 'storage', recorded_at: '2024-02-01 00:00:00' },
    ],
  },

  kpis: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'name', type: 'varchar', required: true },
      { name: 'current_value', type: 'decimal', required: true },
      { name: 'target_value', type: 'decimal', required: true },
      { name: 'status', type: 'varchar', required: true },
      { name: 'period', type: 'varchar', required: true },
    ],
    data: [
      { id: 1, name: 'Customer Satisfaction', current_value: '4.6', target_value: '4.5', status: 'on_track', period: '2024-Q1' },
      { id: 2, name: 'System Uptime', current_value: '99.8', target_value: '99.5', status: 'exceeding', period: '2024-Q1' },
      { id: 3, name: 'Project Completion Rate', current_value: '78.0', target_value: '85.0', status: 'at_risk', period: '2024-Q1' },
    ],
  },

  dashboards: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'name', type: 'varchar', required: true },
      { name: 'description', type: 'text', required: false },
      { name: 'created_by', type: 'varchar', required: true },
      { name: 'is_public', type: 'boolean', required: true },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, name: 'Executive Dashboard', description: 'Основні показники для керівництва', created_by: 'Олександр Петренко', is_public: true, created_at: '2024-01-15 10:00:00' },
      { id: 2, name: 'Sales Performance', description: 'Аналітика продажів', created_by: 'Наталія Бондаренко', is_public: true, created_at: '2024-01-20 11:30:00' },
      { id: 3, name: 'Technical Metrics', description: 'Технічні показники системи', created_by: 'Марія Коваленко', is_public: false, created_at: '2024-01-25 14:20:00' },
    ],
  },

  daily_stats: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'stat_date', type: 'date', required: true },
      { name: 'users_active', type: 'integer', required: true },
      { name: 'new_records', type: 'integer', required: true },
      { name: 'queries_executed', type: 'integer', required: true },
      { name: 'average_response_time', type: 'decimal', required: true },
    ],
    data: [
      { id: 1, stat_date: '2024-02-10', users_active: 234, new_records: 1456, queries_executed: 45678, average_response_time: '0.234' },
      { id: 2, stat_date: '2024-02-11', users_active: 245, new_records: 1523, queries_executed: 47892, average_response_time: '0.241' },
      { id: 3, stat_date: '2024-02-12', users_active: 256, new_records: 1489, queries_executed: 46234, average_response_time: '0.238' },
      { id: 4, stat_date: '2024-02-13', users_active: 267, new_records: 1567, queries_executed: 48901, average_response_time: '0.245' },
    ],
  },

  user_events: {
    columns: [
      { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
      { name: 'user_id', type: 'integer', required: true },
      { name: 'event_type', type: 'varchar', required: true },
      { name: 'event_data', type: 'text', required: false },
      { name: 'ip_address', type: 'varchar', required: false },
      { name: 'created_at', type: 'timestamp', required: false, systemGenerated: true },
    ],
    data: [
      { id: 1, user_id: 1, event_type: 'login', event_data: '{"browser": "Chrome", "os": "Windows"}', ip_address: '192.168.1.100', created_at: '2024-02-13 09:00:00' },
      { id: 2, user_id: 2, event_type: 'query_execute', event_data: '{"table": "customers", "action": "SELECT"}', ip_address: '192.168.1.101', created_at: '2024-02-13 09:15:00' },
      { id: 3, user_id: 1, event_type: 'record_create', event_data: '{"table": "projects", "record_id": 5}', ip_address: '192.168.1.100', created_at: '2024-02-13 10:30:00' },
    ],
  },
};