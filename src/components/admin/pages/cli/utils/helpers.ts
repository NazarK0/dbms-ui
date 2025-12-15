/**
 * Helper functions for CLI commands
 */

import type { CommandHistory } from '../types';

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
 * Clear history
 */
export const clearHistory = (): CommandHistory[] => {
  return [];
};
