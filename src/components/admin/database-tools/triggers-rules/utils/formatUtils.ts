/**
 * Triggers & Rules - Formatting & Parsing Utility Functions
 * 
 * Functions for formatting and parsing trigger/rule data for display.
 */

import type { Trigger } from '../types';

/**
 * Format trigger event for display
 * Currently returns event as-is, but can be extended for custom formatting
 * @param event - Trigger event string
 * @returns Formatted event string
 */
export const formatTriggerEvent = (event: string): string => {
  return event;
};

/**
 * Format rule command for display
 * Truncates long commands for table view
 * @param command - Rule command SQL
 * @param maxLength - Maximum length before truncation (default: 50)
 * @returns Formatted command string
 */
export const formatRuleCommand = (command: string, maxLength: number = 50): string => {
  if (command.length > maxLength) {
    return command.substring(0, maxLength) + '...';
  }
  return command;
};

/**
 * Get trigger function name without parentheses
 * @param trigger - Trigger object
 * @returns Function name without ()
 */
export const getTriggerFunctionName = (trigger: Trigger): string => {
  return trigger.function.replace(/\(\)/g, '');
};

/**
 * Parse trigger event string into timing and operations
 * @param event - Full event string (e.g., "BEFORE INSERT OR UPDATE")
 * @returns Object with timing and operations array
 */
export const parseTriggerEvent = (event: string): {
  timing: 'BEFORE' | 'AFTER';
  operations: string[];
} => {
  const timing = event.startsWith('BEFORE') ? 'BEFORE' : 'AFTER';
  const operations = event
    .replace(/BEFORE |AFTER /, '')
    .split(' OR ')
    .map(op => op.trim());
  
  return { timing, operations };
};

/**
 * Format trigger timing and event for display
 * @param timing - BEFORE or AFTER
 * @param event - Event type(s)
 * @returns Formatted string
 */
export const formatTriggerTimingAndEvent = (timing: string, event: string): string => {
  return `${timing} ${event}`;
};

/**
 * Format rule type for display
 * @param type - Rule type (INSTEAD, ALSO)
 * @returns Formatted type string
 */
export const formatRuleType = (type: string): string => {
  return type;
};

/**
 * Get trigger description for display
 * Generates a human-readable description
 * @param trigger - Trigger object
 * @returns Description string
 */
export const getTriggerDescription = (trigger: Trigger): string => {
  const status = trigger.enabled ? 'Активний' : 'Вимкнений';
  const timing = trigger.timing === 'BEFORE' ? 'до' : 'після';
  return `${status} тригер, спрацьовує ${timing} події ${trigger.event} на таблиці ${trigger.table}`;
};

/**
 * Format trigger/rule name for display
 * Can be extended to handle special characters or prefixes
 * @param name - Name string
 * @returns Formatted name
 */
export const formatName = (name: string): string => {
  return name;
};

/**
 * Format table name for display
 * Can be extended to handle schema prefixes
 * @param tableName - Table name
 * @returns Formatted table name
 */
export const formatTableName = (tableName: string): string => {
  // If schema.table format, can split and format separately
  if (tableName.includes('.')) {
    const [schema, table] = tableName.split('.');
    return `${schema}.${table}`;
  }
  return tableName;
};

/**
 * Truncate text with ellipsis
 * Generic truncation utility
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

/**
 * Format enabled/disabled status for display
 * @param enabled - Boolean status
 * @returns Ukrainian status string
 */
export const formatEnabledStatus = (enabled: boolean): string => {
  return enabled ? 'Активний' : 'Вимкнений';
};

/**
 * Convert trigger event to operation list
 * Extracts individual operations from compound events
 * @param event - Event string
 * @returns Array of operation names
 */
export const getOperationsFromEvent = (event: string): string[] => {
  const operations: string[] = [];
  if (event.includes('INSERT')) operations.push('INSERT');
  if (event.includes('UPDATE')) operations.push('UPDATE');
  if (event.includes('DELETE')) operations.push('DELETE');
  if (event.includes('SELECT')) operations.push('SELECT');
  if (event.includes('TRUNCATE')) operations.push('TRUNCATE');
  return operations;
};
