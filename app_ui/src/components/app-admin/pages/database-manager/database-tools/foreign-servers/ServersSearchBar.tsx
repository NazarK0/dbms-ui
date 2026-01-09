import { Search } from 'lucide-react';
import { Input } from '../../../../../ui/input';

interface ServersSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ServersSearchBar({
  value,
  onChange,
  placeholder = 'Пошук серверів...'
}: ServersSearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
