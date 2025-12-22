import { UserCog, Users } from 'lucide-react';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../../../ui/dialog';
import type { RoleType } from '../create-role-modal';

interface EditModalHeaderProps {
  roleType: RoleType;
  roleName: string;
}

export default function EditModalHeader({
  roleType,
  roleName,
}: EditModalHeaderProps) {
  const isAdmin = roleType === 'admin';
  const Icon = isAdmin ? UserCog : Users;
  const gradientClass = isAdmin
    ? 'from-lime-500 to-green-600'
    : 'from-violet-500 to-purple-600';
  const title = isAdmin
    ? 'Редагувати адміністративну роль'
    : 'Редагувати користувацьку роль';

  return (
    <DialogHeader>
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 bg-gradient-to-br ${gradientClass} rounded-lg flex items-center justify-center`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Змініть налаштування ролі, права доступу та видимість UI
          </DialogDescription>
        </div>
      </div>
    </DialogHeader>
  );
}
