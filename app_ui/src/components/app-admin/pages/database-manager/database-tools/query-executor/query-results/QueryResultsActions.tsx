/**
 * QueryResultsActions Component
 * ==============================
 * 
 * Кнопки експорту (CSV, JSON) та копіювання результатів у буфер обміну.
 */

import { Download, Copy } from 'lucide-react';
import { Button } from '../../../../../../ui/button';
import { QueryResultsActionsProps } from './types';

export function QueryResultsActions({
  onExportCSV,
  onExportJSON,
  onCopyToClipboard,
  copiedToClipboard,
}: QueryResultsActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onCopyToClipboard}
        title="Копіювати у буфер обміну"
      >
        <Copy className="w-4 h-4 mr-2" />
        {copiedToClipboard ? 'Скопійовано!' : 'Копіювати'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onExportCSV}
        title="Експортувати в CSV"
      >
        <Download className="w-4 h-4 mr-2" />
        CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onExportJSON}
        title="Експортувати в JSON"
      >
        <Download className="w-4 h-4 mr-2" />
        JSON
      </Button>
    </div>
  );
}
