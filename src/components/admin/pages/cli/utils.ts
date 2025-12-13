/**
 * Utility functions for CLI components
 */

import type { CommandHistory, CommandStatus, TerminalStats, CommandValidationResult } from './types';

/**
 * Generate mock output for a command
 */
export const generateMockOutput = (cmd: string): string => {
  const lower = cmd.toLowerCase();

  if (lower.startsWith('\\l')) {
    return `                                  List of databases
   Name    |  Owner   | Encoding |   Collate   |    Ctype    |   Access privileges   
-----------+----------+----------+-------------+-------------+-----------------------
 postgres  | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 production| postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 staging   | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
(3 rows)`;
  }

  if (lower.startsWith('\\dt')) {
    return `                List of relations
 Schema |     Name      | Type  |  Owner   
--------+---------------+-------+----------
 public | users         | table | postgres
 public | orders        | table | postgres
 public | products      | table | postgres
 public | categories    | table | postgres
(4 rows)`;
  }

  if (lower.startsWith('\\du')) {
    return `                                   List of roles
 Role name |                         Attributes                         | Member of 
-----------+------------------------------------------------------------+-----------
 admin     | Superuser, Create role, Create DB                          | {}
 developer | Create DB                                                  | {}
 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
 readonly  |                                                            | {}`;
  }

  if (lower.includes('select version()')) {
    return `                                                 version                                                  
----------------------------------------------------------------------------------------------------------
 PostgreSQL 16.1 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 13.2.0, 64-bit
(1 row)`;
  }

  if (lower.includes('select current_database()')) {
    return ` current_database 
------------------
 production
(1 row)`;
  }

  if (lower.startsWith('select')) {
    return `Query executed successfully.
(${Math.floor(Math.random() * 100) + 1} rows affected)`;
  }

  if (lower.startsWith('insert') || lower.startsWith('update') || lower.startsWith('delete')) {
    const rows = Math.floor(Math.random() * 10) + 1;
    return `${lower.split(' ')[0].toUpperCase()} ${rows}`;
  }

  if (lower.startsWith('create')) {
    return 'CREATE TABLE';
  }

  if (lower.startsWith('\\x')) {
    return 'Expanded display is on.';
  }

  return `Command executed: ${cmd}
OK`;
};

/**
 * Execute a command and create history entry
 */
