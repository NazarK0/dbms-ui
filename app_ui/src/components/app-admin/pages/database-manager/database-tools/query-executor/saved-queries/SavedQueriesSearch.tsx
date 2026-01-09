/**
 * SavedQueriesSearch Component
 * =============================
 * 
 * Поле пошуку для фільтрації збережених запитів.
 */

import { Search } from 'lucide-react';
import { Input } from '../../../../../../ui/input';
import { SavedQueriesSearchProps } from './types';

export function SavedQueriesSearch({ value, onChange }: SavedQueriesSearchProps) {
  return (
    <div className="relative mt-2">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
      <Input
        type="text"
        placeholder="Пошук збережених запитів..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}
