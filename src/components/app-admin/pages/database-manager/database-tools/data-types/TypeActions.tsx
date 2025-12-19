import { Edit, Trash2 } from 'lucide-react';
import { Button } from '../../../../../ui/button';

interface TypeActionsProps {
  typeName: string;
  onEdit?: (typeName: string) => void;
  onDelete: (typeName: string) => void;
}

export default function TypeActions({ typeName, onEdit, onDelete }: TypeActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      {onEdit && (
        <Button
          variant="ghost"
          size="icon"
          title="Редагувати"
          onClick={() => onEdit(typeName)}
        >
          <Edit className="w-4 h-4" />
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(typeName)}
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
        title="Видалити тип"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
