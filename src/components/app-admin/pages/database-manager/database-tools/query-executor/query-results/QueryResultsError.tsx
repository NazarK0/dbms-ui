/**
 * QueryResultsError Component
 * ============================
 * 
 * Відображає помилку виконання SQL запиту з детальною інформацією.
 */

import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../ui/card';
import { Badge } from '../../../../../../ui/badge';
import { Alert, AlertDescription } from '../../../../../../ui/alert';
import { QueryResultsErrorProps } from './types';

export function QueryResultsError({ error }: QueryResultsErrorProps) {
  return (
    <Card className="border-red-200 shadow-sm">
      <CardHeader className="bg-red-50/50">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <CardTitle className="text-red-900">Помилка виконання запиту</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-900">
            <div className="font-medium mb-2">
              {error.type === 'syntax' ? 'Синтаксична помилка' : 'Помилка'}
            </div>
            <div className="text-sm">{error.message}</div>
            {error.details && (
              <div className="text-xs mt-2 opacity-80">{error.details}</div>
            )}
            {error.code && (
              <div className="text-xs mt-2">
                <Badge variant="outline" className="text-red-700 border-red-300">
                  Код помилки: {error.code}
                </Badge>
              </div>
            )}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
