/**
 * Triggers & Rules - Search & Sort Utility Functions
 * 
 * Functions for searching and sorting triggers and rules.
 */

import type { Trigger, Rule } from '../types';

/**
 * Search triggers by name, function, or table
 * @param triggers - Array of triggers
 * @param searchTerm - Search term (case-insensitive)
 * @returns Filtered triggers matching search term
 */
export const searchTriggers = (triggers: Trigger[], searchTerm: string): Trigger[] => {
  if (!searchTerm) return triggers;
  const term = searchTerm.toLowerCase();
  return triggers.filter(trigger =>
    trigger.name.toLowerCase().includes(term) ||
    trigger.function.toLowerCase().includes(term) ||
    trigger.table.toLowerCase().includes(term)
  );
};

/**
 * Search rules by name, command, or table
 * @param rules - Array of rules
 * @param searchTerm - Search term (case-insensitive)
 * @returns Filtered rules matching search term
 */
export const searchRules = (rules: Rule[], searchTerm: string): Rule[] => {
  if (!searchTerm) return rules;
  const term = searchTerm.toLowerCase();
  return rules.filter(rule =>
    rule.name.toLowerCase().includes(term) ||
    rule.command.toLowerCase().includes(term) ||
    rule.table.toLowerCase().includes(term)
  );
};

/**
 * Sort triggers by name
 * @param triggers - Array of triggers
 * @param ascending - Sort order (true = A-Z, false = Z-A)
 * @returns Sorted triggers
 */
export const sortTriggersByName = (triggers: Trigger[], ascending: boolean = true): Trigger[] => {
  return [...triggers].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return ascending ? comparison : -comparison;
  });
};

/**
 * Sort triggers by table name
 * @param triggers - Array of triggers
 * @param ascending - Sort order (true = A-Z, false = Z-A)
 * @returns Sorted triggers
 */
export const sortTriggersByTable = (triggers: Trigger[], ascending: boolean = true): Trigger[] => {
  return [...triggers].sort((a, b) => {
    const comparison = a.table.localeCompare(b.table);
    return ascending ? comparison : -comparison;
  });
};

/**
 * Sort rules by name
 * @param rules - Array of rules
 * @param ascending - Sort order (true = A-Z, false = Z-A)
 * @returns Sorted rules
 */
export const sortRulesByName = (rules: Rule[], ascending: boolean = true): Rule[] => {
  return [...rules].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return ascending ? comparison : -comparison;
  });
};

/**
 * Sort rules by table name
 * @param rules - Array of rules
 * @param ascending - Sort order (true = A-Z, false = Z-A)
 * @returns Sorted rules
 */
export const sortRulesByTable = (rules: Rule[], ascending: boolean = true): Rule[] => {
  return [...rules].sort((a, b) => {
    const comparison = a.table.localeCompare(b.table);
    return ascending ? comparison : -comparison;
  });
};
