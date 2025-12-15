/**
 * PostgreSQL configuration mock data - central export
 */

// Types
export type { ConfigParam, ConfigProfile, QuickPreset } from './types';

// Parameters by category
export { memoryParams } from './memoryParams';
export { connectionParams } from './connectionParams';
export { walParams } from './walParams';
export { autovacuumParams } from './autovacuumParams';
export { loggingParams } from './loggingParams';
export { performanceParams } from './performanceParams';

// Profiles and presets
export { savedProfiles } from './profiles';
export { quickPresets } from './presets';

// Combined configuration parameters
import { memoryParams } from './memoryParams';
import { connectionParams } from './connectionParams';
import { walParams } from './walParams';
import { autovacuumParams } from './autovacuumParams';
import { loggingParams } from './loggingParams';
import { performanceParams } from './performanceParams';

export const configParams = [
  ...memoryParams,
  ...connectionParams,
  ...walParams,
  ...autovacuumParams,
  ...loggingParams,
  ...performanceParams,
];
