import { DialogDescription, DialogHeader, DialogTitle } from '../../../ui/dialog';

export default function ModalHeader() {
  return (
    <DialogHeader>
      <DialogTitle>Створити нову базу даних</DialogTitle>
      <DialogDescription>
        Введіть параметри для створення нової бази даних PostgreSQL
      </DialogDescription>
    </DialogHeader>
  );
}
