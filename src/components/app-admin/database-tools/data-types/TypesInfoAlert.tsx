import { Type } from 'lucide-react';
import { Alert, AlertDescription } from '../../../ui/alert';

export default function TypesInfoAlert() {
  return (
    <Alert className="bg-blue-50 border-blue-200">
      <Type className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-900">
        PostgreSQL підтримує створення користувацьких типів: Domain (обмеження на базові типи), Composite (структури), Enum (переліки) та інші
      </AlertDescription>
    </Alert>
  );
}
