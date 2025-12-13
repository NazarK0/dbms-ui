/**
 * Utility functions for Triggers and Rules components
 */

import type { Trigger, Rule, TriggerStats, RuleStats, TriggerEvent, RuleEvent } from './types';

/**
 * Get badge variant for trigger event
 */
export const getEventBadgeColor = (event: string): string => {
  if (event.includes('INSERT')) {
    return 'bg-green-50 text-green-700 border-green-200';
  } else if (event.includes('UPDATE')) {
    return 'bg-blue-50 text-blue-700 border-blue-200';
  } else if (event.includes('DELETE')) {
    return 'bg-red-50 text-red-700 border-red-200';
  } else if (event.includes('SELECT')) {
    return 'bg-purple-50 text-purple-700 border-purple-200';
  }
  return 'bg-gray-50 text-gray-700 border-gray-200';
};

/**
 * Get badge variant for rule type
 */
export const getRuleTypeBadgeColor = (type: string): string => {
  if (type === 'INSTEAD') {
    return 'bg-orange-50 text-orange-700 border-orange-200';
  } else if (type === 'ALSO') {
    return 'bg-teal-50 text-teal-700 border-teal-200';
  }
  return 'bg-gray-50 text-gray-700 border-gray-200';
};

/**
 * Get badge variant for trigger timing
 */
export const getTimingBadgeColor = (timing: string): string => {
  if (timing === 'BEFORE') {
    return 'bg-yellow-50 text-yellow-700 border-yellow-200';
  } else if (timing === 'AFTER') {
    return 'bg-indigo-50 text-indigo-700 border-indigo-200';
  }
  return 'bg-gray-50 text-gray-700 border-gray-200';
};

/**
 * Filter triggers by table
 */
export const filterTriggersByTable = (triggers: Trigger[], tableName: string): Trigger[] => {
  if (!tableName) return triggers;
  return triggers.filter(trigger => trigger.table.toLowerCase() === tableName.toLowerCase());
};

/**
 * Filter triggers by enabled status
 */
export const filterTriggersByStatus = (triggers: Trigger[], enabled: boolean): Trigger[] => {
  return triggers.filter(trigger => trigger.enabled === enabled);
};

/**
 * Filter triggers by timing
 */
export const filterTriggersByTiming = (triggers: Trigger[], timing: 'BEFORE' | 'AFTER'): Trigger[] => {
  return triggers.filter(trigger => trigger.timing === timing);
};

/**
 * Filter triggers by event type
 */
export const filterTriggersByEvent = (triggers: Trigger[], eventType: string): Trigger[] => {
  return triggers.filter(trigger => 
    trigger.event.toLowerCase().includes(eventType.toLowerCase())
  );
};

/**
 * Filter rules by table
 */
export const filterRulesByTable = (rules: Rule[], tableName: string): Rule[] => {
  if (!tableName) return rules;
  return rules.filter(rule => rule.table.toLowerCase() === tableName.toLowerCase());
};

/**
 * Filter rules by type
 */
export const filterRulesByType = (rules: Rule[], type: 'INSTEAD' | 'ALSO'): Rule[] => {
  return rules.filter(rule => rule.type === type);
};

/**
 * Filter rules by event
 */
export const filterRulesByEvent = (rules: Rule[], event: string): Rule[] => {
  return rules.filter(rule => rule.event.toLowerCase() === event.toLowerCase());
};

/**
 * Get enabled triggers
 */
export const getEnabledTriggers = (triggers: Trigger[]): Trigger[] => {
  return triggers.filter(trigger => trigger.enabled);
};

/**
 * Get disabled triggers
 */
export const getDisabledTriggers = (triggers: Trigger[]): Trigger[] => {
  return triggers.filter(trigger => !trigger.enabled);
};

/**
 * Get BEFORE triggers
 */
export const getBeforeTriggers = (triggers: Trigger[]): Trigger[] => {
  return triggers.filter(trigger => trigger.timing === 'BEFORE');
};

/**
 * Get AFTER triggers
 */
export const getAfterTriggers = (triggers: Trigger[]): Trigger[] => {
  return triggers.filter(trigger => trigger.timing === 'AFTER');
};

/**
 * Get INSTEAD rules
 */
export const getInsteadRules = (rules: Rule[]): Rule[] => {
  return rules.filter(rule => rule.type === 'INSTEAD');
};

/**
 * Get ALSO rules
 */
export const getAlsoRules = (rules: Rule[]): Rule[] => {
  return rules.filter(rule => rule.type === 'ALSO');
};

/**
 * Get trigger statistics
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
 * Get rule statistics
 */
export const getRuleStats = (rules: Rule[]): RuleStats => {
  return {
    total: rules.length,
    insteadRules: getInsteadRules(rules).length,
    alsoRules: getAlsoRules(rules).length,
  };
};

/**
 * Check if trigger is enabled
 */
export const isTriggerEnabled = (trigger: Trigger): boolean => {
  return trigger.enabled;
};

/**
 * Get trigger event type (INSERT, UPDATE, DELETE)
 */
export const getTriggerEventType = (trigger: Trigger): string[] => {
  const eventTypes: string[] = [];
  if (trigger.event.includes('INSERT')) eventTypes.push('INSERT');
  if (trigger.event.includes('UPDATE')) eventTypes.push('UPDATE');
  if (trigger.event.includes('DELETE')) eventTypes.push('DELETE');
  return eventTypes;
};

/**
 * Get unique tables from triggers
 */
export const getUniqueTriggerTables = (triggers: Trigger[]): string[] => {
  return [...new Set(triggers.map(trigger => trigger.table))];
};

