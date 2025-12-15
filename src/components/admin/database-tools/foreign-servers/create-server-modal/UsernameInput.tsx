/**
 * Create Foreign Server Modal - Username Input
 * 
 * Optional input field for specifying the default username for the foreign server.
 * Note: This is just a default; actual authentication is configured via USER MAPPING.
 */

import { Input } from '../../../../ui/input';
import { Label } from '../../../../ui/label';

interface UsernameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function UsernameInput({ value, onChange }: UsernameInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="username">Користувач (опціонально)</Label>
      <Input
        id="username"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="remote_user"
      />
    </div>
  );
}
