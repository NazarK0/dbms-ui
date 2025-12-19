/**
 * Create Schema Modal - Schema Name Input
 * 
 * Input field for specifying the schema name.
 * Schema names must follow PostgreSQL identifier rules.
 */

import { Input } from '../../../../../../ui/input';
import { Label } from '../../../../../../ui/label';

interface SchemaNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SchemaNameInput({ value, onChange }: SchemaNameInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="schema-name">Назва схеми</Label>
      <Input
        id="schema-name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="my_schema"
      />
    </div>
  );
}
