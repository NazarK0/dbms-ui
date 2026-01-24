import { Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../ui/select';
import { actionFilterOptions } from './data';

interface ActionFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ActionFilter({ value, onChange }: ActionFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <Filter className="w-4 h-4 mr-2 text-slate-400" />
        <SelectValue placeholder="Тип дії" />
      </SelectTrigger>
      <SelectContent>
        {actionFilterOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
