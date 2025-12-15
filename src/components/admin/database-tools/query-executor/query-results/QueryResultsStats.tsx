/**
 * QueryResultsStats Component
 * ============================
 * 
 * Відображає статистику виконання запиту (кількість рядків, час, affected rows).
 */

import { Badge } from '../../../../ui/badge';
import { QueryResultsStatsProps } from './types';

export function QueryResultsStats({ 
  rowCount, 
  executionTime, 
  affectedRows 
}: QueryResultsStatsProps) {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary">{rowCount} рядків</Badge>
      <Badge variant="outline">Час: {executionTime}</Badge>
      {affectedRows !== undefined && (
        <Badge variant="outline">Порушено: {affectedRows}</Badge>
      )}
    </div>
  );
}
