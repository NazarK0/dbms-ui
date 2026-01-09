import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '../../../ui/alert';

interface RestartAlertProps {
  count: number;
}

export default function RestartAlert({ count }: RestartAlertProps) {
  if (count === 0) return null;

  return (
    <Alert className="bg-yellow-50 border-yellow-200">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-900">
        <strong>{count}</strong> параметрів вимагають перезапуску сервера для застосування змін
      </AlertDescription>
    </Alert>
  );
}
