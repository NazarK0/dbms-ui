/**
 * Table Browser Utils - Centralized exports
 */

// UI Formatters (4 functions)
export {
  getKeyBadgeVariant,
  getKeyTypeText,
  formatColumnType,
  formatCellValue,
} from './formatters';

// Column Filters (9 functions)
export {
  getPrimaryKeyColumns,
  getUniqueKeyColumns,
  getForeignKeyColumns,
  getNullableColumns,
  getNonNullableColumns,
  filterColumnsByType,
  getNumericColumns,
  getTextColumns,
  getTimestampColumns,
} from './column-filters';

// Column Validators (5 functions)
export {
  hasKeyConstraint,
  isNullable,
  hasDefaultValue,
  hasPrimaryKey,
  hasForeignKeys,
} from './column-validators';

// Column Utilities (5 functions)
export {
  getColumnCount,
  getColumnNames,
  getColumnByName,
  sortColumnsByKey,
  getColumnTypeCategory,
} from './column-utils';

// Data Utilities (6 functions)
export {
  filterTables,
  hasTableData,
  getRowCount,
  getDataKeys,
  limitTableData,
  isNullValue,
} from './data-utils';

// Analytics (2 functions)
export {
  getTableStats,
  estimateTableSize,
} from './analytics';

// SQL Generators (1 function)
export {
  generateCreateTableSQL,
} from './generators';

// Validators (1 function)
export {
  isValidTableName,
} from './validators';