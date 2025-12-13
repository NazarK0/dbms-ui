import { RefreshCw, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../../ui/button';

interface TableActionsProps {
  tableName: string;
  onRefresh: (tableName: string) => void;
  onEdit?: (tableName: string) => void;
  onDelete: (tableName: string) => void;
}

export default function TableActions({ 
  tableName, 
  onRefresh,
  onEdit,
  onDelete 
}: TableActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button 
        variant="ghost" 
        size="icon" 
        title="Оновити дані"
        onClick={() => onRefresh(tableName)}
      >
        <RefreshCw className="w-4 h-4" />
      </Button>
      {onEdit && (
        <Button 
          variant="ghost" 
          size="icon" 
          title="Редагувати"
          onClick={() => onEdit(tableName)}
        >
          <Edit className="w-4 h-4" />
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(tableName)}
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
        title="Видалити таблицю"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
