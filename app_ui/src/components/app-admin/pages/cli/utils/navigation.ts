/**
 * Navigation functions for CLI history
 */

import type { CommandHistory } from '../types';

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
