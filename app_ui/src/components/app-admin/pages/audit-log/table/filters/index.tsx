

import ActionFilter from './ActionFilter';
import CategoryFilter from './CategoryFilter';
import FilterResults from './FilterResults';
import SearchInput from './SearchInput';
import UserFilter from './UserFilter';
import type { AuditFiltersProps } from './types';

// export default function TableFilters({
//   searchTerm,
//   selectedLevel,
//   selectedSource,
//   onSearchChange,
//   onLevelChange,
//   onSourceChange,
// }: TableFiltersProps) {
//   return (
//     <Card className="border-slate-200 shadow-sm">
//       <CardContent className="p-4">
        
//       </CardContent>
//     </Card>
//   );
// }

export default function TableFilters({
  filters,
  onFiltersChange,
  totalEntries,
  filteredCount,
}: AuditFiltersProps) {
  const hasActiveFilters: boolean =
    filters.searchQuery.length > 0 ||
    filters.filterUser !== 'all' ||
    filters.filterAction !== 'all' ||
    filters.filterCategory !== 'all';

  const handleResetFilters = () => {
    onFiltersChange({
      searchQuery: '',
      filterUser: 'all',
      filterAction: 'all',
      filterCategory: 'all',
    });
  };

  return (
    <div className="space-y-4">
      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <SearchInput
          value={filters.searchQuery}
          onChange={(value) => onFiltersChange({ searchQuery: value })}
        />

        <UserFilter
          value={filters.filterUser}
          onChange={(value) => onFiltersChange({ filterUser: value })}
        />

        <ActionFilter
          value={filters.filterAction}
          onChange={(value) => onFiltersChange({ filterAction: value })}
        />

        <CategoryFilter
          value={filters.filterCategory}
          onChange={(value) => onFiltersChange({ filterCategory: value })}
        />
      </div>

      {/* Results Count */}
      <FilterResults
        totalEntries={totalEntries}
        filteredCount={filteredCount}
        hasActiveFilters={hasActiveFilters}
        onReset={handleResetFilters}
      />
    </div>
  );
}


