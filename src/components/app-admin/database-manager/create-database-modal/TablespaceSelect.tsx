import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Label } from '../../../ui/label';
import { tablespaces } from '../../../../mockData/admin';
import { HardDrive } from 'lucide-react';

interface TablespaceSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TablespaceSelect({ 
  value, 
  onChange 
}: TablespaceSelectProps) {
  const selectedTablespace = tablespaces.find(t => t.name === value);

  return (
    <div className="space-y-2">
      <Label htmlFor="db-tablespace">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4" />
          <span>Табличний простір</span>
        </div>
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="db-tablespace">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {tablespaces.map((tablespace) => (
            <SelectItem key={tablespace.name} value={tablespace.name}>
              <div className="flex flex-col items-start">
                <span>{tablespace.name}</span>
                <span className="text-xs text-slate-500">{tablespace.location}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedTablespace?.description && (
        <p className="text-xs text-slate-500">
          {selectedTablespace.description}
        </p>
      )}
    </div>
  );
}
