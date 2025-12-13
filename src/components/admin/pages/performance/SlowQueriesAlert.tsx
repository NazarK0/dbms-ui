import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../../../ui/alert';

interface SlowQueriesAlertProps {
  count: number;
}

export default function SlowQueriesAlert({ count }: SlowQueriesAlertProps) {
  if (count === 0) return null;

  return (
    <Alert className="border-yellow-200 bg-yellow-50">
      <AlertCircle className="h-4 w-4 text-yellow-600" />
      <AlertTitle className="text-yellow-900">Виявлено повільні запити</AlertTitle>
      <AlertDescription className="text-yellow-700">
        Знайдено {count} запитів, які потребують оптимізації. Перегляньте рекомендації нижче.
      </AlertDescription>
    </Alert>
  );
}
