/**
 * Tablespaces
 * 
 * Mock data for PostgreSQL tablespaces.
 * In production: SELECT spcname FROM pg_tablespace
 */

import type { Tablespace } from './types';

export const tablespaces: Tablespace[] = [
  {
    name: 'pg_default',
    location: '/var/lib/postgresql/data',
    owner: 'postgres',
    description: 'Табличний простір за замовчуванням',
  },
  {
    name: 'pg_global',
    location: '/var/lib/postgresql/data/global',
    owner: 'postgres',
    description: 'Глобальний системний табличний простір',
  },
  {
    name: 'fast_storage',
    location: '/mnt/ssd/postgresql',
    owner: 'admin',
    description: 'SSD сховище для критичних даних',
  },
  {
    name: 'archive_storage',
    location: '/mnt/hdd/postgresql/archive',
    owner: 'admin',
    description: 'Архівне сховище для старих даних',
  },
];
