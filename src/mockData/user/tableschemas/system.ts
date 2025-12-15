import type { TableSchema } from './types';

// System Tables - 2 tables for system-wide data (users, audit logs)
export const systemSchemas: Record<string, TableSchema> = {
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
