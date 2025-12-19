/**
 * SavedQueriesEmptyState Component
 * =================================
 * 
 * Порожній стан для списку збережених запитів.
 */

import { SavedQueriesEmptyStateProps } from './types';

export function SavedQueriesEmptyState({ hasActiveFilter }: SavedQueriesEmptyStateProps) {
  return (
    <div className="text-center py-8 text-slate-500">
      {hasActiveFilter ? 'Запитів не знайдено' : 'Немає збережених запитів'}
    </div>
  );
}
