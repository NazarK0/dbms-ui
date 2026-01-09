import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../ui/select';
import { Label } from '../../../../ui/label';
import { databaseEncodings } from '../../../../../mockData/admin';
import { CheckCircle2 } from 'lucide-react';

interface DatabaseEncodingSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DatabaseEncodingSelect({
  value,
  onChange
}: DatabaseEncodingSelectProps) {
  const selectedEncoding = databaseEncodings.find(enc => enc.value === value);

  return (
    <div className="space-y-2">
      <Label htmlFor="db-encoding">Кодування</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="db-encoding">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {databaseEncodings.map((encoding) => (
            <SelectItem key={encoding.value} value={encoding.value}>
              <div className="flex items-center gap-2">
                <span>{encoding.label}</span>
                {encoding.recommended && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedEncoding && (
        <p className="text-xs text-slate-500">
          {selectedEncoding.description}
        </p>
      )}
    </div>
  );
}
