import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../../../ui/button';
import TablespaceSelect from './TablespaceSelect';
import ConnectionLimitInput from './ConnectionLimitInput';

interface AdvancedSettingsProps {
  tablespace: string;
  onTablespaceChange: (value: string) => void;
  connectionLimit: number;
  onConnectionLimitChange: (value: number) => void;
}

export default function AdvancedSettings({
  tablespace,
  onTablespaceChange,
  connectionLimit,
  onConnectionLimitChange,
}: AdvancedSettingsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="ghost"
        className="w-full justify-between p-3 h-auto hover:bg-slate-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col items-start gap-1">
          <span className="font-medium">Розширені налаштування</span>
          <span className="text-xs text-slate-500">
            Табличний простір, обмеження підключень
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </Button>

      {isExpanded && (
        <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <TablespaceSelect
            value={tablespace}
            onChange={onTablespaceChange}
          />
          <ConnectionLimitInput
            value={connectionLimit}
            onChange={onConnectionLimitChange}
          />
        </div>
      )}
    </div>
  );
}
