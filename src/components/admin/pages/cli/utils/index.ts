/**
 * Centralized export for all CLI utilities
 * 
 * This index file provides a single entry point for importing
 * utility functions organized by category.
 */

// Generators - Command execution and mock output
export {
  generateMockOutput,
  executeCommand,
} from './generators';

// Exporters - Export history in various formats
export {
  exportHistory,
  exportHistoryToCSV,
  exportHistoryToJSON,
  copyToClipboard,
} from './exporters';

// Statistics - Calculate metrics and statistics
export {
  calculateStats,
  calculateSuccessRate,
  getCommandFrequency,
  getMostUsedCommands,
  getUniqueCommands,
  groupHistoryByStatus,
} from './statistics';

// Filters - Filter and search history
export {
  filterHistory,
  searchHistory,
  sortHistoryByTimestamp,
  getRecentHistory,
} from './filters';

// Validators - Command validation
export {
  validateCommand,
} from './validators';

// Formatters - Format output and values
export {
  formatOutput,
  formatTimestamp,
  formatExecutionTime,
  highlightSQL,
} from './formatters';

// Parsers - Parse command types and categories
export {
  getCommandType,
  getCommandCategory,
  isPsqlCommand,
  isSQLCommand,
} from './parsers';

// UI Helpers - UI-related helper functions
export {
  getStatusColorClass,
  getStatusBadgeVariant,
  getStatusLabel,
} from './uiHelpers';

// Navigation - History navigation
export {
  getHistoryCommand,
} from './navigation';

// Storage - LocalStorage management
export {
  saveCommandToStorage,
  loadCommandsFromStorage,
  clearStorageCommands,
} from './storage';

// Helpers - General helper functions
export {
  getCommandHelp,
  autoCompleteCommand,
  clearHistory,
} from './helpers';
