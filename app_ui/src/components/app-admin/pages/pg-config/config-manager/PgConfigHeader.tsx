import { RotateCcw, Save } from 'lucide-react';
import { CardDescription, CardHeader, CardTitle } from '../../../../ui/card';
import { Button } from '../../../../ui/button';
import { useState } from 'react';

export default function PgConfigHeader() {
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = () => {
    console.log('Saving configuration...');
    setHasChanges(false);
  };

  const handleReset = () => {
    console.log('Resetting configuration...');
    setHasChanges(false);
  };

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Налаштування PostgreSQL сервера</CardTitle>
          <CardDescription>Керування параметрами конфігурації postgresql.conf</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Скинути
            </Button>
          )}
          {hasChanges && (
            <Button disabled={!hasChanges} onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Зберегти зміни
            </Button>
          )}
        </div>
      </div>
    </CardHeader>
  );
}
