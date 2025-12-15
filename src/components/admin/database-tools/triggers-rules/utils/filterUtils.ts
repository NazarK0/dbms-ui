/**
 * Triggers & Rules - Filter Utility Functions
 * 
 * Functions for filtering triggers and rules by various criteria:
 * - Table name
 * - Status (enabled/disabled)
 * - Timing (BEFORE/AFTER)
 * - Event type
 * - Rule type (INSTEAD/ALSO)
 */

import type { Trigger, Rule } from '../types';

/**
 * Filter triggers by table name
 * @param triggers - Array of triggers
 * @param tableName - Table name to filter by
 * @returns Filtered triggers
 */
export const filterTriggersByTable = (triggers: Trigger[], tableName: string): Trigger[] => {
  if (!tableName) return triggers;
  return triggers.filter(trigger => trigger.table.toLowerCase() === tableName.toLowerCase());
};

/**
 * Filter triggers by enabled status
 * @param triggers - Array of triggers
 * @param enabled - Status to filter by (true/false)
 * @returns Filtered triggers
 */
export const filterTriggersByStatus = (triggers: Trigger[], enabled: boolean): Trigger[] => {
  return triggers.filter(trigger => trigger.enabled === enabled);
};

/**
 * Filter triggers by timing (BEFORE/AFTER)
 * @param triggers - Array of triggers
 * @param timing - Timing to filter by
 * @returns Filtered triggers
 */
export const filterTriggersByTiming = (triggers: Trigger[], timing: 'BEFORE' | 'AFTER'): Trigger[] => {
  return triggers.filter(trigger => trigger.timing === timing);
};

/**
 * Filter triggers by event type
 * @param triggers - Array of triggers
 * @param eventType - Event type to search for (partial match)
 * @returns Filtered triggers
 */
export const filterTriggersByEvent = (triggers: Trigger[], eventType: string): Trigger[] => {
  return triggers.filter(trigger => 
    trigger.event.toLowerCase().includes(eventType.toLowerCase())
  );
};

/**
 * Filter rules by table name
 * @param rules - Array of rules
 * @param tableName - Table name to filter by
 * @returns Filtered rules
 */
export const filterRulesByTable = (rules: Rule[], tableName: string): Rule[] => {
  if (!tableName) return rules;
  return rules.filter(rule => rule.table.toLowerCase() === tableName.toLowerCase());
};

/**
 * Filter rules by type (INSTEAD/ALSO)
 * @param rules - Array of rules
 * @param type - Rule type to filter by
 * @returns Filtered rules
 */
export const filterRulesByType = (rules: Rule[], type: 'INSTEAD' | 'ALSO'): Rule[] => {
  return rules.filter(rule => rule.type === type);
};

/**
 * Filter rules by event type
 * @param rules - Array of rules
 * @param event - Event type to filter by
 * @returns Filtered rules
 */
export const filterRulesByEvent = (rules: Rule[], event: string): Rule[] => {
  return rules.filter(rule => rule.event.toLowerCase() === event.toLowerCase());
};

/**
 * Get enabled triggers only
 * @param triggers - Array of triggers
 * @returns Enabled triggers
 */
export const getEnabledTriggers = (triggers: Trigger[]): Trigger[] => {
  return triggers.filter(trigger => trigger.enabled);
};

/**
 * Get disabled triggers only
 * @param triggers - Array of triggers
 * @returns Disabled triggers
 */
export const getDisabledTriggers = (triggers: Trigger[]): Trigger[] => {
  return triggers.filter(trigger => !trigger.enabled);
};

/**
 * Get BEFORE triggers only
 * @param triggers - Array of triggers
 * @returns BEFORE triggers
 */
export const getBeforeTriggers = (triggers: Trigger[]): Trigger[] => {
  return triggers.filter(trigger => trigger.timing === 'BEFORE');
};

/**
 * Get AFTER triggers only
 * @param triggers - Array of triggers
 * @returns AFTER triggers
 */
export const getAfterTriggers = (triggers: Trigger[]): Trigger[] => {
  return triggers.filter(trigger => trigger.timing === 'AFTER');
};

/**
 * Get INSTEAD rules only
 * @param rules - Array of rules
 * @returns INSTEAD rules
 */
export const getInsteadRules = (rules: Rule[]): Rule[] => {
  return rules.filter(rule => rule.type === 'INSTEAD');
};

/**
 * Get ALSO rules only
 * @param rules - Array of rules
 * @returns ALSO rules
 */
export const getAlsoRules = (rules: Rule[]): Rule[] => {
  return rules.filter(rule => rule.type === 'ALSO');
};

/**
 * Get triggers by table name (alias for filterTriggersByTable)
 * @param triggers - Array of triggers
 * @param tableName - Table name
 * @returns Triggers on specified table
 */
export const getTriggersByTable = (triggers: Trigger[], tableName: string): Trigger[] => {
  return filterTriggersByTable(triggers, tableName);
};

/**
 * Get rules by table name (alias for filterRulesByTable)
 * @param rules - Array of rules
 * @param tableName - Table name
 * @returns Rules on specified table
 */
export const getRulesByTable = (rules: Rule[], tableName: string): Rule[] => {
  return filterRulesByTable(rules, tableName);
};

/**
 * Check if trigger is enabled
 * @param trigger - Trigger to check
 * @returns true if enabled, false otherwise
 */
export const isTriggerEnabled = (trigger: Trigger): boolean => {
  return trigger.enabled;
};

/**
 * Check if trigger is on specific table
 * @param trigger - Trigger to check
 * @param tableName - Table name to check against
 * @returns true if trigger is on table, false otherwise
 */
export const isTriggerOnTable = (trigger: Trigger, tableName: string): boolean => {
  return trigger.table.toLowerCase() === tableName.toLowerCase();
};

/**
 * Check if rule is on specific table
 * @param rule - Rule to check
 * @param tableName - Table name to check against
 * @returns true if rule is on table, false otherwise
 */
export const isRuleOnTable = (rule: Rule, tableName: string): boolean => {
  return rule.table.toLowerCase() === tableName.toLowerCase();
};
