/**
 * SavedQueryCard Component
 * ========================
 * 
 * Картка окремого збереженого запиту (композиція header, actions, code, metadata).
 */

import { SavedQueryCardHeader } from './SavedQueryCardHeader';
import { SavedQueryCardActions } from './SavedQueryCardActions';
import { SavedQueryCardCode } from './SavedQueryCardCode';
import { SavedQueryCardMetadata } from './SavedQueryCardMetadata';
import { SavedQueryCardProps } from './types';

export function SavedQueryCard({
  query,
  onSelectQuery,
  onDeleteQuery,
  onEditQuery,
  onTagClick,
}: SavedQueryCardProps) {
  return (
    <div className="group p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
      {/* Заголовок з діями */}
      <div className="flex items-start justify-between mb-2">
        <SavedQueryCardHeader name={query.name} description={query.description} />
        <SavedQueryCardActions
          queryId={query.id}
          queryText={query.query}
          onSelectQuery={onSelectQuery}
          onDeleteQuery={onDeleteQuery}
          onEditQuery={onEditQuery}
        />
      </div>

      {/* SQL код */}
      <SavedQueryCardCode query={query.query} />

      {/* Теги та метадані */}
      <SavedQueryCardMetadata
        tags={query.tags}
        createdAt={query.createdAt}
        updatedAt={query.updatedAt}
        onTagClick={onTagClick}
      />
    </div>
  );
}
