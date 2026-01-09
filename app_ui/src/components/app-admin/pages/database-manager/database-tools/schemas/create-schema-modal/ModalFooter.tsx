/**
 * Create Schema Modal - Footer Component
 * 
 * Action buttons for the modal:
 * - Cancel button (outline style)
 * - Submit button (olive gradient for admin theme)
 */

import { Plus } from 'lucide-react';
import { DialogFooter } from '../../../../../../ui/dialog';
import { Button } from '../../../../../../ui/button';

interface ModalFooterProps {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
}

export default function ModalFooter({ onCancel, onSubmit, isSubmitDisabled }: ModalFooterProps) {
  return (
    <DialogFooter>
      <Button variant="outline" onClick={onCancel}>
        Скасувати
      </Button>
      <Button
        onClick={onSubmit}
        disabled={isSubmitDisabled}
        className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
      >
        <Plus className="w-4 h-4 mr-2" />
        Створити
      </Button>
    </DialogFooter>
  );
}
