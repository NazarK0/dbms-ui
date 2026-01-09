import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../../../../../ui/alert';

export default function FDWNotInstalledAlert() {
  return (
    <Alert className="bg-amber-50 border-amber-200">
      <AlertCircle className="h-5 w-5 text-amber-600" />
      <AlertDescription className="text-amber-900">
        <div className="space-y-2">
          <p className="font-semibold">Розширення Foreign Data Wrapper не встановлено</p>
          <p>
            Для використання зовнішніх серверів необхідно встановити розширення{' '}
            <code className="bg-amber-100 px-2 py-0.5 rounded">postgres_fdw</code> або інше FDW розширення.
          </p>
          <p className="text-sm">
            Перейдіть до розділу "Розширення" для встановлення необхідних компонентів.
          </p>
        </div>
      </AlertDescription>
    </Alert>
  );
}
