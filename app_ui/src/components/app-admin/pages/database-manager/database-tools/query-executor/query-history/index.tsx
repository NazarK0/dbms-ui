/**
 * Query History Component
 * =======================
 * 
 * Головний компонент відображення історії виконаних SQL запитів.
 * 
 * Структура підкомпонентів:
 * - QueryHistoryHeader: Заголовок з пошуком та сортуванням
 * - QueryHistoryList: Список записів історії
 * - QueryHistoryItemCard: Окремий запис історії
 * - QueryHistoryMetadata: Метадані запиту (статус, час, тривалість)
 * - QueryHistoryActions: Дії для запису (копіювання, видалення)
 * - QueryHistoryEmptyState: Порожній стан списку
 */

import { useState } from 'react';
import { Card, CardContent } from '../../../../../../ui/card';
import { QueryHistoryProps } from './types';
import { QueryHistoryHeader } from './QueryHistoryHeader';
import { QueryHistoryList } from './QueryHistoryList';
import { filterQueryHistory, sortQueryHistory } from '../utils';

export function QueryHistory({ history, onSelectQuery, onDeleteItem }: QueryHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'time' | 'duration' | 'status'>('time');

  // Фільтрація та сортування
  const filteredHistory = filterQueryHistory(history, searchTerm);
  const sortedHistory = sortQueryHistory(filteredHistory, sortBy);

  // Обробник копіювання (для можливого показу toast notification)
  const handleCopyQuery = (query: string) => {
    // TODO: Показати toast notification "Запит скопійовано"
    console.log('Query copied to clipboard:', query);
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <QueryHistoryHeader
        totalCount={history.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <CardContent>
        <QueryHistoryList
          items={sortedHistory}
          hasSearchTerm={!!searchTerm}
          onSelectQuery={onSelectQuery}
          onCopyQuery={handleCopyQuery}
          onDeleteItem={onDeleteItem}
        />
      </CardContent>
    </Card>
  );
}

// Default export для зворотної сумісності
export default QueryHistory;