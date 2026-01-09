/**
 * SavedQueries Component (Modular Version)
 * =========================================
 * 
 * Головний компонент управління збереженими SQL запитами.
 * Розділено на підкомпоненти для кращої підтримуваності.
 */

import { useState } from 'react';
import { Card, CardContent } from '../../../../../../ui/card';
import { SavedQueriesHeader } from './SavedQueriesHeader';
import { SavedQueriesSearch } from './SavedQueriesSearch';
import { SavedQueriesTagFilter } from './SavedQueriesTagFilter';
import { SavedQueriesEmptyState } from './SavedQueriesEmptyState';
import { SavedQueriesList } from './SavedQueriesList';
import { SavedQueriesProps } from './types';
import { extractUniqueTags, filterQueries } from './utils';

export function SavedQueries({
  queries,
  onSelectQuery,
  onDeleteQuery,
  onEditQuery,
}: SavedQueriesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Отримати всі унікальні теги
  const allTags = extractUniqueTags(queries);

  // Фільтрувати запити
  const filteredQueries = filterQueries(queries, searchTerm, selectedTag);

  // Чи активний фільтр
  const hasActiveFilter = !!searchTerm || selectedTag !== null;

  return (
    <Card className="border-slate-200 shadow-sm">
      {/* Header */}
      <SavedQueriesHeader totalCount={queries.length} />

      {/* Пошук */}
      <div className="px-6">
        <SavedQueriesSearch value={searchTerm} onChange={setSearchTerm} />
      </div>

      {/* Фільтр по тегах */}
      <div className="px-6">
        <SavedQueriesTagFilter
          tags={allTags}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />
      </div>

      {/* Список запитів або порожній стан */}
      <CardContent>
        {filteredQueries.length === 0 ? (
          <SavedQueriesEmptyState hasActiveFilter={hasActiveFilter} />
        ) : (
          <SavedQueriesList
            queries={filteredQueries}
            onSelectQuery={onSelectQuery}
            onDeleteQuery={onDeleteQuery}
            onEditQuery={onEditQuery}
            onTagClick={setSelectedTag}
          />
        )}
      </CardContent>
    </Card>
  );
}

// Re-export types for convenience
export type { SavedQueriesProps } from './types';
