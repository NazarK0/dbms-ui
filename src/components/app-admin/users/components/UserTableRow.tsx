import { TableCell, TableRow } from '../../../ui/table';
import { type User } from '../../../../mockData/admin';
import UserAvatar from './UserAvatar';
import UserRoleBadge from './UserRoleBadge';
import UserTimezone from './UserTimezone';
import UserStatusBadge from './UserStatusBadge';
import UserActionButtons from './UserActionButtons';

interface UserTableRowProps {
  user: User;
  type: 'admin' | 'user';
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export default function UserTableRow({ 
  user, 
  type, 
  onEdit, 
  onDelete 
}: UserTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <UserAvatar 
          avatar={user.avatar}
          name={user.name}
          roleColor={user.roleColor}
        />
      </TableCell>
      <TableCell className="text-slate-600">{user.email}</TableCell>
      <TableCell>
        <UserRoleBadge role={user.role} roleColor={user.roleColor} />
      </TableCell>
      <TableCell>
        <UserTimezone timezone={user.timezone} />
      </TableCell>
      <TableCell className="text-slate-600 text-sm">
        {type === 'admin' ? user.lastActive : user.registered}
      </TableCell>
      <TableCell>
        <UserStatusBadge status={user.status} />
      </TableCell>
      <TableCell className="text-right">
        <UserActionButtons 
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
