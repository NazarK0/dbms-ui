import { Label } from '../../../ui/label';
import { Button } from '../../../ui/button';
import { roleSelectorLabel } from './data';
import type { RoleSelectorProps } from './types';

export default function RoleSelector({
  selectedRole,
  roles,
  onRoleChange,
}: RoleSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <Label className="text-slate-700">{roleSelectorLabel}</Label>
      <div className="flex gap-2">
        {roles.map((role) => (
          <Button
            key={role.id}
            variant={selectedRole === role.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onRoleChange(role.id)}
            className={
              selectedRole === role.id
                ? `bg-gradient-to-r ${role.color} text-white border-0`
                : ''
            }
          >
            {role.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
