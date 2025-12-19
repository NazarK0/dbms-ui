import { Link2 } from 'lucide-react';
import { Alert, AlertDescription } from '../../../ui/alert';

export default function ServersInfoAlert() {
  return (
    <Alert className="bg-blue-50 border-blue-200">
      <Link2 className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-900">
        Зовнішні сервери дозволяють підключатися до віддалених баз даних та створювати foreign tables для доступу до даних
      </AlertDescription>
    </Alert>
  );
}
