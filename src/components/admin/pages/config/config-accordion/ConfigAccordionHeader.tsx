import { RotateCcw, Save } from 'lucide-react';
import { CardDescription, CardHeader, CardTitle } from '../../../../ui/card';
import { Button } from '../../../../ui/button';
import type { ConfigAccordionHeaderProps } from './types';

export default function ConfigAccordionHeader({
  hasChanges,
  onSave,
  onReset,
}: ConfigAccordionHeaderProps) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Налаштування PostgreSQL сервера</CardTitle>
          <CardDescription>Керування параметрами конфігурації postgresql.conf</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {onReset && (
            <Button variant="outline" onClick={onReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Скинути
            </Button>
          )}
          {onSave && (
            <Button disabled={!hasChanges} onClick={onSave}>
              <Save className="w-4 h-4 mr-2" />
              Зберегти зміни
            </Button>
          )}
        </div>
      </div>
    </CardHeader>
  );
}
