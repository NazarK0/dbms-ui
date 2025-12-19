/**
 * QueryEditorTextarea Component
 * ==============================
 * 
 * Textarea для SQL запиту з підтримкою клавіатурних shortcut'ів.
 */

import { Textarea } from '../../../../../../ui/textarea';
import { QueryEditorTextareaProps } from './types';
import { handleEditorKeyDown } from './utils';

export function QueryEditorTextarea({
  query,
  onQueryChange,
  onExecute,
  onSave,
}: QueryEditorTextareaProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    handleEditorKeyDown(e, onExecute, onSave);
  };

  return (
    <Textarea
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      onKeyDown={handleKeyDown}
      className="min-h-[200px] font-mono text-sm border-0 rounded-none resize-none focus-visible:ring-0"
      placeholder="Введіть ваш SQL запит тут...&#10;&#10;Підказки:&#10;• Ctrl/Cmd + Enter - виконати запит&#10;• Ctrl/Cmd + S - зберегти запит"
    />
  );
}
