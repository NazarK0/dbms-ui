// Central exports for Triggers and Rules components
export { default as TriggersTable } from './TriggersTable';
export { default as RulesTable } from './RulesTable';
export * from './types';
export * from './utils';

// Utility modules (for advanced usage)
// Import directly from specific modules for better tree-shaking:
// import { getEventBadgeColor } from './utils/badgeUtils';
// import { filterTriggersByTable } from './utils/filterUtils';
// import { getTriggerStats } from './utils/statsUtils';
// import { searchTriggers } from './utils/searchUtils';
// import { isValidTriggerName } from './utils/validationUtils';
// import { generateCreateTriggerSQL } from './utils/sqlUtils';
// import { formatRuleCommand } from './utils/formatUtils';