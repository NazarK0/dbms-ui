/**
 * Create Foreign Server Modal - Header Component
 * 
 * Displays the modal title and description for creating a new foreign server.
 */

import { DialogDescription, DialogHeader, DialogTitle } from '../../../../ui/dialog';

export default function ModalHeader() {
  return (
    <DialogHeader>
      <DialogTitle>Додати зовнішній сервер</DialogTitle>
      <DialogDescription>
        Налаштування підключення до віддаленої бази даних
      </DialogDescription>
    </DialogHeader>
  );
}
