/**
 * Validation functions for Replica Clusters
 */

/**
 * Validate replica configuration
 */
export const validateReplicaConfig = (data: {
  name: string;
  host: string;
  port: number;
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data.name || data.name.trim() === '') {
    errors.push('Назва репліки обов\'язкова');
  }
  
  if (!data.host || data.host.trim() === '') {
    errors.push('Host обов\'язковий');
  } else if (!/^[a-zA-Z0-9.-]+$/.test(data.host)) {
    errors.push('Неправильний формат host');
  }
  
  if (!data.port || data.port < 1 || data.port > 65535) {
    errors.push('Port має бути в діапазоні 1-65535');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};
