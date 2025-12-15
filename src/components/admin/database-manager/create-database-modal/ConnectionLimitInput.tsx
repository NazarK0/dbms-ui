import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { connectionLimitPresets } from '../../../../mockData/admin';
import { Users, Info } from 'lucide-react';
import { useState } from 'react';

interface ConnectionLimitInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function ConnectionLimitInput({ 
  value, 
  onChange 
}: ConnectionLimitInputProps) {
  const [mode, setMode] = useState<'preset' | 'custom'>(
    connectionLimitPresets.some(p => p.value === value) ? 'preset' : 'custom'
  );

  const selectedPreset = connectionLimitPresets.find(p => p.value === value);

  return (
    <div className="space-y-3">
      <Label htmlFor="db-connection-limit">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>Обмеження підключень</span>
        </div>
      </Label>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('preset')}
          className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
            mode === 'preset'
              ? 'bg-lime-50 border-lime-300 text-lime-700'
              : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Пресет
        </button>
        <button
          type="button"
          onClick={() => setMode('custom')}
          className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
            mode === 'custom'
              ? 'bg-lime-50 border-lime-300 text-lime-700'
              : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Власне значення
        </button>
      </div>

      {mode === 'preset' ? (
        <Select 
          value={value.toString()} 
          onValueChange={(v) => onChange(parseInt(v))}
        >
          <SelectTrigger id="db-connection-limit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {connectionLimitPresets.map((preset) => (
              <SelectItem key={preset.value} value={preset.value.toString()}>
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2">
                    <span>{preset.label}</span>
                    {preset.recommended && (
                      <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded">
                        {preset.recommended}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500">{preset.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          type="number"
          value={value === -1 ? '' : value}
          onChange={(e) => {
            const val = e.target.value === '' ? -1 : parseInt(e.target.value);
            onChange(val);
          }}
          placeholder="Введіть число або -1 для необмеженого"
          min={-1}
        />
      )}

      {selectedPreset && mode === 'preset' && (
        <div className="flex items-start gap-1.5 text-xs text-slate-500 bg-blue-50 border border-blue-200 rounded-md p-2">
          <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-blue-600" />
          <span>{selectedPreset.description}</span>
        </div>
      )}

      <p className="text-xs text-slate-500">
        -1 означає необмежену кількість підключень
      </p>
    </div>
  );
}
