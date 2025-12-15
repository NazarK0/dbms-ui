/**
 * CustomizeDialogFooter Component
 * 
 * Displays the footer section with cancel and apply buttons.
 * 
 * @component
 * @example
 * ```tsx
 * <CustomizeDialogFooter onClose={handleClose} />
 * ```
 */

import { Button } from '../../../../ui/button';
import { DialogFooter } from '../../../../ui/dialog';

interface CustomizeDialogFooterProps {
  /** Callback when dialog should close */
  onClose: () => void;
}

export default function CustomizeDialogFooter({ onClose }: CustomizeDialogFooterProps) {
  return (
    <DialogFooter>
      <Button variant="outline" onClick={onClose}>
        Скасувати
      </Button>
      <Button onClick={onClose}>Застосувати</Button>
    </DialogFooter>
  );
}
