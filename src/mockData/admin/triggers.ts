// Mock data for database triggers and rules (Admin)

export interface Trigger {
  name: string;
  table: string;
  event: string;
  timing: 'BEFORE' | 'AFTER';
  function: string;
  enabled: boolean;
}

export interface Rule {
  name: string;
  table: string;
  event: string;
  type: 'INSTEAD' | 'ALSO';
  command: string;
}

export const triggers: Trigger[] = [
  {
    name: 'update_modified_timestamp',
    table: 'users',
    event: 'BEFORE UPDATE',
    timing: 'BEFORE',
    function: 'update_timestamp()',
    enabled: true,
  },
  {
    name: 'log_order_changes',
    table: 'orders',
    event: 'AFTER INSERT OR UPDATE',
    timing: 'AFTER',
    function: 'log_changes()',
    enabled: true,
  },
  {
    name: 'validate_email',
    table: 'users',
    event: 'BEFORE INSERT',
    timing: 'BEFORE',
    function: 'validate_email_format()',
    enabled: false,
  },
];

export const rules: Rule[] = [
  { name: '_RETURN', table: 'user_view', event: 'INSERT', type: 'INSTEAD', command: 'DO INSTEAD' },
  { name: 'audit_log', table: 'sensitive_data', event: 'DELETE', type: 'ALSO', command: 'DO ALSO' },
];
