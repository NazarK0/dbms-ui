/**
 * Comparison functions for PostgreSQL Configuration
 */

/**
 * Compare two configurations
 */
export const compareConfigs = (
  config1: Record<string, string>,
  config2: Record<string, string>
): {
  same: string[];
  different: string[];
  onlyInFirst: string[];
  onlyInSecond: string[];
} => {
  const allKeys = new Set([...Object.keys(config1), ...Object.keys(config2)]);
  const result = {
    same: [] as string[],
    different: [] as string[],
    onlyInFirst: [] as string[],
    onlyInSecond: [] as string[],
  };

  allKeys.forEach(key => {
    if (config1[key] && config2[key]) {
      if (config1[key] === config2[key]) {
        result.same.push(key);
      } else {
        result.different.push(key);
      }
    } else if (config1[key]) {
      result.onlyInFirst.push(key);
    } else {
      result.onlyInSecond.push(key);
    }
  });

  return result;
};
