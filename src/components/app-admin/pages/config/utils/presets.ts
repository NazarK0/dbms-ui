/**
 * Preset configuration functions for PostgreSQL
 */

/**
 * Get preset configuration by type
 */
export const getPresetConfig = (presetType: 'development' | 'production' | 'highload'): Record<string, string> => {
  const presets = {
    development: {
      shared_buffers: '128MB',
      work_mem: '4MB',
      max_connections: '50',
      logging_collector: 'on',
      log_min_duration_statement: '0',
      log_connections: 'on',
      log_disconnections: 'on',
    },
    production: {
      shared_buffers: '512MB',
      work_mem: '16MB',
      max_connections: '200',
      max_wal_size: '4GB',
      logging_collector: 'on',
      log_min_duration_statement: '1000',
      random_page_cost: '1.1',
      effective_io_concurrency: '200',
    },
    highload: {
      shared_buffers: '1GB',
      work_mem: '32MB',
      max_connections: '500',
      max_wal_size: '8GB',
      effective_cache_size: '8GB',
      random_page_cost: '1.0',
      effective_io_concurrency: '300',
      autovacuum_max_workers: '6',
    },
  };

  return presets[presetType] || {};
};
