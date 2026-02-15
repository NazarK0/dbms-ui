import { useState } from 'react';
import { Power } from 'lucide-react';
import { Button } from '../../../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../../ui/dialog';

interface RestartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRestart?: () => void;
}

export default function RestartDialog({ open, onOpenChange, onRestart }: RestartDialogProps) {
  const [isRestarting, setIsRestarting] = useState(false);

  const handleRestartServer = () => {
    setIsRestarting(true);

    // Simulate server restart
    setTimeout(() => {
      setIsRestarting(false);
      onOpenChange(false);
      onRestart?.();
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Перезапуск сервера PostgreSQL</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете перезапустити сервер PostgreSQL? Це призведе до переривання всіх активних підключень.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <Power className="w-8 h-8 text-red-600" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-slate-900">Активні підключення будуть перервані</p>
            <p className="text-sm text-slate-600">Сервер перезапуститься протягом кількох секунд</p>
          </div>
          {isRestarting && (
            <div className="w-full">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                <p className="text-sm text-slate-600">Перезапуск сервера...</p>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isRestarting}>
            Скасувати
          </Button>
          <Button
            variant="destructive"
            onClick={handleRestartServer}
            disabled={isRestarting}
            className="gap-2"
          >
            <Power className="w-4 h-4" />
            {isRestarting ? 'Перезапуск...' : 'Перезапустити'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
