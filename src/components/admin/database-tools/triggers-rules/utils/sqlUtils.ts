/**
 * Triggers & Rules - SQL Generation Utility Functions
 * 
 * Functions for generating PostgreSQL SQL statements for triggers and rules.
 */

import type { Trigger, Rule } from '../types';

/**
 * Generate CREATE TRIGGER SQL statement
 * @param trigger - Trigger object
 * @returns CREATE TRIGGER SQL
 */
export const generateCreateTriggerSQL = (trigger: Trigger): string => {
  return `CREATE TRIGGER ${trigger.name}
  ${trigger.event}
  ON ${trigger.table}
  FOR EACH ROW
  EXECUTE FUNCTION ${trigger.function};`;
};

/**
 * Generate CREATE RULE SQL statement
 * @param rule - Rule object
 * @returns CREATE RULE SQL
 */
export const generateCreateRuleSQL = (rule: Rule): string => {
  return `CREATE RULE ${rule.name}
  AS ON ${rule.event}
  TO ${rule.table}
  ${rule.command};`;
};

/**
 * Generate DROP TRIGGER SQL statement
 * @param trigger - Trigger object
 * @returns DROP TRIGGER SQL
 */
export const generateDropTriggerSQL = (trigger: Trigger): string => {
  return `DROP TRIGGER IF EXISTS ${trigger.name} ON ${trigger.table};`;
};

/**
 * Generate DROP RULE SQL statement
 * @param rule - Rule object
 * @returns DROP RULE SQL
 */
export const generateDropRuleSQL = (rule: Rule): string => {
  return `DROP RULE IF EXISTS ${rule.name} ON ${rule.table};`;
};

/**
 * Generate ALTER TRIGGER ENABLE SQL statement
 * @param trigger - Trigger object
 * @returns ALTER TRIGGER ENABLE SQL
 */
export const generateEnableTriggerSQL = (trigger: Trigger): string => {
  return `ALTER TABLE ${trigger.table} ENABLE TRIGGER ${trigger.name};`;
};

/**
 * Generate ALTER TRIGGER DISABLE SQL statement
 * @param trigger - Trigger object
 * @returns ALTER TRIGGER DISABLE SQL
 */
export const generateDisableTriggerSQL = (trigger: Trigger): string => {
  return `ALTER TABLE ${trigger.table} DISABLE TRIGGER ${trigger.name};`;
};

/**
 * Generate SQL to list all triggers on a table
 * @param tableName - Table name
 * @returns SELECT SQL for triggers
 */
export const generateListTriggersSQL = (tableName: string): string => {
  return `SELECT 
    tgname AS trigger_name,
    tgrelid::regclass AS table_name,
    CASE 
      WHEN tgtype & 2 = 2 THEN 'BEFORE'
      WHEN tgtype & 64 = 64 THEN 'INSTEAD OF'
      ELSE 'AFTER'
    END AS trigger_timing,
    CASE 
      WHEN tgtype & 4 = 4 THEN 'INSERT'
      WHEN tgtype & 8 = 8 THEN 'DELETE'
      WHEN tgtype & 16 = 16 THEN 'UPDATE'
      WHEN tgtype & 32 = 32 THEN 'TRUNCATE'
    END AS trigger_event,
    pg_get_functiondef(tgfoid) AS function_definition,
    tgenabled AS enabled
  FROM pg_trigger
  WHERE tgrelid = '${tableName}'::regclass
    AND NOT tgisinternal
  ORDER BY tgname;`;
};

/**
 * Generate SQL to list all rules on a table
 * @param tableName - Table name
 * @returns SELECT SQL for rules
 */
export const generateListRulesSQL = (tableName: string): string => {
  return `SELECT 
    rulename AS rule_name,
    ev_class::regclass AS table_name,
    CASE ev_type
      WHEN '1' THEN 'SELECT'
      WHEN '2' THEN 'UPDATE'
      WHEN '3' THEN 'INSERT'
      WHEN '4' THEN 'DELETE'
    END AS rule_event,
    is_instead,
    pg_get_ruledef(oid) AS rule_definition
  FROM pg_rewrite
  WHERE ev_class = '${tableName}'::regclass
    AND rulename != '_RETURN'
  ORDER BY rulename;`;
};

/**
 * Generate SQL to get trigger function source code
 * @param functionName - Function name
 * @returns SELECT SQL for function definition
 */
export const generateGetTriggerFunctionSQL = (functionName: string): string => {
  return `SELECT pg_get_functiondef(oid) AS function_definition
  FROM pg_proc
  WHERE proname = '${functionName}';`;
};
