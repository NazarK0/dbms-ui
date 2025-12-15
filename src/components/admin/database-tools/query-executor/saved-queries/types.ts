/**
 * Saved Queries Component - TypeScript Interfaces
 * ================================================
 * 
 * Типи для модульних підкомпонентів SavedQueries.
 */

import { SavedQuery } from '../types';

/**
 * Props для головного компонента SavedQueries
 */
export interface SavedQueriesProps {
  /** Масив збережених запитів */
  queries: SavedQuery[];
  /** Callback при виборі запиту */
  onSelectQuery: (query: string) => void;
  /** Callback при видаленні запиту */
  onDeleteQuery?: (id: string) => void;
  /** Callback при редагуванні запиту */
  onEditQuery?: (id: string) => void;
}

/**
 * Props для компонента SavedQueriesHeader
 */
export interface SavedQueriesHeaderProps {
  /** Загальна кількість запитів */
  totalCount: number;
}

/**
 * Props для компонента SavedQueriesSearch
 */
export interface SavedQueriesSearchProps {
  /** Поточне значення пошуку */
  value: string;
  /** Callback при зміні значення */
  onChange: (value: string) => void;
}

/**
 * Props для компонента SavedQueriesTagFilter
 */
export interface SavedQueriesTagFilterProps {
  /** Масив унікальних тегів */
  tags: string[];
  /** Вибраний тег (null = всі) */
  selectedTag: string | null;
  /** Callback при виборі тегу */
  onSelectTag: (tag: string | null) => void;
}

/**
 * Props для компонента SavedQueriesEmptyState
 */
export interface SavedQueriesEmptyStateProps {
  /** Чи активний пошук/фільтр */
  hasActiveFilter: boolean;
}

/**
 * Props для компонента SavedQueriesList
 */
export interface SavedQueriesListProps {
  /** Масив запитів для відображення */
  queries: SavedQuery[];
  /** Callback при виборі запиту */
  onSelectQuery: (query: string) => void;
  /** Callback при видаленні запиту */
  onDeleteQuery?: (id: string) => void;
  /** Callback при редагуванні запиту */
  onEditQuery?: (id: string) => void;
  /** Callback при кліку на тег */
  onTagClick?: (tag: string) => void;
}

/**
 * Props для компонента SavedQueryCard
 */
export interface SavedQueryCardProps {
  /** Об'єкт збереженого запиту */
  query: SavedQuery;
  /** Callback при виборі запиту */
  onSelectQuery: (query: string) => void;
  /** Callback при видаленні запиту */
  onDeleteQuery?: (id: string) => void;
  /** Callback при редагуванні запиту */
  onEditQuery?: (id: string) => void;
  /** Callback при кліку на тег */
  onTagClick?: (tag: string) => void;
}

/**
 * Props для компонента SavedQueryCardHeader
 */
export interface SavedQueryCardHeaderProps {
  /** Назва запиту */
  name: string;
  /** Опис запиту */
  description?: string;
}

/**
 * Props для компонента SavedQueryCardActions
 */
export interface SavedQueryCardActionsProps {
  /** ID запиту */
  queryId: string;
  /** SQL текст запиту */
  queryText: string;
  /** Callback при виборі запиту */
  onSelectQuery: (query: string) => void;
  /** Callback при видаленні запиту */
  onDeleteQuery?: (id: string) => void;
  /** Callback при редагуванні запиту */
  onEditQuery?: (id: string) => void;
}

/**
 * Props для компонента SavedQueryCardCode
 */
export interface SavedQueryCardCodeProps {
  /** SQL текст запиту */
  query: string;
}

/**
 * Props для компонента SavedQueryCardMetadata
 */
export interface SavedQueryCardMetadataProps {
  /** Масив тегів */
  tags?: string[];
  /** Дата створення (ISO string) */
  createdAt: string;
  /** Дата оновлення (ISO string) */
  updatedAt: string;
  /** Callback при кліку на тег */
  onTagClick?: (tag: string) => void;
}
