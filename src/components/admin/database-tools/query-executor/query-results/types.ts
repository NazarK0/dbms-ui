/**
 * Query Results Component - TypeScript Interfaces
 * ================================================
 * 
 * Типи для модульних підкомпонентів QueryResults.
 */

import { QueryResult, QueryError } from '../types';

/**
 * Props для головного компонента QueryResults
 */
export interface QueryResultsProps {
  /** Результати виконання запиту */
  result?: QueryResult;
  /** Помилка виконання запиту */
  error?: QueryError;
}

/**
 * Props для компонента QueryResultsError
 */
export interface QueryResultsErrorProps {
  /** Об'єкт помилки */
  error: QueryError;
}

/**
 * Props для компонента QueryResultsHeader
 */
export interface QueryResultsHeaderProps {
  /** Результати запиту для відображення статистики */
  result: QueryResult;
  /** Callback для експорту в CSV */
  onExportCSV: () => void;
  /** Callback для експорту в JSON */
  onExportJSON: () => void;
  /** Callback для копіювання в clipboard */
  onCopyToClipboard: () => void;
  /** Чи скопійовано в clipboard */
  copiedToClipboard: boolean;
}

/**
 * Props для компонента QueryResultsStats
 */
export interface QueryResultsStatsProps {
  /** Кількість рядків */
  rowCount: number;
  /** Час виконання */
  executionTime: string;
  /** Кількість порушених рядків (для INSERT/UPDATE/DELETE) */
  affectedRows?: number;
}

/**
 * Props для компонента QueryResultsActions
 */
export interface QueryResultsActionsProps {
  /** Callback для експорту в CSV */
  onExportCSV: () => void;
  /** Callback для експорту в JSON */
  onExportJSON: () => void;
  /** Callback для копіювання в clipboard */
  onCopyToClipboard: () => void;
  /** Чи скопійовано в clipboard */
  copiedToClipboard: boolean;
}

/**
 * Props для компонента QueryResultsTable
 */
export interface QueryResultsTableProps {
  /** Масив назв колонок */
  columns: string[];
  /** Масив рядків даних */
  rows: any[][];
}

/**
 * Props для компонента QueryResultsEmptyState
 * (порожній об'єкт, компонент не приймає пропси)
 */
export interface QueryResultsEmptyStateProps {
  // Компонент не має пропсів
}
