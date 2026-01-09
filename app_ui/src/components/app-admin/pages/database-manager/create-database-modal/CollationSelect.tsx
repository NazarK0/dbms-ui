import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../ui/select';
import { Label } from '../../../../ui/label';
import { collations } from '../../../../../mockData/admin';
import { Languages } from 'lucide-react';

interface CollationSelectProps {
  value: string;
  onChange: (value: string) => void;
  encoding: string;
}

export default function CollationSelect({
  value,
  onChange,
  encoding
}: CollationSelectProps) {
  // Filter collations by encoding
  const availableCollations = collations.filter(c => c.encoding === encoding);
  const selectedCollation = availableCollations.find(c => c.name === value);

  return (
    <div className="space-y-2">
      <Label htmlFor="db-collation">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4" />
          <span>Правила сортування (Collation)</span>
        </div>
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="db-collation">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {availableCollations.map((collation) => (
            <SelectItem key={collation.name} value={collation.name}>
              <div className="flex items-center gap-2">
                {collation.language && (
                  <span className="text-xs px-1.5 py-0.5 bg-slate-100 rounded">
                    {collation.language.toUpperCase()}
                  </span>
                )}
                <span>{collation.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedCollation && (
        <p className="text-xs text-slate-500">
          {selectedCollation.description}
        </p>
      )}
    </div>
  );
}
