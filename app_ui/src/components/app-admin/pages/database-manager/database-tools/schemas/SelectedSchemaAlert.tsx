import { ArrowLeft, Layers } from 'lucide-react';
import { Alert, AlertDescription } from '../../../../../ui/alert';
import { Button } from '../../../../../ui/button';

interface SelectedSchemaAlertProps {
  database: string;
  schema: string;
  onBack: () => void;
}

export default function SelectedSchemaAlert({ database, schema, onBack }: SelectedSchemaAlertProps) {
  return (
    <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <Layers className="h-5 w-5 text-blue-600" />
      <AlertDescription className="flex items-center justify-between">
        <div>
          <p className="text-blue-900">Обрана схема</p>
          <p className="text-blue-700 text-sm">
            <code className="bg-blue-100 px-2 py-0.5 rounded">
              {database}.{schema}
            </code>
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад до схем
        </Button>
      </AlertDescription>
    </Alert>
  );
}
