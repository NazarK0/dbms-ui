/**
 * Query History Types
 * ===================
 * 
 * Типи для компонента історії SQL запитів.
 */

import { QueryHistoryItem } from '../types';

/**
 * Пропси для компонента QueryHistory
 */
export interface QueryHistoryProps {
  /** Масив записів історії */
  history: QueryHistoryItem[];
  /** Callback при виборі запиту з історії */
  onSelectQuery: (query: string) => void;
  /** Callback при видаленні запису з історії */
  onDeleteItem?: (id: string) => void;
}

/**
 * Пропси для компонента QueryHistoryHeader
 */
export interface QueryHistoryHeaderProps {
  /** Загальна кількість записів історії */
  totalCount: number;
  /** Поточне значення сортування */
  sortBy: 'time' | 'duration' | 'status';
  /** Callback при зміні сортування */
  onSortChange: (sortBy: 'time' | 'duration' | 'status') => void;
  /** Значення пошукового терміну */
  searchTerm: string;
  /** Callback при зміні пошукового терміну */
  onSearchChange: (searchTerm: string) => void;
}

/**
 * Пропси для компонента QueryHistoryItem
 */
export interface QueryHistoryItemProps {
  /** Запис історії */
  item: QueryHistoryItem;
  /** Callback при виборі запиту */
  onSelect: (query: string) => void;
  /** Callback при копіюванні запиту */
  onCopy: (query: string) => void;
  /** Callback при видаленні запису */
  onDelete?: (id: string) => void;
}

/**
 * Пропси для компонента QueryHistoryList
 */
export interface QueryHistoryListProps {
  /** Відфільтровані та відсортовані записи історії */
  items: QueryHistoryItem[];
  /** Чи є пошуковий термін */
  hasSearchTerm: boolean;
  /** Callback при виборі запиту */
  onSelectQuery: (query: string) => void;
  /** Callback при копіюванні запиту */
  onCopyQuery: (query: string) => void;
  /** Callback при видаленні запису */
  onDeleteItem?: (id: string) => void;
}

/**
 * Пропси для компонента QueryHistoryMetadata
 */
export interface QueryHistoryMetadataProps {
  /** Запис історії */
  item: QueryHistoryItem;
}

/**
 * Пропси для компонента QueryHistoryActions
 */
export interface QueryHistoryActionsProps {
  /** ID запису */
  itemId: string;
  /** SQL запит */
  query: string;
  /** Callback при копіюванні */
  onCopy: (query: string) => void;
  /** Callback при видаленні */
  onDelete?: (id: string) => void;
}
