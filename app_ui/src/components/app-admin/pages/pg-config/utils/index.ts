/**
 * Centralized export for all PostgreSQL Configuration utilities
 * 
 * This index file provides a single entry point for importing
 * utility functions organized by category.
 */

// UI Helpers - Icons, names, and colors
export {
  getCategoryIcon,
  getCategoryName,
  getCategoryColor,
} from './uiHelpers';

// Statistics - Calculations and metrics
export {
  calculateStatistics,
  estimateMemoryUsage,
} from './statistics';

// Filters - Filtering and grouping parameters
export {
  getCategories,
  getParamsByCategory,
} from './filters';

// Generators - Configuration file generation
export {
  generateConfigFile,
} from './generators';

// Exporters - Export functionality
export {
  exportConfigAsJSON,
  exportConfigAsFile,
} from './exporters';

// Validators - Validation and checking
export {
  validateParamValue,
  isParamModified,
} from './validators';

// Parsers - Configuration file parsing
export {
  parseConfigFile,
} from './parsers';

// Presets - Preset configurations
export {
  getPresetConfig,
} from './presets';

// Comparators - Configuration comparison
export {
  compareConfigs,
} from './comparators';

// Formatters - Value formatting
export {
  formatFileSize,
} from './formatters';
