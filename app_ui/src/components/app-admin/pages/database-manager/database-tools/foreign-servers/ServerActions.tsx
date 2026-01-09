import { Edit, Trash2, Link2 } from 'lucide-react';
import { Button } from '../../../../../ui/button';

interface ServerActionsProps {
  serverName: string;
  onTest: (serverName: string) => void;
  onEdit?: (serverName: string) => void;
  onDelete: (serverName: string) => void;
}

export default function ServerActions({ serverName, onTest, onEdit, onDelete }: ServerActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        size="icon"
        title="Перевірити з'єднання"
        onClick={() => onTest(serverName)}
      >
        <Link2 className="w-4 h-4" />
      </Button>
      {onEdit && (
        <Button
          variant="ghost"
          size="icon"
          title="Редагувати"
          onClick={() => onEdit(serverName)}
        >
          <Edit className="w-4 h-4" />
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(serverName)}
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
        title="Видалити сервер"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
