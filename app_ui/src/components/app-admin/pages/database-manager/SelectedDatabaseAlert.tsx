import { X, Database as DatabaseIcon } from 'lucide-react';
import { Alert, AlertDescription } from '../../../ui/alert';
import { Button } from '../../../ui/button';

interface SelectedDatabaseAlertProps {
  databaseName: string;
  onClose: () => void;
}

export default function SelectedDatabaseAlert({
  databaseName,
  onClose,
}: SelectedDatabaseAlertProps) {
  return (
    <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <DatabaseIcon className="h-5 w-5 text-blue-600" />
      <AlertDescription className="flex items-center justify-between">
        <div>
          <p className="text-blue-900">Обрана база даних</p>
          <p className="text-blue-700 text-sm">{databaseName}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onClose}>
          <X className="w-4 h-4 mr-2" />
          Закрити
        </Button>
      </AlertDescription>
    </Alert>
  );
}
