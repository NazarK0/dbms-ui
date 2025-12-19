/**
 * Query History Header Component
 * ===============================
 * 
 * Заголовок історії запитів з пошуком та сортуванням.
 */

import { Clock, Search } from 'lucide-react';
import { CardDescription, CardHeader, CardTitle } from '../../../../ui/card';
import { Badge } from '../../../../ui/badge';
import { Input } from '../../../../ui/input';
import { QueryHistoryHeaderProps } from './types';

export function QueryHistoryHeader({
  totalCount,
  sortBy,
  onSortChange,
  searchTerm,
  onSearchChange,
}: QueryHistoryHeaderProps) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-slate-700" />
          <CardTitle>Історія запитів</CardTitle>
          <Badge variant="secondary">{totalCount}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'time' | 'duration' | 'status')}
            className="text-sm border border-slate-200 rounded-md px-3 py-1.5 bg-white"
          >
            <option value="time">За часом</option>
            <option value="duration">За тривалістю</option>
            <option value="status">За статусом</option>
          </select>
        </div>
      </div>
      <CardDescription>
        Клацніть на запит, щоб відкрити його в редакторі
      </CardDescription>

      {/* Пошук */}
      <div className="relative mt-2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Пошук в історії запитів..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
    </CardHeader>
  );
}
