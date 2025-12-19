/**
 * Query Editor Component - TypeScript Interfaces
 * ===============================================
 * 
 * Типи для модульних підкомпонентів QueryEditor.
 */

/**
 * Props для головного компонента QueryEditor
 */
export interface QueryEditorProps {
  /** Поточний SQL запит */
  query: string;
  /** Callback при зміні запиту */
  onQueryChange: (query: string) => void;
  /** Callback при виконанні запиту */
  onExecute: () => void;
  /** Callback при збереженні запиту */
  onSave?: () => void;
  /** Чи виконується запит зараз */
  isExecuting: boolean;
  /** Вибрана база даних */
  selectedDatabase?: string;
}

/**
 * Props для компонента QueryEditorHeader
 */
export interface QueryEditorHeaderProps {
  /** Без додаткових props - просто header з іконкою та title */
}

/**
 * Props для компонента QueryEditorActions
 */
export interface QueryEditorActionsProps {
  /** Callback при збереженні запиту */
  onSave?: () => void;
  /** Callback при виконанні запиту */
  onExecute: () => void;
  /** Чи виконується запит зараз */
  isExecuting: boolean;
  /** Чи валідний запит */
  isValid: boolean;
  /** Повідомлення про помилку валідації */
  validationError?: string;
}

/**
 * Props для компонента DatabaseAlert
 */
export interface DatabaseAlertProps {
  /** Назва вибраної бази даних */
  databaseName: string;
}

/**
 * Props для компонента DangerousQueryAlert
 */
export interface DangerousQueryAlertProps {
  /** Показати alert */
  show: boolean;
}

/**
 * Props для компонента ValidationErrorAlert
 */
export interface ValidationErrorAlertProps {
  /** Текст помилки */
  error: string;
}

/**
 * Props для компонента QueryEditorTextarea
 */
export interface QueryEditorTextareaProps {
  /** Поточний SQL запит */
  query: string;
  /** Callback при зміні запиту */
  onQueryChange: (query: string) => void;
  /** Callback при натисканні Ctrl+Enter (виконати) */
  onExecute: () => void;
  /** Callback при натисканні Ctrl+S (зберегти) */
  onSave?: () => void;
}
