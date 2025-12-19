/**
 * QueryEditor Component (Modular Version)
 * ========================================
 * 
 * Головний компонент редактора SQL запитів з можливістю виконання та збереження.
 * Розділено на підкомпоненти для кращої підтримуваності.
 */

import { Card, CardContent, CardHeader } from '../../../../../../ui/card';
import { QueryEditorHeader } from './QueryEditorHeader';
import { QueryEditorActions } from './QueryEditorActions';
import { DatabaseAlert } from './DatabaseAlert';
import { DangerousQueryAlert } from './DangerousQueryAlert';
import { ValidationErrorAlert } from './ValidationErrorAlert';
import { QueryEditorTextarea } from './QueryEditorTextarea';
import { QueryEditorProps } from './types';
import { validateQuery, isDangerousQuery } from '../utils';

export function QueryEditor({
  query,
  onQueryChange,
  onExecute,
  onSave,
  isExecuting,
  selectedDatabase,
}: QueryEditorProps) {
  // Валідація запиту
  const validation = validateQuery(query);
  const isDangerous = isDangerousQuery(query);

  // Обробник виконання (з перевіркою валідації)
  const handleExecute = () => {
    if (validation.valid) {
      onExecute();
    }
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="bg-slate-50/50">
        {/* Header з кнопками */}
        <div className="flex items-center justify-between">
          <QueryEditorHeader />
          <QueryEditorActions
            onSave={onSave}
            onExecute={handleExecute}
            isExecuting={isExecuting}
            isValid={validation.valid}
            validationError={validation.error}
          />
        </div>

        {/* Alert про вибрану базу даних */}
        {selectedDatabase && (
          <DatabaseAlert databaseName={selectedDatabase} />
        )}

        {/* Warning про небезпечний запит */}
        <DangerousQueryAlert show={isDangerous && validation.valid} />

        {/* Помилка валідації */}
        {!validation.valid && (
          <ValidationErrorAlert error={validation.error || 'Невалідний запит'} />
        )}
      </CardHeader>

      {/* Textarea для SQL запиту */}
      <CardContent className="p-0">
        <QueryEditorTextarea
          query={query}
          onQueryChange={onQueryChange}
          onExecute={handleExecute}
          onSave={onSave}
        />
      </CardContent>
    </Card>
  );
}

// Re-export types for convenience
export type { QueryEditorProps } from './types';