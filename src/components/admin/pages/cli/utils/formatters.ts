/**
 * Formatting functions for CLI output
 */

/**
 * Format command output for display
 */
export const formatOutput = (output: string): string => {
  return output.trim();
};

/**
 * Format timestamp
 */
export const formatTimestamp = (timestamp: string): string => {
  return timestamp;
};

/**
 * Format execution time
 */
export const formatExecutionTime = (executionTime: string): string => {
  return executionTime;
};

/**
 * Highlight SQL syntax
 */
export const highlightSQL = (sql: string): string => {
  // Simple syntax highlighting (in real app would use a proper library)
  return sql;
};
