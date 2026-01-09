import { Save } from 'lucide-react';
import { DialogFooter } from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import { buttonLabels } from '../create-role-modal';
import type { RoleType } from '../create-role-modal';

interface EditModalFooterProps {
  roleType: RoleType;
  onCancel: () => void;
  onSave: () => void;
}

export default function EditModalFooter({
  roleType,
  onCancel,
  onSave,
}: EditModalFooterProps) {
  const gradientClass =
    roleType === 'admin'
      ? 'bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700'
      : 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700';

  return (
    <DialogFooter>
      <Button variant="outline" onClick={onCancel}>
        {buttonLabels.cancel}
      </Button>
      <Button onClick={onSave} className={gradientClass}>
        <Save className="w-4 h-4 mr-2" />
        {buttonLabels.save}
      </Button>
    </DialogFooter>
  );
}
