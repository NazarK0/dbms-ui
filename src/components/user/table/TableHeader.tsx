import { ChevronLeft, Plus } from 'lucide-react';
import { Button } from '../../ui/button';

interface TableHeaderProps {
  database: string;
  table: string;
  canInsert: boolean;
  onBack: () => void;
  onCreateRecord: () => void;
}

export default function TableHeader({ database, table, canInsert, onBack, onCreateRecord }: TableHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Назад
        </Button>
        <div>
          <h2 className="text-slate-900">Редактор даних: {table}</h2>
          <p className="text-slate-600">База даних: {database}</p>
        </div>
      </div>
      {canInsert && (
        <Button
          onClick={onCreateRecord}
          className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Новий запис
        </Button>
      )}
    </div>
  );
}
