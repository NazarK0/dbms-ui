/**
 * Create Foreign Server Modal - Server Name Input
 * 
 * Input field for specifying the foreign server name.
 * This name is used to reference the server in SQL queries.
 */

import { Input } from '../../../../ui/input';
import { Label } from '../../../../ui/label';

interface ServerNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ServerNameInput({ value, onChange }: ServerNameInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="server-name">Назва сервера</Label>
      <Input
        id="server-name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="external_db"
      />
    </div>
  );
}
