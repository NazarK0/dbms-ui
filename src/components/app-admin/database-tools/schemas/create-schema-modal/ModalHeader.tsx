/**
 * Create Schema Modal - Header Component
 * 
 * Displays the modal title and description with database context.
 */

import { DialogDescription, DialogHeader, DialogTitle } from '../../../../ui/dialog';

interface ModalHeaderProps {
  selectedDatabase: string;
}

export default function ModalHeader({ selectedDatabase }: ModalHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle>Створити нову схему</DialogTitle>
      <DialogDescription>
        Створення нової схеми в базі даних {selectedDatabase}
      </DialogDescription>
    </DialogHeader>
  );
}
