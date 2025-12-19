import { Table, TableBody } from '../../ui/table';
import { type User } from '../../../mockData/admin';
import { UserTableHeader, UserTableRow } from './components';

interface UserTableProps {
  users: User[];
  type: 'admin' | 'user';
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export default function UserTable({ users, type, onEdit, onDelete }: UserTableProps) {
  return (
    <Table>
      <UserTableHeader type={type} />
      <TableBody>
        {users.map((user) => (
          <UserTableRow
            key={user.id}
            user={user}
            type={type}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
}