/**
 * Query Editor - Utility Functions
 * =================================
 * 
 * Допоміжні функції для обробки клавіатурних shortcut'ів.
 */

/**
 * Обробник клавіатурних shortcut'ів для редактора
 * 
 * @param e - Keyboard event
 * @param onExecute - Callback для виконання запиту (Ctrl+Enter)
 * @param onSave - Callback для збереження запиту (Ctrl+S)
 */
export function handleEditorKeyDown(
  e: React.KeyboardEvent,
  onExecute: () => void,
  onSave?: () => void
): void {
  const isMod = e.ctrlKey || e.metaKey;

  // Ctrl/Cmd + Enter для виконання
  if (isMod && e.key === 'Enter') {
    e.preventDefault();
    onExecute();
    return;
  }

  // Ctrl/Cmd + S для збереження
  if (isMod && e.key === 's' && onSave) {
    e.preventDefault();
    onSave();
    return;
  }
}
