import { User } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../ui/select';
import { userFilterOptions } from './data';

interface UserFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function UserFilter({ value, onChange }: UserFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <User className="w-4 h-4 mr-2 text-slate-400" />
        <SelectValue placeholder="Користувач" />
      </SelectTrigger>
      <SelectContent>
        {userFilterOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
