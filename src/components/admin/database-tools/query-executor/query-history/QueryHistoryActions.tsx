/**
 * Query History Actions Component
 * ================================
 * 
 * Дії для запису історії (копіювання, видалення).
 */

import { Trash2, Copy } from 'lucide-react';
import { Button } from '../../../../ui/button';
import { QueryHistoryActionsProps } from './types';

export function QueryHistoryActions({
  itemId,
  query,
  onCopy,
  onDelete,
}: QueryHistoryActionsProps) {
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(query);
    onCopy(query);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(itemId);
  };

  return (
    <div className="flex items-center gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        title="Копіювати запит"
      >
        <Copy className="w-4 h-4" />
      </Button>
      {onDelete && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          title="Видалити з історії"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </Button>
      )}
    </div>
  );
}
