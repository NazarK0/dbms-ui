import { Button } from '../../../../../ui/button';

interface FilterResultsProps {
  totalEntries: number;
  filteredCount: number;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export default function FilterResults({
  totalEntries,
  filteredCount,
  hasActiveFilters,
  onReset,
}: FilterResultsProps) {
  return (
    <div className="flex items-center justify-between text-sm text-slate-600">
      <span>
        Знайдено записів: <strong>{filteredCount}</strong> з {totalEntries}
      </span>
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          Скинути фільтри
        </Button>
      )}
    </div>
  );
}
