/**
 * Export functions for PostgreSQL Configuration
 */

import type { ConfigParam } from '../types';
import { generateConfigFile } from './generators';

/**
 * Export configuration as JSON
 */
export const exportConfigAsJSON = (params: ConfigParam[], profileName: string = 'config'): void => {
  const config = {
    name: profileName,
    generatedAt: new Date().toISOString(),
    parameters: params.reduce((acc, param) => {
      acc[param.name] = param.value;
      return acc;
    }, {} as Record<string, string>),
  };

  const blob = new Blob([JSON.stringify(config, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `postgresql-config-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Export configuration as .conf file
 */
export const exportConfigAsFile = (params: ConfigParam[]): void => {
  const content = generateConfigFile(params);
  
  const blob = new Blob([content], {
    type: 'text/plain',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `postgresql-${Date.now()}.conf`;
  link.click();
  URL.revokeObjectURL(url);
};
