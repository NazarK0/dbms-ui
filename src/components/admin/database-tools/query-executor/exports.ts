/**
 * Query Executor - Named Exports
 * ===============================
 * 
 * Експорт окремих компонентів та utilities для використання
 * в інших частинах додатку.
 */

// Main component
export { default } from './index';

// Sub-components (для можливого перевикористання)
export { QueryEditor } from './query-editor';
export { QueryResults } from './query-results';
export { QueryHistory } from './query-history';
export { SavedQueries } from './saved-queries';

// Query Editor sub-components (для advanced використання)
export { QueryEditorHeader } from './query-editor/QueryEditorHeader';
export { QueryEditorActions } from './query-editor/QueryEditorActions';
export { DatabaseAlert } from './query-editor/DatabaseAlert';
export { DangerousQueryAlert } from './query-editor/DangerousQueryAlert';
export { ValidationErrorAlert } from './query-editor/ValidationErrorAlert';
export { QueryEditorTextarea } from './query-editor/QueryEditorTextarea';

// Query History sub-components (для advanced використання)
export { QueryHistoryHeader } from './query-history/QueryHistoryHeader';
export { QueryHistoryList } from './query-history/QueryHistoryList';
export { QueryHistoryItemCard } from './query-history/QueryHistoryItemCard';
export { QueryHistoryMetadata } from './query-history/QueryHistoryMetadata';
export { QueryHistoryActions } from './query-history/QueryHistoryActions';
export { QueryHistoryEmptyState } from './query-history/QueryHistoryEmptyState';

// Query Results sub-components (для advanced використання)
export { QueryResultsError } from './query-results/QueryResultsError';
export { QueryResultsHeader } from './query-results/QueryResultsHeader';
export { QueryResultsStats } from './query-results/QueryResultsStats';
export { QueryResultsActions } from './query-results/QueryResultsActions';
export { QueryResultsTable } from './query-results/QueryResultsTable';
export { QueryResultsEmptyState } from './query-results/QueryResultsEmptyState';

// Saved Queries sub-components (для advanced використання)
export { SavedQueriesHeader } from './saved-queries/SavedQueriesHeader';
export { SavedQueriesSearch } from './saved-queries/SavedQueriesSearch';
export { SavedQueriesTagFilter } from './saved-queries/SavedQueriesTagFilter';
export { SavedQueriesEmptyState } from './saved-queries/SavedQueriesEmptyState';
export { SavedQueriesList } from './saved-queries/SavedQueriesList';
export { SavedQueryCard } from './saved-queries/SavedQueryCard';
export { SavedQueryCardHeader } from './saved-queries/SavedQueryCardHeader';
export { SavedQueryCardActions } from './saved-queries/SavedQueryCardActions';
export { SavedQueryCardCode } from './saved-queries/SavedQueryCardCode';
export { SavedQueryCardMetadata } from './saved-queries/SavedQueryCardMetadata';

// Types
export type {
  QueryResult,
  QueryHistoryItem,
  SavedQuery,
  QueryError,
  QueryExecutionParams,
  QueryStats,
} from './types';

// Query History types
export type {
  QueryHistoryProps,
  QueryHistoryHeaderProps,
  QueryHistoryItemProps,
  QueryHistoryListProps,
  QueryHistoryMetadataProps,
  QueryHistoryActionsProps,
} from './query-history/types';

// Query Results types
export type {
  QueryResultsProps,
  QueryResultsErrorProps,
  QueryResultsHeaderProps,
  QueryResultsStatsProps,
  QueryResultsActionsProps,
  QueryResultsTableProps,
  QueryResultsEmptyStateProps,
} from './query-results/types';

// Saved Queries types
export type {
  SavedQueriesProps,
  SavedQueriesHeaderProps,
  SavedQueriesSearchProps,
  SavedQueriesTagFilterProps,
  SavedQueriesEmptyStateProps,
  SavedQueriesListProps,
  SavedQueryCardProps,
  SavedQueryCardHeaderProps,
  SavedQueryCardActionsProps,
  SavedQueryCardCodeProps,
  SavedQueryCardMetadataProps,
} from './saved-queries/types';

// Query Editor types
export type {
  QueryEditorProps,
  QueryEditorHeaderProps,
  QueryEditorActionsProps,
  DatabaseAlertProps,
  DangerousQueryAlertProps,
  ValidationErrorAlertProps,
  QueryEditorTextareaProps,
} from './query-editor/types';

// Utility functions (всі з utils/)
export {
  // Query Type Detection
  detectQueryType,
  isReadOnlyQuery,
  isDataModificationQuery,
  isSchemaModificationQuery,
  // Formatters
  formatExecutionTime,
  formatCellValue,
  formatErrorMessage,
  formatBytes,
  formatDateTime,
  formatRowCount,
  // Validation
  validateQuery,
  isDangerousQuery,
  isCriticalQuery,
  hasWhereClause,
  isUnconditionalModification,
  getQueryDangerLevel,
  // Export Functions
  exportToCSV,
  exportToJSON,
  exportToSQL,
  exportToXML,
  downloadFile,
  exportAndDownload,
  EXPORT_MIME_TYPES,
  // History Utilities
  filterQueryHistory,
  sortQueryHistory,
  parseDuration,
  groupHistoryByDate,
  groupHistoryByStatus,
  getHistoryStats,
} from './utils';

export type {
  QueryType,
  QueryValidationResult,
  ExportFormat,
  HistorySortBy,
} from './utils';

// Saved Queries utilities
export {
  extractUniqueTags,
  filterQueries,
} from './saved-queries/utils';

// Query Editor utilities
export {
  handleEditorKeyDown,
} from './query-editor/utils';