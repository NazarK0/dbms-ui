// Mock data for PostgreSQL extensions (Admin)

export interface Extension {
  name: string;
  version: string;
  description: string;
  installed?: boolean;
  category?: string;
  status?: 'enabled' | 'disabled';
}

export const installedExtensions: Extension[] = [
  { name: 'postgres_fdw', version: '1.1', description: 'Foreign-data wrapper for remote PostgreSQL servers' },
  { name: 'pg_stat_statements', version: '1.10', description: 'Track planning and execution statistics' },
  { name: 'pgcrypto', version: '1.3', description: 'Cryptographic functions' },
];

export const installedExtensionsDetailed: Extension[] = [
  { name: 'pg_stat_statements', version: '1.10', description: 'Відстеження статистики виконання SQL запитів', status: 'enabled' },
  { name: 'uuid-ossp', version: '1.1', description: 'Генерація UUID за різними алгоритмами', status: 'enabled' },
  { name: 'hstore', version: '1.8', description: 'Зберігання пар ключ-значення в одному полі', status: 'enabled' },
  { name: 'pg_trgm', version: '1.6', description: 'Підтримка тригра мів для пошуку подібних рядків', status: 'disabled' },
];

export const availableExtensions: Extension[] = [
  { name: 'postgres_fdw', version: '1.1', description: 'Foreign-data wrapper for remote PostgreSQL servers', installed: true, category: 'FDW' },
  { name: 'pg_stat_statements', version: '1.10', description: 'Track planning and execution statistics', installed: true, category: 'Monitoring' },
  { name: 'pgcrypto', version: '1.3', description: 'Криптографічні функції', installed: false, category: 'Security' },
  { name: 'uuid-ossp', version: '1.1', description: 'Generate universally unique identifiers (UUIDs)', installed: false, category: 'Utilities' },
  { name: 'hstore', version: '1.8', description: 'Data type for storing key-value pairs', installed: false, category: 'Data Types' },
  { name: 'postgis', version: '3.3.2', description: 'Географічні об\'єкти для PostgreSQL', installed: false, category: 'Spatial' },
  { name: 'pg_repack', version: '1.4.8', description: 'Реорганізація таблиць без блокування', installed: false, category: 'Utilities' },
  { name: 'timescaledb', version: '2.11.0', description: 'Розширення для часових рядів', installed: false, category: 'Time Series' },
  { name: 'pg_trgm', version: '1.6', description: 'Text similarity measurement and index searching', installed: false, category: 'Search' },
  { name: 'btree_gin', version: '1.3', description: 'Support for indexing common datatypes in GIN', installed: false, category: 'Indexing' },
];

export const hasFDWExtension = (extensions: Extension[] = installedExtensions): boolean => {
  return extensions.some(ext => 
    ext.name === 'postgres_fdw' || 
    ext.name === 'mysql_fdw' || 
    ext.name === 'oracle_fdw' || 
    ext.name === 'multicorn'
  );
};