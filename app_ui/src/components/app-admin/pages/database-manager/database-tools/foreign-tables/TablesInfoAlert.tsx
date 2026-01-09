import { Link2 } from 'lucide-react';
import { Alert, AlertDescription } from '../../../../../ui/alert';

export default function TablesInfoAlert() {
  return (
    <Alert className="bg-blue-50 border-blue-200">
      <Link2 className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-900">
        Зовнішні таблиці дозволяють отримувати доступ до даних з інших баз даних або систем через Foreign Data Wrappers (FDW)
      </AlertDescription>
    </Alert>
  );
}
