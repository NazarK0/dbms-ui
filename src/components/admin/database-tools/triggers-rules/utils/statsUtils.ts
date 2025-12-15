/**
 * Triggers & Rules - Statistics & Aggregation Utility Functions
 * 
 * Functions for calculating statistics, counting, and grouping
 * triggers and rules.
 */

import type { Trigger, Rule, TriggerStats, RuleStats } from '../types';
import { 
  getEnabledTriggers, 
  getDisabledTriggers, 
  getBeforeTriggers, 
  getAfterTriggers,
  getInsteadRules,
  getAlsoRules
} from './filterUtils';

/**
 * Get comprehensive trigger statistics
 * @param triggers - Array of triggers
 * @returns Statistics object
 */
export const getTriggerStats = (triggers: Trigger[]): TriggerStats => {
  return {
    total: triggers.length,
    enabled: getEnabledTriggers(triggers).length,
    disabled: getDisabledTriggers(triggers).length,
    beforeTriggers: getBeforeTriggers(triggers).length,
    afterTriggers: getAfterTriggers(triggers).length,
  };
};

/**
 * Get comprehensive rule statistics
 * @param rules - Array of rules
 * @returns Statistics object
 */
export const getRuleStats = (rules: Rule[]): RuleStats => {
  return {
    total: rules.length,
    insteadRules: getInsteadRules(rules).length,
    alsoRules: getAlsoRules(rules).length,
  };
};

/**
 * Get unique table names from triggers
 * @param triggers - Array of triggers
 * @returns Array of unique table names
 */
export const getUniqueTriggerTables = (triggers: Trigger[]): string[] => {
  return [...new Set(triggers.map(trigger => trigger.table))];
};

/**
 * Get unique table names from rules
 * @param rules - Array of rules
 * @returns Array of unique table names
 */
export const getUniqueRuleTables = (rules: Rule[]): string[] => {
  return [...new Set(rules.map(rule => rule.table))];
};

/**
 * Count triggers per table
 * @param triggers - Array of triggers
 * @returns Object mapping table names to trigger counts
 */
export const countTriggersPerTable = (triggers: Trigger[]): Record<string, number> => {
  return triggers.reduce((acc, trigger) => {
    acc[trigger.table] = (acc[trigger.table] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Count rules per table
 * @param rules - Array of rules
 * @returns Object mapping table names to rule counts
 */
export const countRulesPerTable = (rules: Rule[]): Record<string, number> => {
  return rules.reduce((acc, rule) => {
    acc[rule.table] = (acc[rule.table] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Group triggers by table name
 * @param triggers - Array of triggers
 * @returns Object mapping table names to arrays of triggers
 */
export const groupTriggersByTable = (triggers: Trigger[]): Record<string, Trigger[]> => {
  return triggers.reduce((acc, trigger) => {
    if (!acc[trigger.table]) {
      acc[trigger.table] = [];
    }
    acc[trigger.table].push(trigger);
    return acc;
  }, {} as Record<string, Trigger[]>);
};

/**
 * Group rules by table name
 * @param rules - Array of rules
 * @returns Object mapping table names to arrays of rules
 */
export const groupRulesByTable = (rules: Rule[]): Record<string, Rule[]> => {
  return rules.reduce((acc, rule) => {
    if (!acc[rule.table]) {
      acc[rule.table] = [];
    }
    acc[rule.table].push(rule);
    return acc;
  }, {} as Record<string, Rule[]>);
};

/**
 * Get all unique event types from triggers
 * @param triggers - Array of triggers
 * @returns Array of unique event types
 */
export const getAllTriggerEvents = (triggers: Trigger[]): string[] => {
  return [...new Set(triggers.map(trigger => trigger.event))];
};

/**
 * Get all unique event types from rules
 * @param rules - Array of rules
 * @returns Array of unique event types
 */
export const getAllRuleEvents = (rules: Rule[]): string[] => {
  return [...new Set(rules.map(rule => rule.event))];
};

/**
 * Get trigger event types (INSERT, UPDATE, DELETE)
 * Extracts individual operation types from compound events
 * @param trigger - Trigger to analyze
 * @returns Array of event types
 */
export const getTriggerEventType = (trigger: Trigger): string[] => {
  const eventTypes: string[] = [];
  if (trigger.event.includes('INSERT')) eventTypes.push('INSERT');
  if (trigger.event.includes('UPDATE')) eventTypes.push('UPDATE');
  if (trigger.event.includes('DELETE')) eventTypes.push('DELETE');
  return eventTypes;
};
