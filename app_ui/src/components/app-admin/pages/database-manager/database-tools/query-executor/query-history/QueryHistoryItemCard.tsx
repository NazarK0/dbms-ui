/**
 * Query History Item Card Component
 * ==================================
 * 
 * Окремий запис в історії запитів.
 */

import { QueryHistoryItemProps } from './types';
import { QueryHistoryMetadata } from './QueryHistoryMetadata';
import { QueryHistoryActions } from './QueryHistoryActions';

export function QueryHistoryItemCard({
  item,
  onSelect,
  onCopy,
  onDelete,
}: QueryHistoryItemProps) {
  return (
    <div
      className="group flex items-start justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors border border-slate-200"
      onClick={() => onSelect(item.query)}
    >
      <div className="flex-1 min-w-0">
        {/* Запит */}
        <code className="text-sm text-slate-900 block bg-white px-3 py-2 rounded border border-slate-200 break-all">
          {item.query}
        </code>

        {/* Метадані */}
        <QueryHistoryMetadata item={item} />

        {/* Повідомлення про помилку */}
        {item.errorMessage && (
          <div className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded border border-red-200">
            {item.errorMessage}
          </div>
        )}
      </div>

      {/* Дії */}
      <QueryHistoryActions
        itemId={item.id}
        query={item.query}
        onCopy={onCopy}
        onDelete={onDelete}
      />
    </div>
  );
}
