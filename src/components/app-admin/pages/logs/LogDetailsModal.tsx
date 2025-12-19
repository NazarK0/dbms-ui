import { FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../ui/dialog';
import LogDetailsContent from './LogDetailsContent';
import type { LogEntry } from './types';

interface LogDetailsModalProps {
  log: LogEntry | null;
  onClose: () => void;
}

export default function LogDetailsModal({ log, onClose }: LogDetailsModalProps) {
  return (
    <Dialog open={!!log} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-lime-600" />
            Деталі запису логу
          </DialogTitle>
          <DialogDescription>Повна інформація про подію системи</DialogDescription>
        </DialogHeader>
        {log && <LogDetailsContent log={log} />}
      </DialogContent>
    </Dialog>
  );
}
