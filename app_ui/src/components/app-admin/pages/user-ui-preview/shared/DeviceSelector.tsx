import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { Button } from '../../../../ui/button';
import type { DeviceType } from './types';

export interface DeviceSelectorProps {
  deviceType: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
}

export default function DeviceSelector({
  deviceType,
  onDeviceChange,
}: DeviceSelectorProps) {
  const devices: Array<{ type: DeviceType; icon: typeof Monitor }> = [
    { type: 'desktop', icon: Monitor },
    { type: 'tablet', icon: Tablet },
    { type: 'mobile', icon: Smartphone },
  ];

  return (
    <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
      {devices.map(({ type, icon: Icon }) => (
        <Button
          key={type}
          variant={deviceType === type ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onDeviceChange(type)}
        >
          <Icon className="w-4 h-4" />
        </Button>
      ))}
    </div>
  );
}
