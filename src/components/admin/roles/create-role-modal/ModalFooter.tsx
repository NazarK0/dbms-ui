import { Plus, Save } from 'lucide-react';
import { DialogFooter } from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { buttonLabels } from './data';
import { getButtonStyleClass } from './utils';
import type { ModalFooterProps } from './types';

export default function ModalFooter({
  isEditMode,
  onCancel,
  onSave,
}: ModalFooterProps) {
  return (
    <DialogFooter>
      <Button variant="outline" onClick={onCancel}>
        {buttonLabels.cancel}
      </Button>
      <Button onClick={onSave} className={getButtonStyleClass(isEditMode)}>
        {isEditMode ? (
          <>
            <Save className="w-4 h-4 mr-2" />
            {buttonLabels.save}
          </>
        ) : (
          <>
            <Plus className="w-4 h-4 mr-2" />
            {buttonLabels.create}
          </>
        )}
      </Button>
    </DialogFooter>
  );
}
