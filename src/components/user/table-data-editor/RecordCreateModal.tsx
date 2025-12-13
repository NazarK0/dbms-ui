import { X, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import RecordFormFields from './RecordFormFields';
import type { RecordCreateModalProps } from './types';

/**
 * Modal for creating a new record
 */
export default function RecordCreateModal({
  isOpen,
  onClose,
  schema,
  formData,
  onFormDataChange,
  onSubmit,
  table,
}: RecordCreateModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Створити новий запис</DialogTitle>
          <DialogDescription>
            Заповніть поля для створення нового запису в таблиці {table}
          </DialogDescription>
        </DialogHeader>

        <RecordFormFields
          columns={schema.columns}
          formData={formData}
          onFormDataChange={onFormDataChange}
          showRequired={true}
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Скасувати
          </Button>
          <Button
            onClick={onSubmit}
            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
          >
            <Check className="w-4 h-4 mr-2" />
            Створити
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
