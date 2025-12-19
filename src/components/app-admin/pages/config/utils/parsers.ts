/**
 * Parsing functions for PostgreSQL Configuration files
 */

/**
 * Parse .conf file content
 */
export const parseConfigFile = (content: string): Record<string, string> => {
  const config: Record<string, string> = {};
  const lines = content.split('\n');

  lines.forEach(line => {
    // Skip comments and empty lines
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    // Parse parameter = value
    const match = trimmed.match(/^([a-z_]+)\s*=\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      config[key] = value.trim();
    }
  });

  return config;
};
