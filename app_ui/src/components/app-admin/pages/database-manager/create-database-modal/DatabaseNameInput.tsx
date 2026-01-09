import { Input } from '../../../../ui/input';
import { Label } from '../../../../ui/label';
import { AlertCircle } from 'lucide-react';

interface DatabaseNameInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function DatabaseNameInput({
  value,
  onChange,
  error
}: DatabaseNameInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="db-name">
        Назва бази даних <span className="text-red-500">*</span>
      </Label>
      <Input
        id="db-name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="my_database"
        className={error ? 'border-red-500 focus-visible:ring-red-500' : ''}
      />
      {error && (
        <div className="flex items-center gap-1.5 text-sm text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
      <p className="text-xs text-slate-500">
        Дозволені лише малі літери, цифри та підкреслення (a-z, 0-9, _)
      </p>
    </div>
  );
}
