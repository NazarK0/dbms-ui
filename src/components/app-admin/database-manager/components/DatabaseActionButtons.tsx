import { Download, Copy, Edit, Eye } from 'lucide-react';
import { Button } from '../../../ui/button';

interface DatabaseActionButtonsProps {
  databaseName: string;
  onView: (dbName: string) => void;
  onExport: (dbName: string) => void;
  onCopy: (dbName: string) => void;
}

export default function DatabaseActionButtons({
  databaseName,
  onView,
  onExport,
  onCopy,
}: DatabaseActionButtonsProps) {
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
      <Button 
        variant="ghost" 
        size="icon" 
        title="Редагувати"
        disabled
      >
        <Edit className="w-4 h-4 text-slate-400" />
      </Button>
    </div>
  );
}
