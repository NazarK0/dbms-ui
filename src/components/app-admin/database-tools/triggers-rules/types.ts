/**
 * TypeScript type definitions for Triggers and Rules components
 */

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

export type TriggerEvent = 
  | 'BEFORE INSERT'
  | 'AFTER INSERT'
  | 'BEFORE UPDATE'
  | 'AFTER UPDATE'
  | 'BEFORE DELETE'
  | 'AFTER DELETE'
  | 'BEFORE INSERT OR UPDATE'
  | 'AFTER INSERT OR UPDATE';

export type RuleEvent = 'INSERT' | 'UPDATE' | 'DELETE' | 'SELECT';

export type RuleType = 'INSTEAD' | 'ALSO';

export interface TriggersRulesProps {
  selectedDatabase?: string;
}

export interface TriggersTableProps {
  triggers: Trigger[];
  selectedDatabase?: string;
  onCreateTrigger?: () => void;
  onEditTrigger?: (trigger: Trigger) => void;
  onDeleteTrigger?: (trigger: Trigger) => void;
  onToggleTrigger?: (trigger: Trigger) => void;
}

export interface RulesTableProps {
  rules: Rule[];
  onCreateRule?: () => void;
  onEditRule?: (rule: Rule) => void;
  onDeleteRule?: (rule: Rule) => void;
}

export interface TriggerStats {
  total: number;
  enabled: number;
  disabled: number;
  beforeTriggers: number;
  afterTriggers: number;
}

export interface RuleStats {
  total: number;
  insteadRules: number;
  alsoRules: number;
}
