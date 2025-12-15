/**
 * QueryResultsHeader Component
 * =============================
 * 
 * Заголовок панелі результатів з назвою, статистикою та кнопками експорту.
 */

import { CardHeader, CardTitle } from '../../../../ui/card';
import { QueryResultsStats } from './QueryResultsStats';
import { QueryResultsActions } from './QueryResultsActions';
import { QueryResultsHeaderProps } from './types';

export function QueryResultsHeader({
  result,
  onExportCSV,
  onExportJSON,
  onCopyToClipboard,
  copiedToClipboard,
}: QueryResultsHeaderProps) {
  return (
    <CardHeader className="bg-slate-50/50">
      <div className="flex items-center justify-between">
        <CardTitle>Результати запиту</CardTitle>
        <div className="flex items-center gap-4">
          <QueryResultsStats
            rowCount={result.rowCount}
            executionTime={result.executionTime}
            affectedRows={result.affectedRows}
          />
          <QueryResultsActions
            onExportCSV={onExportCSV}
            onExportJSON={onExportJSON}
            onCopyToClipboard={onCopyToClipboard}
            copiedToClipboard={copiedToClipboard}
          />
        </div>
      </div>
    </CardHeader>
  );
}
