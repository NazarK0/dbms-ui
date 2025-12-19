/**
 * TypeScript type definitions for CLI components
 */

export type CommandStatus = 'success' | 'error';

export interface CommandHistory {
  id: string;
  command: string;
  output: string;
  timestamp: string;
  status: CommandStatus;
  executionTime: string;
}

export interface SavedCommand {
  id: string;
  cmd: string;
  desc: string;
  isCustom: boolean;
}

export interface SavedExample {
  id: string;
  title: string;
  query: string;
  isCustom: boolean;
}

export interface TerminalWindowProps {
  history: CommandHistory[];
  command: string;
  onCommandChange: (command: string) => void;
  onExecute: () => void;
  onClearHistory: () => void;
  onExportHistory: () => void;
  onCopyCommand: (command: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export interface CommandHistoryItemProps {
  entry: CommandHistory;
  onCopy: (command: string) => void;
}

export interface CommonCommandsProps {
  commands: SavedCommand[];
  onCommandClick: (cmd: string) => void;
  onAddCommand: (cmd: SavedCommand) => void;
  onDeleteCommand: (id: string) => void;
  onCopyCommand: (cmd: string) => void;
}

export interface SQLExamplesProps {
  examples: SavedExample[];
  onExampleClick: (query: string) => void;
  onAddExample: (example: SavedExample) => void;
  onDeleteExample: (id: string) => void;
  onCopyQuery: (query: string) => void;
}

export interface AddCommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (command: SavedCommand) => void;
}

export interface AddExampleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (example: SavedExample) => void;
}

export interface MockOutputOptions {
  command: string;
  includeRowCount?: boolean;
  maxRows?: number;
}

export interface ExportHistoryOptions {
  history: CommandHistory[];
  filename?: string;
  includeTimestamps?: boolean;
  includeStatus?: boolean;
}

export interface CommandSuggestion {
  command: string;
  description: string;
  category: 'psql' | 'sql' | 'admin';
}

export interface TerminalStats {
  totalCommands: number;
  successfulCommands: number;
  failedCommands: number;
  averageExecutionTime: number;
}

export interface CommandValidationResult {
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
}

export interface HistoryFilter {
  status?: CommandStatus;
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
}

export interface KeyboardShortcut {
  key: string;
  description: string;
  action: string;
}
