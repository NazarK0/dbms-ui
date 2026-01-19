import { Search } from 'lucide-react';
import { Card, CardContent } from '../../../../ui/card';
import { Input } from '../../../../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../ui/select';
import { logLevels, logSources } from '../data';

interface LogFiltersProps {
  searchTerm: string;
  selectedLevel: string;
  selectedSource: string;
  onSearchChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onSourceChange: (value: string) => void;
}

export default function LogFilters({
  searchTerm,
  selectedLevel,
  selectedSource,
  onSearchChange,
  onLevelChange,
  onSourceChange,
}: LogFiltersProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Пошук логів..."
              className="pl-10"
            />
          </div>
          <Select value={selectedLevel} onValueChange={onLevelChange}>
            <SelectTrigger>
              <SelectValue placeholder="Всі рівні" />
            </SelectTrigger>
            <SelectContent>
              {logLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedSource} onValueChange={onSourceChange}>
            <SelectTrigger>
              <SelectValue placeholder="Всі джерела" />
            </SelectTrigger>
            <SelectContent>
              {logSources.map((source) => (
                <SelectItem key={source.value} value={source.value}>
                  {source.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
