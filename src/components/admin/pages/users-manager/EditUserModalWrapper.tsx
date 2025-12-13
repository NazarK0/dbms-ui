import EditUserPermissionsModal from '../../users/EditUserPermissionsModal';
import type { EditUserModalWrapperProps } from './types';

export default function EditUserModalWrapper({
  open,
  onOpenChange,
  user,
  userType,
}: EditUserModalWrapperProps) {
  if (!user) return null;

  return (
    <EditUserPermissionsModal
      open={open}
      onOpenChange={onOpenChange}
      user={user}
      userType={userType}
    />
  );
}