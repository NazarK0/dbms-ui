/**
 * Create Foreign Server Modal - Connection Settings
 * 
 * Input fields for host and port configuration.
 * Displays in a 2:1 grid layout (host takes 2 columns, port takes 1).
 */

import { Input } from '../../../../../../ui/input';
import { Label } from '../../../../../../ui/label';

interface ConnectionSettingsProps {
  host: string;
  port: string;
  onHostChange: (value: string) => void;
  onPortChange: (value: string) => void;
}

export default function ConnectionSettings({
  host,
  port,
  onHostChange,
  onPortChange
}: ConnectionSettingsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 space-y-2">
        <Label htmlFor="host">Хост</Label>
        <Input
          id="host"
          value={host}
          onChange={(e) => onHostChange(e.target.value)}
          placeholder="external.example.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="port">Порт</Label>
        <Input
          id="port"
          value={port}
          onChange={(e) => onPortChange(e.target.value)}
          placeholder="5432"
        />
      </div>
    </div>
  );
}
