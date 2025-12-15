/**
 * SavedQueriesList Component
 * ===========================
 * 
 * Список карток збережених запитів з вертикальним скролом.
 */

import { SavedQueryCard } from './SavedQueryCard';
import { SavedQueriesListProps } from './types';

export function SavedQueriesList({
  queries,
  onSelectQuery,
  onDeleteQuery,
  onEditQuery,
  onTagClick,
}: SavedQueriesListProps) {
  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto">
      {queries.map((query) => (
        <SavedQueryCard
          key={query.id}
          query={query}
          onSelectQuery={onSelectQuery}
          onDeleteQuery={onDeleteQuery}
          onEditQuery={onEditQuery}
          onTagClick={onTagClick}
        />
      ))}
    </div>
  );
}
