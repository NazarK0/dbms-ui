import { Label } from '../../../ui/label';
import RoleTypeOption from './RoleTypeOption';
import { sectionTitles, gridLayouts } from './data';
import type { RoleType } from './types';

interface RoleTypeSelectorProps {
  roleType: RoleType;
  onRoleTypeChange: (type: RoleType) => void;
}

export default function RoleTypeSelector({
  roleType,
  onRoleTypeChange,
}: RoleTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-slate-900">{sectionTitles.roleType}</Label>
      <div className={`grid ${gridLayouts.roleTypes} gap-4`}>
        <RoleTypeOption
          type="user"
          selected={roleType === 'user'}
          onSelect={onRoleTypeChange}
        />
        <RoleTypeOption
          type="admin"
          selected={roleType === 'admin'}
          onSelect={onRoleTypeChange}
        />
      </div>
    </div>
  );
}
