/**
 * Query History Metadata Component
 * =================================
 * 
 * Відображення метаданих запиту (статус, час, тривалість, база даних, кількість рядків).
 */

import { CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from '../../../../ui/badge';
import { QueryHistoryMetadataProps } from './types';

export function QueryHistoryMetadata({ item }: QueryHistoryMetadataProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-2">
      {/* Статус */}
      <Badge
        variant={item.status === 'success' ? 'default' : 'destructive'}
        className={item.status === 'success' ? 'bg-green-100 text-green-800 border-green-200' : ''}
      >
        {item.status === 'success' ? (
          <CheckCircle className="w-3 h-3 mr-1" />
        ) : (
          <AlertCircle className="w-3 h-3 mr-1" />
        )}
        {item.status === 'success' ? 'Успішно' : 'Помилка'}
      </Badge>

      {/* Час */}
      <Badge variant="outline" className="text-xs">
        {new Date(item.time).toLocaleString('uk-UA', {
          day: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Badge>

      {/* Тривалість */}
      <Badge variant="secondary" className="text-xs">
        {item.duration}
      </Badge>

      {/* База даних */}
      {item.database && (
        <Badge variant="outline" className="text-xs">
          {item.database}
        </Badge>
      )}

      {/* Кількість рядків */}
      {item.rowCount !== undefined && (
        <Badge variant="outline" className="text-xs">
          {item.rowCount} рядків
        </Badge>
      )}
    </div>
  );
}
