/**
 * TypeScript types for audit log
 */

export type ActionType = 'create' | 'update' | 'delete' | 'select' | 'grant' | 'revoke' | 'login' | 'backup';

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: ActionType;
  category: string;
  target: string;
  details: string;
  ip: string;
  status: 'success' | 'failed';
}
