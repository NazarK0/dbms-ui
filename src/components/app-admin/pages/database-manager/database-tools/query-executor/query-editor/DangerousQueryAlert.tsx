/**
 * DangerousQueryAlert Component
 * ==============================
 * 
 * Warning alert про потенційно небезпечний запит (UPDATE, DELETE, DROP, etc).
 */

import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '../../../../../../ui/alert';
import { DangerousQueryAlertProps } from './types';

export function DangerousQueryAlert({ show }: DangerousQueryAlertProps) {
  if (!show) {
    return null;
  }

  return (
    <Alert className="mt-2 bg-orange-50 border-orange-200">
      <AlertTriangle className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-900">
        <span className="font-medium">Увага!</span> Цей запит може змінити або видалити дані. Будьте обережні.
      </AlertDescription>
    </Alert>
  );
}
