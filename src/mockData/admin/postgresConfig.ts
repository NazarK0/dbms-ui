/**
 * Mock data for PostgreSQL configuration parameters
 */

export interface ConfigParam {
  name: string;
  value: string;
  defaultValue: string;
  unit?: string;
  description: string;
  requiresRestart: boolean;
  category: 'memory' | 'connections' | 'wal' | 'autovacuum' | 'logging' | 'performance';
}

export interface ConfigProfile {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  parametersCount: number;
}

export const configParams: ConfigParam[] = [
  // Memory Settings
  {
    name: 'shared_buffers',
    value: '256MB',
    defaultValue: '128MB',
    unit: 'MB',
    description: 'Обсяг пам\'яті для кешування даних',
    requiresRestart: true,
    category: 'memory'
  },
  {
    name: 'work_mem',
    value: '8MB',
    defaultValue: '4MB',
    unit: 'MB',
    description: 'Пам\'ять для операцій сортування та хешування',
    requiresRestart: false,
    category: 'memory'
  },
  {
    name: 'maintenance_work_mem',
    value: '128MB',
    defaultValue: '64MB',
    unit: 'MB',
    description: 'Пам\'ять для операцій обслуговування (VACUUM, CREATE INDEX)',
    requiresRestart: false,
    category: 'memory'
  },
  {
    name: 'effective_cache_size',
    value: '1GB',
    defaultValue: '4GB',
    unit: 'GB',
    description: 'Оцінка доступної пам\'яті для кешування ОС',
    requiresRestart: false,
    category: 'memory'
  },
  // Connection Settings
  {
    name: 'max_connections',
    value: '200',
    defaultValue: '100',
    description: 'Максимальна кількість одночасних підключень',
    requiresRestart: true,
    category: 'connections'
  },
  {
    name: 'superuser_reserved_connections',
    value: '5',
    defaultValue: '3',
    description: 'Резервні підключення для суперкористувачів',
    requiresRestart: true,
    category: 'connections'
  },
  {
    name: 'idle_in_transaction_session_timeout',
    value: '30000',
    defaultValue: '0',
    unit: 'ms',
    description: 'Таймаут для неактивних транзакцій',
    requiresRestart: false,
    category: 'connections'
  },
  // WAL Settings
  {
    name: 'wal_level',
    value: 'replica',
    defaultValue: 'replica',
    description: 'Рівень деталізації WAL логів',
    requiresRestart: true,
    category: 'wal'
  },
  {
    name: 'max_wal_size',
    value: '2GB',
    defaultValue: '1GB',
    unit: 'GB',
    description: 'Максимальний розмір WAL між checkpoint',
    requiresRestart: false,
    category: 'wal'
  },
  {
    name: 'min_wal_size',
    value: '512MB',
    defaultValue: '80MB',
    unit: 'MB',
    description: 'Мінімальний розмір WAL',
    requiresRestart: false,
    category: 'wal'
  },
  {
    name: 'wal_buffers',
    value: '16MB',
    defaultValue: '-1',
    unit: 'MB',
    description: 'Буфери для WAL даних',
    requiresRestart: true,
    category: 'wal'
  },
  // Autovacuum Settings
  {
    name: 'autovacuum',
    value: 'on',
    defaultValue: 'on',
    description: 'Автоматичне очищення (vacuum) таблиць',
    requiresRestart: false,
    category: 'autovacuum'
  },
  {
    name: 'autovacuum_max_workers',
    value: '3',
    defaultValue: '3',
    description: 'Максимальна кількість процесів autovacuum',
    requiresRestart: true,
    category: 'autovacuum'
  },
  {
    name: 'autovacuum_naptime',
    value: '60s',
    defaultValue: '1min',
    description: 'Час між запусками autovacuum',
    requiresRestart: false,
    category: 'autovacuum'
  },
  // Logging Settings
  {
    name: 'logging_collector',
    value: 'on',
    defaultValue: 'off',
    description: 'Збір логів у фонові файли',
    requiresRestart: true,
    category: 'logging'
  },
  {
    name: 'log_min_duration_statement',
    value: '1000',
    defaultValue: '-1',
    unit: 'ms',
    description: 'Логувати запити довші за вказаний час',
    requiresRestart: false,
    category: 'logging'
  },
  {
    name: 'log_checkpoints',
    value: 'on',
    defaultValue: 'off',
    description: 'Логувати контрольні точки',
    requiresRestart: false,
    category: 'logging'
  },
  {
    name: 'log_connections',
    value: 'on',
    defaultValue: 'off',
    description: 'Логувати нові підключення',
    requiresRestart: false,
    category: 'logging'
  },
  {
    name: 'log_disconnections',
    value: 'on',
    defaultValue: 'off',
    description: 'Логувати відключення',
    requiresRestart: false,
    category: 'logging'
  },
  // Performance Settings
  {
    name: 'random_page_cost',
    value: '1.1',
    defaultValue: '4.0',
    description: 'Вартість випадкового читання сторінки (для SSD)',
    requiresRestart: false,
    category: 'performance'
  },
  {
    name: 'effective_io_concurrency',
    value: '200',
    defaultValue: '1',
    description: 'Паралельність I/O операцій (для SSD)',
    requiresRestart: false,
    category: 'performance'
  },
  {
    name: 'default_statistics_target',
    value: '100',
    defaultValue: '100',
    description: 'Ціль для збору статистики планувальника',
    requiresRestart: false,
    category: 'performance'
  },
];

export const savedProfiles: ConfigProfile[] = [
  {
    id: '1',
    name: 'Production Optimized',
    description: 'Оптимізовано для продакшн серверів',
    createdAt: '2024-12-10 15:30',
    parametersCount: 22,
  },
  {
    id: '2',
    name: 'Development Setup',
    description: 'Налаштування для розробки',
    createdAt: '2024-12-08 09:15',
    parametersCount: 22,
  },
  {
    id: '3',
    name: 'High Load Server',
    description: 'Конфігурація для високого навантаження',
    createdAt: '2024-12-05 18:45',
    parametersCount: 22,
  },
];
