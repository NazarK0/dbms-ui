import { Download } from 'lucide-react';
import { Button } from '../../../ui/button';

interface BackupActionsProps {
  backupId: string;
  filename: string;
  onDownload: (backupId: string) => void;
  onRestore: (backupId: string) => void;
}

export default function BackupActions({ backupId, filename, onDownload, onRestore }: BackupActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => onDownload(backupId)}
      >
        <Download className="w-4 h-4 mr-2" />
        Завантажити
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => onRestore(backupId)}
      >
        Відновити
      </Button>
    </div>
  );
}
