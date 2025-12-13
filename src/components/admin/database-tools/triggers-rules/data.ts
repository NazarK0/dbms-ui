/**
 * Mock data for Triggers and Rules
 */

import type { Trigger, Rule } from './types';

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
  {
    name: 'audit_user_login',
    table: 'user_sessions',
    event: 'AFTER INSERT',
    timing: 'AFTER',
    function: 'audit_login()',
    enabled: true,
  },
  {
    name: 'prevent_order_delete',
    table: 'orders',
    event: 'BEFORE DELETE',
    timing: 'BEFORE',
    function: 'check_order_status()',
    enabled: true,
  },
  {
    name: 'cascade_product_update',
    table: 'products',
    event: 'AFTER UPDATE',
    timing: 'AFTER',
    function: 'update_related_tables()',
    enabled: false,
  },
];

export const rules: Rule[] = [
  {
    name: '_RETURN',
    table: 'user_view',
    event: 'INSERT',
    type: 'INSTEAD',
    command: 'DO INSTEAD INSERT INTO users ...',
  },
  {
    name: 'audit_log',
    table: 'sensitive_data',
    event: 'DELETE',
    type: 'ALSO',
    command: 'DO ALSO INSERT INTO audit_log ...',
  },
  {
    name: 'redirect_update',
    table: 'legacy_table',
    event: 'UPDATE',
    type: 'INSTEAD',
    command: 'DO INSTEAD UPDATE new_table ...',
  },
  {
    name: 'notify_changes',
    table: 'important_data',
    event: 'INSERT',
    type: 'ALSO',
    command: 'DO ALSO NOTIFY data_changed',
  },
];
