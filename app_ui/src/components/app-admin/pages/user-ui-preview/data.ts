import type {
  DeviceSize,
} from './types';


export const deviceSizes: Record<string, DeviceSize> = {
  desktop: { width: '100%', height: '600px' },
  tablet: { width: '768px', height: '600px' },
  mobile: { width: '375px', height: '667px' },
};

export const defaultDeviceType = 'desktop';
