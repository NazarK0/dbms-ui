import { Search, User, Filter, Database } from 'lucide-react';
import { Input } from '../../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Button } from '../../../ui/button';
import type { AuditFiltersProps } from './types';

export default function AuditFilters({
  filters,
  onFiltersChange,
  totalEntries,
  filteredCount,
}: AuditFiltersProps) {
  const hasActiveFilters =
    filters.searchQuery ||
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
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Пошук по діям..."
            className="pl-10"
            value={filters.searchQuery}
            onChange={(e) => onFiltersChange({ searchQuery: e.target.value })}
          />
        </div>

        {/* User Filter */}
        <Select
          value={filters.filterUser}
          onValueChange={(value) => onFiltersChange({ filterUser: value })}
        >
          <SelectTrigger>
            <User className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Користувач" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всі користувачі</SelectItem>
            <SelectItem value="admin">admin</SelectItem>
            <SelectItem value="developer">developer</SelectItem>
            <SelectItem value="analyst">analyst</SelectItem>
            <SelectItem value="app_user">app_user</SelectItem>
            <SelectItem value="backup_service">backup_service</SelectItem>
          </SelectContent>
        </Select>

        {/* Action Filter */}
        <Select
          value={filters.filterAction}
          onValueChange={(value) => onFiltersChange({ filterAction: value })}
        >
          <SelectTrigger>
            <Filter className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Тип дії" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всі дії</SelectItem>
            <SelectItem value="create">Створення</SelectItem>
            <SelectItem value="update">Оновлення</SelectItem>
            <SelectItem value="delete">Видалення</SelectItem>
            <SelectItem value="select">Вибірка</SelectItem>
            <SelectItem value="grant">Надання прав</SelectItem>
            <SelectItem value="revoke">Відкликання</SelectItem>
            <SelectItem value="login">Вхід</SelectItem>
            <SelectItem value="backup">Резервування</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select
          value={filters.filterCategory}
          onValueChange={(value) => onFiltersChange({ filterCategory: value })}
        >
          <SelectTrigger>
            <Database className="w-4 h-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Категорія" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всі категорії</SelectItem>
            <SelectItem value="База даних">База даних</SelectItem>
            <SelectItem value="Таблиця">Таблиця</SelectItem>
            <SelectItem value="Запит">Запит</SelectItem>
            <SelectItem value="Права доступу">Права доступу</SelectItem>
            <SelectItem value="Резервна копія">Резервна копія</SelectItem>
            <SelectItem value="Функція">Функція</SelectItem>
            <SelectItem value="Тригер">Тригер</SelectItem>
            <SelectItem value="Користувач">Користувач</SelectItem>
            <SelectItem value="Автентифікація">Автентифікація</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>
          Знайдено записів: <strong>{filteredCount}</strong> з {totalEntries}
        </span>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleResetFilters}>
            Скинути фільтри
          </Button>
        )}
      </div>
    </div>
  );
}
