import { X, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import RecordFormFields from './RecordFormFields';
import type { RecordEditModalProps } from './types';

/**
 * Modal for editing an existing record
 */
export default function RecordEditModal({
  isOpen,
  onClose,
  schema,
  formData,
  onFormDataChange,
  onSubmit,
  recordId,
}: RecordEditModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редагувати запис</DialogTitle>
          <DialogDescription>
            Змініть дані запису #{recordId}
          </DialogDescription>
        </DialogHeader>

        <RecordFormFields
          columns={schema.columns}
          formData={formData}
          onFormDataChange={onFormDataChange}
          showRequired={false}
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Скасувати
          </Button>
          <Button
            onClick={onSubmit}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Зберегти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
