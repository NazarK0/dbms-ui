import { Download, Copy, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '../../../../ui/button';

interface UserDatabaseActionButtonsProps {
  databaseName: string;
  onView: (dbName: string) => void;
  onExport: (dbName: string) => void;
  onCopy: (dbName: string) => void;
  onDelete: (dbName: string) => void;
}

export default function UserDatabaseActionButtons({
  databaseName,
  onView,
  onExport,
  onCopy,
  onDelete,
}: UserDatabaseActionButtonsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onView(databaseName)}
        title="Переглянути"
      >
        <Eye className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onExport(databaseName)}
        title="Експорт схеми"
      >
        <Download className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onCopy(databaseName)}
        title="Копіювати БД"
      >
        <Copy className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon" title="Редагувати">
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(databaseName)}
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
        title="Видалити"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
