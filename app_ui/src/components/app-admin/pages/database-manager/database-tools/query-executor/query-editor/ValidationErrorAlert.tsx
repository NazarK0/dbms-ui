/**
 * ValidationErrorAlert Component
 * ===============================
 * 
 * Error alert для відображення помилок валідації SQL запиту.
 */

import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '../../../../../../ui/alert';
import { ValidationErrorAlertProps } from './types';

export function ValidationErrorAlert({ error }: ValidationErrorAlertProps) {
  return (
    <Alert className="mt-2 bg-red-50 border-red-200">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-900">
        {error}
      </AlertDescription>
    </Alert>
  );
}
