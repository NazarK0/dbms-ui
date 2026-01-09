import { Download } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '../../../../../ui/card';
import { Button } from '../../../../../ui/button';

interface BackupHeaderProps {
  selectedDatabase?: string;
  onCreateBackup: () => void;
}

export default function BackupHeader({ selectedDatabase, onCreateBackup }: BackupHeaderProps) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Резервні копії</CardTitle>
          <CardDescription>База даних: {selectedDatabase}</CardDescription>
        </div>
        <Button onClick={onCreateBackup}>
          <Download className="w-4 h-4 mr-2" />
          Створити резервну копію
        </Button>
      </div>
    </CardHeader>
  );
}
