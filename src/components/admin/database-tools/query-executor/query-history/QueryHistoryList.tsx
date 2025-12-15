/**
 * Query History List Component
 * =============================
 * 
 * Список записів історії запитів з обробкою порожнього стану.
 */

import { QueryHistoryListProps } from './types';
import { QueryHistoryItemCard } from './QueryHistoryItemCard';
import { QueryHistoryEmptyState } from './QueryHistoryEmptyState';

export function QueryHistoryList({
  items,
  hasSearchTerm,
  onSelectQuery,
  onCopyQuery,
  onDeleteItem,
}: QueryHistoryListProps) {
  if (items.length === 0) {
    return <QueryHistoryEmptyState hasSearchTerm={hasSearchTerm} />;
  }

  return (
    <div className="space-y-3 max-h-[500px] overflow-y-auto">
      {items.map((item) => (
        <QueryHistoryItemCard
          key={item.id}
          item={item}
          onSelect={onSelectQuery}
          onCopy={onCopyQuery}
          onDelete={onDeleteItem}
        />
      ))}
    </div>
  );
}