export const executeCommand = (
  command: string,
  includeError: boolean = false
): CommandHistory => {
  const trimmedCommand = command.trim();
  const timestamp = new Date().toLocaleTimeString('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const executionTime = Math.floor(Math.random() * 50) + 1 + 'ms';
  const status: CommandStatus = includeError || trimmedCommand.toLowerCase().includes('error')
    ? 'error'
    : 'success';

  return {
    id: Date.now().toString(),
    command: trimmedCommand,
    output: generateMockOutput(trimmedCommand),
    timestamp,
    status,
    executionTime,
  };
};

/**
 * Export command history to text file
 */
export const exportHistory = (history: CommandHistory[]): void => {
  const content = history
    .map((h) => `[${h.timestamp}] ${h.command}\n${h.output}\n`)
    .join('\n');
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `postgresql-cli-history-${new Date().toISOString().split('T')[0]}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = (text: string): Promise<void> => {
  return navigator.clipboard.writeText(text);
};

/**
 * Calculate terminal statistics
 */
export const calculateStats = (history: CommandHistory[]): TerminalStats => {
  const totalCommands = history.length;
  const successfulCommands = history.filter((h) => h.status === 'success').length;
  const failedCommands = history.filter((h) => h.status === 'error').length;

  const executionTimes = history.map((h) => parseInt(h.executionTime));
  const averageExecutionTime =
    executionTimes.length > 0
      ? executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length
      : 0;

  return {
    totalCommands,
    successfulCommands,
    failedCommands,
    averageExecutionTime,
  };
};

/**
 * Filter history entries
 */
export const filterHistory = (
  history: CommandHistory[],
  status?: CommandStatus,
  searchTerm?: string
): CommandHistory[] => {
  let filtered = [...history];

  if (status) {
    filtered = filtered.filter((h) => h.status === status);
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (h) =>
        h.command.toLowerCase().includes(term) ||
        h.output.toLowerCase().includes(term)
    );
  }

  return filtered;
};

/**
 * Get command from history by index
 */
export const getHistoryCommand = (
  history: CommandHistory[],
  currentIndex: number,
  direction: 'up' | 'down'
): { command: string; newIndex: number } => {
  if (history.length === 0) {
    return { command: '', newIndex: -1 };
  }

  if (direction === 'up') {
    const newIndex = currentIndex + 1;
    if (newIndex < history.length) {
      return {
        command: history[history.length - 1 - newIndex].command,
        newIndex,
      };
    }
    return { command: history[history.length - 1 - currentIndex].command, newIndex: currentIndex };
  } else {
    // down
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      return {
        command: history[history.length - 1 - newIndex].command,
        newIndex,
      };
    } else if (currentIndex === 0) {
      return { command: '', newIndex: -1 };
    }
    return { command: '', newIndex: currentIndex };
  }
};

/**
 * Validate SQL command
 */
export const validateCommand = (command: string): CommandValidationResult => {
  const trimmed = command.trim();

  if (!trimmed) {
    return {
      isValid: false,
      errors: ['Команда не може бути порожньою'],
    };
  }

  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for potentially dangerous commands
  const dangerous = ['drop database', 'drop table', 'truncate', 'delete from'];
  const lower = trimmed.toLowerCase();

  for (const cmd of dangerous) {
    if (lower.includes(cmd)) {
      warnings.push(`Небезпечна команда: ${cmd.toUpperCase()}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
};

/**
 * Format command output for display
 */
export const formatOutput = (output: string): string => {
  return output.trim();
};

/**
 * Parse command type
 */
export const getCommandType = (command: string): string => {
  const lower = command.toLowerCase().trim();

  if (lower.startsWith('\\')) {
    return 'psql';
  }

  if (lower.startsWith('select')) return 'query';
  if (lower.startsWith('insert')) return 'insert';
  if (lower.startsWith('update')) return 'update';
  if (lower.startsWith('delete')) return 'delete';
  if (lower.startsWith('create')) return 'ddl';
  if (lower.startsWith('drop')) return 'ddl';
  if (lower.startsWith('alter')) return 'ddl';
  if (lower.startsWith('grant')) return 'permission';
  if (lower.startsWith('revoke')) return 'permission';

  return 'unknown';
};

/**
 * Get command category
 */
export const getCommandCategory = (command: string): string => {
  const type = getCommandType(command);

  switch (type) {
    case 'psql':
      return 'Meta Commands';
    case 'query':
      return 'Data Query';
    case 'insert':
    case 'update':
    case 'delete':
      return 'Data Manipulation';
    case 'ddl':
      return 'Schema Definition';
    case 'permission':
      return 'Access Control';
    default:
      return 'General';
  }
};

/**
 * Highlight SQL syntax
 */
export const highlightSQL = (sql: string): string => {
  // Simple syntax highlighting (in real app would use a proper library)
  return sql;
};

/**
 * Format timestamp
 */
export const formatTimestamp = (timestamp: string): string => {
  return timestamp;
};

/**
 * Get status color class
 */
export const getStatusColorClass = (status: CommandStatus): string => {
  return status === 'success' ? 'text-green-300' : 'text-red-400';
};

/**
 * Get status badge variant
 */
export const getStatusBadgeVariant = (
  status: CommandStatus
): 'default' | 'destructive' => {
  return status === 'success' ? 'default' : 'destructive';
};

/**
 * Get status label
 */
export const getStatusLabel = (status: CommandStatus): string => {
  return status === 'success' ? 'OK' : 'ERROR';
};

/**
 * Sort history by timestamp
 */
export const sortHistoryByTimestamp = (
  history: CommandHistory[],
  ascending: boolean = true
): CommandHistory[] => {
  return [...history].sort((a, b) => {
    const comparison = a.timestamp.localeCompare(b.timestamp);
    return ascending ? comparison : -comparison;
  });
};

/**
 * Group history by status
 */
export const groupHistoryByStatus = (
  history: CommandHistory[]
): Record<CommandStatus, CommandHistory[]> => {
  return {
    success: history.filter((h) => h.status === 'success'),
    error: history.filter((h) => h.status === 'error'),
  };
};

/**
 * Get recent history
 */
export const getRecentHistory = (
  history: CommandHistory[],
  count: number = 10
): CommandHistory[] => {
  return history.slice(-count);
};

/**
 * Search history
 */
export const searchHistory = (
  history: CommandHistory[],
  searchTerm: string
): CommandHistory[] => {
  const term = searchTerm.toLowerCase();
  return history.filter(
    (h) =>
      h.command.toLowerCase().includes(term) ||
      h.output.toLowerCase().includes(term)
  );
};

/**
 * Get unique commands
 */
export const getUniqueCommands = (history: CommandHistory[]): string[] => {
  return [...new Set(history.map((h) => h.command))];
};

/**
 * Get command frequency
 */
export const getCommandFrequency = (
  history: CommandHistory[]
): Record<string, number> => {
  return history.reduce((acc, h) => {
    acc[h.command] = (acc[h.command] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Get most used commands
 */
export const getMostUsedCommands = (
  history: CommandHistory[],
  limit: number = 5
): { command: string; count: number }[] => {
  const frequency = getCommandFrequency(history);
  return Object.entries(frequency)
    .map(([command, count]) => ({ command, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

/**
 * Calculate success rate
 */
export const calculateSuccessRate = (history: CommandHistory[]): number => {
  if (history.length === 0) return 0;
  const successful = history.filter((h) => h.status === 'success').length;
  return (successful / history.length) * 100;
};

/**
 * Format execution time
 */
export const formatExecutionTime = (executionTime: string): string => {
  return executionTime;
};

/**
 * Is psql command
 */
export const isPsqlCommand = (command: string): boolean => {
  return command.trim().startsWith('\\');
};

/**
 * Is SQL command
 */
export const isSQLCommand = (command: string): boolean => {
  const sqlKeywords = ['select', 'insert', 'update', 'delete', 'create', 'drop', 'alter'];
  const lower = command.trim().toLowerCase();
  return sqlKeywords.some((keyword) => lower.startsWith(keyword));
};

/**
 * Get command help text
 */
export const getCommandHelp = (command: string): string | null => {
  const helps: Record<string, string> = {
    '\\l': 'Lists all databases in the PostgreSQL server',
    '\\dt': 'Lists all tables in the current database',
    '\\du': 'Lists all users/roles',
    '\\d': 'Describes a table structure',
    '\\c': 'Connects to a different database',
    '\\q': 'Quits the psql session',
    '\\x': 'Toggles expanded table formatting',
    '\\?': 'Shows help for psql commands',
  };

  const trimmed = command.trim().split(' ')[0];
  return helps[trimmed] || null;
};

/**
 * Auto-complete command
 */
export const autoCompleteCommand = (
  partialCommand: string,
  availableCommands: string[]
): string[] => {
  const lower = partialCommand.toLowerCase();
  return availableCommands.filter((cmd) => cmd.toLowerCase().startsWith(lower));
};

/**
 * Export history to CSV
 */
export const exportHistoryToCSV = (history: CommandHistory[]): void => {
  const headers = ['Timestamp', 'Command', 'Status', 'Execution Time'];
  const rows = history.map((h) => [
    h.timestamp,
    h.command,
    h.status,
    h.executionTime,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `postgresql-cli-history-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

/**
 * Export history to JSON
 */
export const exportHistoryToJSON = (history: CommandHistory[]): void => {
  const jsonContent = JSON.stringify(history, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `postgresql-cli-history-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

/**
 * Clear history
 */
export const clearHistory = (): CommandHistory[] => {
  return [];
};

/**
 * Save command to localStorage
 */
export const saveCommandToStorage = (command: string): void => {
  const saved = localStorage.getItem('cli_saved_commands');
  const commands = saved ? JSON.parse(saved) : [];
  commands.push(command);
  localStorage.setItem('cli_saved_commands', JSON.stringify(commands));
};

/**
 * Load commands from localStorage
 */
export const loadCommandsFromStorage = (): string[] => {
  const saved = localStorage.getItem('cli_saved_commands');
  return saved ? JSON.parse(saved) : [];
};

/**
 * Clear saved commands from localStorage
 */
export const clearStorageCommands = (): void => {
  localStorage.removeItem('cli_saved_commands');
};
