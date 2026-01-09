/**
 * Create Schema Modal - Schema Description Textarea
 * 
 * Multi-line text input for schema description (optional).
 * This will be stored as a COMMENT on the schema.
 */

import { Textarea } from '../../../../../../ui/textarea';
import { Label } from '../../../../../../ui/label';

interface SchemaDescriptionTextareaProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SchemaDescriptionTextarea({
  value,
  onChange
}: SchemaDescriptionTextareaProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="schema-description">Опис (необов'язково)</Label>
      <Textarea
        id="schema-description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Опис призначення схеми..."
        rows={3}
      />
    </div>
  );
}
