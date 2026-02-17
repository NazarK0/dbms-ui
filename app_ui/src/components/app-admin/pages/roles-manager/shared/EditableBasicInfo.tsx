import { Input } from '../../../../ui/input';
import { Textarea } from '../../../../ui/textarea';
import { Label } from '../../../../ui/label';
import { getRoleNamePlaceholder, labels, placeholders } from '../create-role-dialog';
import type { RoleType } from '../create-role-dialog';

interface EditableBasicInfoProps {
  roleType: RoleType;
  roleName: string;
  roleDescription: string;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
}

export default function EditableBasicInfo({
  roleType,
  roleName,
  roleDescription,
  onNameChange,
  onDescriptionChange,
}: EditableBasicInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="role-name">{labels.roleName}</Label>
        <Input
          id="role-name"
          value={roleName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder={getRoleNamePlaceholder(roleType)}
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="role-description">{labels.roleDescription}</Label>
        <Textarea
          id="role-description"
          value={roleDescription}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder={placeholders.roleDescription}
          className="mt-2"
        />
      </div>
    </div>
  );
}
