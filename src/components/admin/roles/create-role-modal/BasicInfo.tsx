import { Input } from '../../../ui/input';
import { Textarea } from '../../../ui/textarea';
import { Label } from '../../../ui/label';
import { getRoleNamePlaceholder } from './utils';
import {
  labels,
  placeholders,
  userBaseRoles,
  adminBaseRoles,
} from './data';
import type { BasicInfoProps, RoleType } from './types';

export default function BasicInfo({ roleType }: BasicInfoProps) {
  const baseRoles = roleType === 'user' ? userBaseRoles : adminBaseRoles;

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="role-name">{labels.roleName}</Label>
        <Input
          id="role-name"
          placeholder={getRoleNamePlaceholder(roleType)}
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="role-description">{labels.roleDescription}</Label>
        <Textarea
          id="role-description"
          placeholder={placeholders.roleDescription}
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="base-role">{labels.baseRole}</Label>
        <select
          id="base-role"
          className="w-full mt-2 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
        >
          <option value="">{placeholders.baseRoleEmpty}</option>
          {baseRoles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
