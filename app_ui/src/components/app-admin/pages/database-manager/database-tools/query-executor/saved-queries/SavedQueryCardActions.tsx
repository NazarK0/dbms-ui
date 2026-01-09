/**
 * SavedQueryCardActions Component
 * ================================
 * 
 * Кнопки дій для картки збереженого запиту (Play, Edit, Delete).
 */

import { Play, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../../../../../ui/button';
import { SavedQueryCardActionsProps } from './types';

export function SavedQueryCardActions({
  queryId,
  queryText,
  onSelectQuery,
  onDeleteQuery,
  onEditQuery,
}: SavedQueryCardActionsProps) {
  return (
    <div className="flex items-center gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onSelectQuery(queryText)}
        title="Виконати запит"
      >
        <Play className="w-4 h-4 text-green-600" />
      </Button>
      {onEditQuery && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEditQuery(queryId)}
          title="Редагувати"
        >
          <Edit className="w-4 h-4" />
        </Button>
      )}
      {onDeleteQuery && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDeleteQuery(queryId)}
          title="Видалити"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </Button>
      )}
    </div>
  );
}
