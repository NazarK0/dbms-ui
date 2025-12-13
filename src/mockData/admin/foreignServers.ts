// Mock data for foreign servers and foreign tables (Admin)

export interface ForeignServer {
  name: string;
  wrapper: string;
  host: string;
  port?: number;
  dbname?: string;
  status?: 'connected' | 'disconnected' | 'error';
  foreignTables?: number;
  lastChecked?: string;
}

export interface ForeignTable {
  name: string;
  server: string;
  remoteSchema: string;
  remoteTable: string;
  status: 'active' | 'error';
  lastSync: string;
}

export const foreignServers: ForeignServer[] = [
  {
    name: 'external_db',
    wrapper: 'postgres_fdw',
    host: 'external.example.com',
    port: 5432,
    dbname: 'external_database',
    status: 'connected',
    foreignTables: 3,
    lastChecked: '2025-12-13 10:30:00',
  },
  {
    name: 'warehouse_db',
    wrapper: 'postgres_fdw',
    host: 'warehouse.example.com',
    port: 5432,
    dbname: 'warehouse',
    status: 'connected',
    foreignTables: 5,
    lastChecked: '2025-12-13 09:15:00',
  },
  {
    name: 'old_system',
    wrapper: 'postgres_fdw',
    host: 'legacy.example.com',
    port: 5432,
    dbname: 'legacy_db',
    status: 'error',
    foreignTables: 1,
    lastChecked: '2025-12-12 18:45:00',
  },
  {
    name: 'api_server',
    wrapper: 'multicorn',
    host: 'api.example.com',
    port: 443,
    dbname: 'N/A',
    status: 'disconnected',
    foreignTables: 0,
    lastChecked: '2025-12-10 14:20:00',
  },
];

export const foreignTables: ForeignTable[] = [
  {
    name: 'remote_users',
    server: 'external_db',
    remoteSchema: 'public',
    remoteTable: 'users',
    status: 'active',
    lastSync: '2025-12-13 10:30:00',
  },
  {
    name: 'external_orders',
    server: 'warehouse_db',
    remoteSchema: 'sales',
    remoteTable: 'orders',
    status: 'active',
    lastSync: '2025-12-13 09:15:00',
  },
  {
    name: 'legacy_products',
    server: 'old_system',
    remoteSchema: 'inventory',
    remoteTable: 'products',
    status: 'error',
    lastSync: '2025-12-12 18:45:00',
  },
];

// Simplified list for dropdowns
export const foreignServersSimple: Pick<ForeignServer, 'name' | 'wrapper' | 'host'>[] = [
  { name: 'external_db', wrapper: 'postgres_fdw', host: 'external.example.com' },
  { name: 'warehouse_db', wrapper: 'postgres_fdw', host: 'warehouse.example.com' },
  { name: 'old_system', wrapper: 'postgres_fdw', host: 'legacy.example.com' },
  { name: 'api_server', wrapper: 'multicorn', host: 'api.example.com' },
];
