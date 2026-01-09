/**
 * Statistical calculation functions for CLI history
 */

import type { CommandHistory, CommandStatus, TerminalStats } from '../types';

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
 * Calculate success rate
 */
export const calculateSuccessRate = (history: CommandHistory[]): number => {
  if (history.length === 0) return 0;
  const successful = history.filter((h) => h.status === 'success').length;
  return (successful / history.length) * 100;
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
 * Get unique commands
 */
export const getUniqueCommands = (history: CommandHistory[]): string[] => {
  return [...new Set(history.map((h) => h.command))];
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
