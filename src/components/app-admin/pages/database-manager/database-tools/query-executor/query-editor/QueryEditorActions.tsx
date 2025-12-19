/**
 * QueryEditorActions Component
 * =============================
 * 
 * Кнопки дій редактора: Save та Execute.
 */

import { Play, Save } from 'lucide-react';
import { Button } from '../../../../../../ui/button';
import { QueryEditorActionsProps } from './types';

export function QueryEditorActions({
  onSave,
  onExecute,
  isExecuting,
  isValid,
  validationError,
}: QueryEditorActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {/* Кнопка збереження */}
      {onSave && (
        <Button variant="outline" size="sm" onClick={onSave}>
          <Save className="w-4 h-4 mr-2" />
          Зберегти
        </Button>
      )}

      {/* Кнопка виконання */}
      <Button
        size="sm"
        onClick={onExecute}
        disabled={isExecuting || !isValid}
        className="bg-green-600 hover:bg-green-700"
        title={!isValid ? validationError : 'Ctrl/Cmd + Enter'}
      >
        <Play className="w-4 h-4 mr-2" />
        {isExecuting ? 'Виконується...' : 'Виконати'}
      </Button>
    </div>
  );
}