/**
 * Get unique tables from rules
 */
export const getUniqueRuleTables = (rules: Rule[]): string[] => {
  return [...new Set(rules.map(rule => rule.table))];
};

/**
 * Get triggers by table name
 */
export const getTriggersByTable = (triggers: Trigger[], tableName: string): Trigger[] => {
  return filterTriggersByTable(triggers, tableName);
};

/**
 * Get rules by table name
 */
export const getRulesByTable = (rules: Rule[], tableName: string): Rule[] => {
  return filterRulesByTable(rules, tableName);
};

/**
 * Count triggers per table
 */
export const countTriggersPerTable = (triggers: Trigger[]): Record<string, number> => {
  return triggers.reduce((acc, trigger) => {
    acc[trigger.table] = (acc[trigger.table] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Count rules per table
 */
export const countRulesPerTable = (rules: Rule[]): Record<string, number> => {
  return rules.reduce((acc, rule) => {
    acc[rule.table] = (acc[rule.table] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Search triggers by name or function
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
 * Search rules by name or command
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
 */
export const sortTriggersByName = (triggers: Trigger[], ascending: boolean = true): Trigger[] => {
  return [...triggers].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return ascending ? comparison : -comparison;
  });
};

/**
 * Sort triggers by table
 */
export const sortTriggersByTable = (triggers: Trigger[], ascending: boolean = true): Trigger[] => {
  return [...triggers].sort((a, b) => {
    const comparison = a.table.localeCompare(b.table);
    return ascending ? comparison : -comparison;
  });
};

/**
 * Sort rules by name
 */
export const sortRulesByName = (rules: Rule[], ascending: boolean = true): Rule[] => {
  return [...rules].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return ascending ? comparison : -comparison;
  });
};

/**
 * Sort rules by table
 */
export const sortRulesByTable = (rules: Rule[], ascending: boolean = true): Rule[] => {
  return [...rules].sort((a, b) => {
    const comparison = a.table.localeCompare(b.table);
    return ascending ? comparison : -comparison;
  });
};

/**
 * Validate trigger name (PostgreSQL rules)
 */
export const isValidTriggerName = (name: string): boolean => {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
};

/**
 * Validate rule name (PostgreSQL rules)
 */
export const isValidRuleName = (name: string): boolean => {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
};

/**
 * Generate CREATE TRIGGER SQL
 */
export const generateCreateTriggerSQL = (trigger: Trigger): string => {
  return `CREATE TRIGGER ${trigger.name}
  ${trigger.event}
  ON ${trigger.table}
  FOR EACH ROW
  EXECUTE FUNCTION ${trigger.function};`;
};

/**
 * Generate CREATE RULE SQL
 */
export const generateCreateRuleSQL = (rule: Rule): string => {
  return `CREATE RULE ${rule.name}
  AS ON ${rule.event}
  TO ${rule.table}
  ${rule.command};`;
};

/**
 * Generate DROP TRIGGER SQL
 */
export const generateDropTriggerSQL = (trigger: Trigger): string => {
  return `DROP TRIGGER IF EXISTS ${trigger.name} ON ${trigger.table};`;
};

/**
 * Generate DROP RULE SQL
 */
export const generateDropRuleSQL = (rule: Rule): string => {
  return `DROP RULE IF EXISTS ${rule.name} ON ${rule.table};`;
};

/**
 * Generate ALTER TRIGGER ENABLE SQL
 */
export const generateEnableTriggerSQL = (trigger: Trigger): string => {
  return `ALTER TABLE ${trigger.table} ENABLE TRIGGER ${trigger.name};`;
};

/**
 * Generate ALTER TRIGGER DISABLE SQL
 */
export const generateDisableTriggerSQL = (trigger: Trigger): string => {
  return `ALTER TABLE ${trigger.table} DISABLE TRIGGER ${trigger.name};`;
};

/**
 * Format trigger event for display
 */
export const formatTriggerEvent = (event: string): string => {
  return event;
};

/**
 * Format rule command for display
 */
export const formatRuleCommand = (command: string): string => {
  // Truncate long commands
  if (command.length > 50) {
    return command.substring(0, 50) + '...';
  }
  return command;
};

/**
 * Get trigger function name (without parentheses)
 */
export const getTriggerFunctionName = (trigger: Trigger): string => {
  return trigger.function.replace(/\(\)/g, '');
};

/**
 * Check if trigger is on specific table
 */
export const isTriggerOnTable = (trigger: Trigger, tableName: string): boolean => {
  return trigger.table.toLowerCase() === tableName.toLowerCase();
};

/**
 * Check if rule is on specific table
 */
export const isRuleOnTable = (rule: Rule, tableName: string): boolean => {
  return rule.table.toLowerCase() === tableName.toLowerCase();
};

/**
 * Get all event types from triggers
 */
export const getAllTriggerEvents = (triggers: Trigger[]): string[] => {
  return [...new Set(triggers.map(trigger => trigger.event))];
};

/**
 * Get all event types from rules
 */
export const getAllRuleEvents = (rules: Rule[]): string[] => {
  return [...new Set(rules.map(rule => rule.event))];
};

/**
 * Group triggers by table
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
 * Group rules by table
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
 * Check if event type is valid
 */
export const isValidEventType = (event: string): boolean => {
  const validEvents = ['INSERT', 'UPDATE', 'DELETE', 'SELECT'];
  return validEvents.some(valid => event.toUpperCase().includes(valid));
};

/**
 * Parse trigger event to components
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
