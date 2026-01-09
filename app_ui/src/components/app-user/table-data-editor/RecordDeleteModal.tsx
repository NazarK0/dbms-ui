import { X, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import type { RecordDeleteModalProps } from './types';

/**
 * Modal for confirming record deletion
 */
export default function RecordDeleteModal({
  isOpen,
  onClose,
  recordId,
  onConfirm,
}: RecordDeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Видалити запис</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете видалити запис #{recordId}? Цю дію неможливо скасувати.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Скасувати
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Видалити
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
