/**
 * Create Foreign Server Modal - Database Name Input
 * 
 * Input field for specifying the remote database name on the foreign server.
 */

import { Input } from '../../../../ui/input';
import { Label } from '../../../../ui/label';

interface DatabaseNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DatabaseNameInput({ value, onChange }: DatabaseNameInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="dbname">База даних</Label>
      <Input
        id="dbname"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="remote_database"
      />
    </div>
  );
}
