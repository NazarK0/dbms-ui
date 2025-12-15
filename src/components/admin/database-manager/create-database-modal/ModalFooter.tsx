import { DialogFooter } from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { Loader2 } from 'lucide-react';

interface ModalFooterProps {
  onCancel: () => void;
  onCreate: () => void;
  isCreating?: boolean;
  isValid?: boolean;
}

export default function ModalFooter({ 
  onCancel, 
  onCreate, 
  isCreating = false,
  isValid = true 
}: ModalFooterProps) {
  return (
    <DialogFooter>
      <Button 
        variant="outline" 
        onClick={onCancel}
        disabled={isCreating}
      >
        Скасувати
      </Button>
      <Button
        onClick={onCreate}
        disabled={!isValid || isCreating}
        className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
      >
        {isCreating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Створення...
          </>
        ) : (
          'Створити'
        )}
      </Button>
    </DialogFooter>
  );
}
