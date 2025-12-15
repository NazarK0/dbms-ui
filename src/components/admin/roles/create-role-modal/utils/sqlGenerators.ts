import type { RlsPolicies, RlsPolicy } from '../types';

/**
 * Generate RLS SQL policy
 */
export const generateRlsSqlPolicy = (
  tableName: string,
  policy: RlsPolicy
): string => {
  if (!policy.enabled) return '';

  const operations = [];
  if (policy.select) operations.push('SELECT');
  if (policy.insert) operations.push('INSERT');
  if (policy.update) operations.push('UPDATE');
  if (policy.delete) operations.push('DELETE');

  let sql = `-- Enable RLS on ${tableName}\n`;
  sql += `ALTER TABLE ${tableName} ENABLE ROW LEVEL SECURITY;\n\n`;

  sql += `-- Create policy for ${tableName}\n`;
  sql += `CREATE POLICY ${tableName}_policy ON ${tableName}\n`;
  sql += `  FOR ${operations.join(', ')}\n`;
  sql += `  USING (${policy.using})`;

  if (policy.insert || policy.update) {
    sql += `\n  WITH CHECK (${policy.withCheck})`;
  }

  sql += ';';

  return sql;
};

/**
 * Generate all RLS SQL
 */
export const generateAllRlsSql = (policies: RlsPolicies): string => {
  const enabledPolicies = Object.entries(policies).filter(
    ([_, policy]) => policy.enabled
  );

  if (enabledPolicies.length === 0) {
    return '-- No RLS policies enabled';
  }

  return enabledPolicies
    .map(([tableName, policy]) => generateRlsSqlPolicy(tableName, policy))
    .join('\n\n');
};
