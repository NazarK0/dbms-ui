import { DialogDescription, DialogTitle } from '../../../../ui/dialog';
import type { DialogHeaderUserProps } from '../types';

/**
 * User information in dialog header
 */
export default function DialogHeaderUser({ user }: DialogHeaderUserProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 bg-gradient-to-br ${user.roleColor} rounded-full flex items-center justify-center text-white`}>
        {user.avatar}
      </div>
      <div>
        <DialogTitle>Налаштування прав доступу</DialogTitle>
        <DialogDescription>
          {user.name} • {user.email}
        </DialogDescription>
      </div>
    </div>
  );
}
