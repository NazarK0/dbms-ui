/**
 * Query Executor - Main Component
 * ================================
 * 
 * Головний компонент для виконання SQL запитів з історією та збереженими запитами.
 * 
 * ВАЖЛИВО: Mock дані мають бути замінені на реальні API запити.
 * Детальну інформацію про необхідні backend endpoints дивіться у файлі:
 * /mockData/admin/queryExecutor.ts
 * 
 * Структура компонента:
 * - QueryEditor: Редактор SQL запитів
 * - QueryResults: Відображення результатів
 * - QueryHistory: Історія виконаних запитів
 * - SavedQueries: Збережені запити
 */

import { useState } from 'react';
import { QueryEditor } from './query-editor';
import { QueryResults } from './query-results';
import { QueryHistory } from './query-history';
import { SavedQueries } from './saved-queries';
import { QueryResult, QueryError, QueryHistoryItem, SavedQuery } from './types';
import { detectQueryType } from './utils';
import { mockQueryHistory, mockSavedQueries } from '../../../../mockData/admin/queryExecutor';

interface QueryExecutorProps {
  selectedDatabase?: string;
}

export default function QueryExecutor({ selectedDatabase = 'production_db' }: QueryExecutorProps) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<QueryError | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [history, setHistory] = useState<QueryHistoryItem[]>(mockQueryHistory);
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>(mockSavedQueries);

  const handleExecuteQuery = async () => {
    if (!query.trim()) return;

    setIsExecuting(true);
    setError(null);
    setResult(null);

    // TODO: Замінити на реальний API запит
    // const response = await fetch('/api/admin/database/execute', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ query, database: selectedDatabase }),
    // });

    // Симуляція виконання запиту
    setTimeout(() => {
      try {
        const queryType = detectQueryType(query);
        const executionTime = Math.floor(Math.random() * 500) + 50;
        const timestamp = new Date().toISOString();

        // Симуляція успішного результату для SELECT
        if (queryType === 'SELECT') {
          const mockResult: QueryResult = {
            columns: ['id', 'name', 'email', 'status'],
            rows: [
              ['1', 'Іван Петренко', 'ivan@example.com', 'active'],
              ['2', 'Марія Коваленко', 'maria@example.com', 'active'],
              ['3', 'Олександр Шевченко', 'alex@example.com', 'inactive'],
            ],
            executionTime: `${executionTime}мс`,
            rowCount: 3,
            queryType,
          };
          setResult(mockResult);

          // Додати до історії
          const historyItem: QueryHistoryItem = {
            id: Date.now().toString(),
            query,
            database: selectedDatabase,
            time: timestamp,
            duration: `${executionTime}мс`,
            status: 'success',
          };
          setHistory((prev) => [historyItem, ...prev]);
        } else {
          // Симуляція результату для INSERT/UPDATE/DELETE
          const affectedRows = Math.floor(Math.random() * 10) + 1;
          const mockResult: QueryResult = {
            columns: [],
            rows: [],
            executionTime: `${executionTime}мс`,
            rowCount: affectedRows,
            queryType,
            message: `Успішно виконано. Змінено рядків: ${affectedRows}`,
          };
          setResult(mockResult);

          // Додати до історії
          const historyItem: QueryHistoryItem = {
            id: Date.now().toString(),
            query,
            database: selectedDatabase,
            time: timestamp,
            duration: `${executionTime}мс`,
            status: 'success',
          };
          setHistory((prev) => [historyItem, ...prev]);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Невідома помилка';
        setError({
          message: errorMessage,
          type: 'other',
          code: 'EXECUTION_ERROR',
        });

        // Додати помилку до історії
        const historyItem: QueryHistoryItem = {
          id: Date.now().toString(),
          query,
          database: selectedDatabase,
          time: new Date().toISOString(),
          duration: '0мс',
          status: 'error',
          error: errorMessage,
        };
        setHistory((prev) => [historyItem, ...prev]);
      } finally {
        setIsExecuting(false);
      }
    }, 1000);
  };

  const handleSaveQuery = (name: string, description?: string, tags?: string[]) => {
    if (!query.trim() || !name.trim()) return;

    // TODO: Замінити на реальний API запит
    // const response = await fetch('/api/admin/database/saved-queries', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, description, query, tags }),
    // });

    const newSavedQuery: SavedQuery = {
      id: Date.now().toString(),
      name,
      description: description || '',
      query,
      tags: tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSavedQueries((prev) => [newSavedQuery, ...prev]);
  };

  const handleSelectFromHistory = (historyQuery: string) => {
    setQuery(historyQuery);
  };

  const handleSelectSavedQuery = (savedQuery: string) => {
    setQuery(savedQuery);
  };

  const handleDeleteHistoryItem = (id: string) => {
    // TODO: Замінити на реальний API запит
    // await fetch(`/api/admin/database/history/${id}`, { method: 'DELETE' });
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteSavedQuery = (id: string) => {
    // TODO: Замінити на реальний API запит
    // await fetch(`/api/admin/database/saved-queries/${id}`, { method: 'DELETE' });
    setSavedQueries((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Ліва колонка: Editor + Results */}
      <div className="space-y-6">
        <QueryEditor
          query={query}
          onQueryChange={setQuery}
          onExecute={handleExecuteQuery}
          onSave={handleSaveQuery}
          isExecuting={isExecuting}
          selectedDatabase={selectedDatabase}
        />
        <QueryResults result={result} error={error} />
      </div>

      {/* Права колонка: History + Saved Queries */}
      <div className="space-y-6">
        <QueryHistory
          history={history}
          onSelectQuery={handleSelectFromHistory}
          onDeleteItem={handleDeleteHistoryItem}
        />
        <SavedQueries
          queries={savedQueries}
          onSelectQuery={handleSelectSavedQuery}
          onDeleteQuery={handleDeleteSavedQuery}
        />
      </div>
    </div>
  );
}

// Re-export types for external use
export type { QueryExecutorProps };