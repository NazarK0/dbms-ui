import { Users, UserCog } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../ui/select';
import { getInputBorderClasses, getInfoBoxClasses, getInfoBoxTextClasses, getIconColorClasses } from '../utils/themeUtils';
import type { RoleSelectorProps } from '../types';

/**
 * Role selection component
 */
export default function RoleSelector({
  selectedRole,
  onRoleChange,
  roles,
  userType,
  themeColor,
}: RoleSelectorProps) {
  const Icon = userType === 'admin' ? UserCog : Users;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 ${getIconColorClasses(userType)}`} />
        <div>
          <h4 className="text-slate-900">Призначити роль</h4>
          <p className="text-sm text-slate-600">
            Оберіть роль, яка визначає базовий набір прав доступу
          </p>
        </div>
      </div>

      <Select value={selectedRole} onValueChange={onRoleChange}>
        <SelectTrigger className={`w-full ${getInputBorderClasses(userType, !!selectedRole)}`}>
          <SelectValue placeholder="Оберіть роль..." />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 bg-gradient-to-br ${role.color} rounded-full`} />
                {role.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedRole && (
        <div className={`rounded-lg p-3 border ${getInfoBoxClasses(userType)}`}>
          <p className={`text-sm ${getInfoBoxTextClasses(userType)}`}>
            <strong>Роль обрано:</strong> {roles.find(r => r.value === selectedRole)?.label}. Налаштуйте детальні права доступу нижче.
          </p>
        </div>
      )}
    </div>
  );
}
