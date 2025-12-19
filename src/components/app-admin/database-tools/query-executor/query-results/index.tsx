/**
 * QueryResults Component (Modular Version)
 * =========================================
 * 
 * Головний компонент відображення результатів виконання SQL запиту.
 * Розділено на підкомпоненти для кращої підтримуваності.
 */

import { useState } from 'react';
import { Card, CardContent } from '../../../../ui/card';
import { QueryResultsError } from './QueryResultsError';
import { QueryResultsHeader } from './QueryResultsHeader';
import { QueryResultsStats } from './QueryResultsStats';
import { QueryResultsActions } from './QueryResultsActions';
import { QueryResultsTable } from './QueryResultsTable';
import { QueryResultsEmptyState } from './QueryResultsEmptyState';
import { QueryResultsProps } from './types';
import { exportToCSV, exportToJSON, downloadFile } from '../utils';

export function QueryResults({ result, error }: QueryResultsProps) {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // Якщо немає ні результатів, ні помилки - не показуємо нічого
  if (!result && !error) {
    return null;
  }

  // Якщо є помилка - показуємо блок помилки
  if (error) {
    return <QueryResultsError error={error} />;
  }

  // Якщо немає результатів (не повинно статися, але для безпеки)
  if (!result) {
    return null;
  }

  // Обробники експорту
  const handleExportCSV = () => {
    const csv = exportToCSV(result);
    const timestamp = new Date().toISOString().split('T')[0];
    downloadFile(csv, `query-results-${timestamp}.csv`, 'text/csv');
  };

  const handleExportJSON = () => {
    const json = exportToJSON(result);
    const timestamp = new Date().toISOString().split('T')[0];
    downloadFile(json, `query-results-${timestamp}.json`, 'application/json');
  };

  const handleCopyToClipboard = async () => {
    const json = exportToJSON(result);
    await navigator.clipboard.writeText(json);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <QueryResultsHeader
        result={result}
        onExportCSV={handleExportCSV}
        onExportJSON={handleExportJSON}
        onCopyToClipboard={handleCopyToClipboard}
        copiedToClipboard={copiedToClipboard}
      />

      <CardContent className="p-0">
        {result.rows.length === 0 ? (
          <QueryResultsEmptyState />
        ) : (
          <QueryResultsTable columns={result.columns} rows={result.rows} />
        )}
      </CardContent>
    </Card>
  );
}

// Re-export types for convenience
export type { QueryResultsProps } from './types';