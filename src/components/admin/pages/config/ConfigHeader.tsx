import { Power } from 'lucide-react';
import { Button } from '../../../ui/button';
import RestartDialog from './RestartDialog';

interface ConfigHeaderProps {
  restartDialogOpen: boolean;
  onRestartDialogChange: (open: boolean) => void;
  onRestart?: () => void;
}

export default function ConfigHeader({
  restartDialogOpen,
  onRestartDialogChange,
  onRestart,
}: ConfigHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900 text-2xl">Конфігурація PostgreSQL</h2>
          <p className="text-slate-600 text-sm mt-1">
            Управління параметрами сервера та налаштуваннями
          </p>
        </div>
        <Button 
          variant="destructive" 
          size="lg" 
          className="gap-2"
          onClick={() => onRestartDialogChange(true)}
        >
          <Power className="w-4 h-4" />
          Перезапустити сервер
        </Button>
      </div>

      <RestartDialog
        open={restartDialogOpen}
        onOpenChange={onRestartDialogChange}
        onRestart={onRestart}
      />
    </>
  );
}
