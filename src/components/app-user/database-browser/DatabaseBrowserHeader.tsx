import { ChevronLeft } from 'lucide-react';
import { Button } from '../../ui/button';
import type { DatabaseBrowserHeaderProps } from './types';

export default function DatabaseBrowserHeader({
  propSelectedDatabase,
  onBack,
}: DatabaseBrowserHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {propSelectedDatabase && onBack && (
          <Button variant="outline" size="sm" onClick={onBack}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Назад
          </Button>
        )}
        <div>
          <h2 className="text-slate-900">
            {propSelectedDatabase
              ? `Таблиці: ${propSelectedDatabase}`
              : 'Браузер баз даних'}
          </h2>
          <p className="text-slate-600">
            {propSelectedDatabase
              ? 'Оберіть таблицю для роботи з даними'
              : 'Перегляд доступних баз даних та таблиць'}
          </p>
        </div>
      </div>
    </div>
  );
}
