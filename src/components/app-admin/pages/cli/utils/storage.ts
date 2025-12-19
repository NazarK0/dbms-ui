/**
 * LocalStorage functions for CLI commands
 */

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
