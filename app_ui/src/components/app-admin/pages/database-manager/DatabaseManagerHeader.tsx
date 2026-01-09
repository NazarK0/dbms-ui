import { Plus, Upload } from 'lucide-react';
import { Button } from '../../../ui/button';

interface DatabaseManagerHeaderProps {
  selectedDatabase: string | null;
  onCreateClick: () => void;
  onImportClick: () => void;
}

export default function DatabaseManagerHeader({
  selectedDatabase,
  onCreateClick,
  onImportClick,
}: DatabaseManagerHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-slate-900">Керування базами даних</h2>
        <p className="text-slate-600">Управління базами даних PostgreSQL</p>
      </div>
      {!selectedDatabase && (
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onImportClick}>
            <Upload className="w-4 h-4 mr-2" />
            Імпорт схеми
          </Button>
          <Button
            onClick={onCreateClick}
            className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Створити базу даних
          </Button>
        </div>
      )}
    </div>
  );
}
