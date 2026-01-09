import { LayoutDashboard } from 'lucide-react';
import { Button } from '../../../ui/button';
import type { DashboardHeaderProps } from './types';

export default function DashboardHeader({
  visibleCount,
  totalCount,
  onCustomizeClick,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-slate-900 text-2xl">Панель керування</h2>
        <p className="text-slate-600 text-sm mt-1">
          Показано {visibleCount} з {totalCount} віджетів
        </p>
      </div>
      <Button onClick={onCustomizeClick}>
        <LayoutDashboard className="w-4 h-4 mr-2" />
        Налаштувати панель
      </Button>
    </div>
  );
}
