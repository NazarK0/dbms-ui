/**
 * DatabaseAlert Component
 * =======================
 * 
 * Alert для відображення поточної вибраної бази даних.
 */

import { Database } from 'lucide-react';
import { Alert, AlertDescription } from '../../../../../../ui/alert';
import { DatabaseAlertProps } from './types';

export function DatabaseAlert({ databaseName }: DatabaseAlertProps) {
  return (
    <Alert className="mt-2 bg-blue-50 border-blue-200">
      <Database className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-900">
        Поточна база даних: <span className="font-medium">{databaseName}</span>
      </AlertDescription>
    </Alert>
  );
}
