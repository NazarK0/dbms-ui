import { Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  roleColor: string;
  status: string;
  avatar: string;
  lastActive?: string;
  registered?: string;
}

interface UserTableProps {
  users: User[];
  type: 'admin' | 'user';
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export default function UserTable({ users, type, onEdit, onDelete }: UserTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Користувач</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Роль</TableHead>
          <TableHead>{type === 'admin' ? 'Остання активність' : 'Дата реєстрації'}</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead className="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${user.roleColor} rounded-full flex items-center justify-center text-white`}>
                  {user.avatar}
                </div>
                <span className="text-slate-900">{user.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-slate-600">{user.email}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 bg-gradient-to-br ${user.roleColor} rounded-full`} />
                <span className="text-slate-900">{user.role}</span>
              </div>
            </TableCell>
            <TableCell className="text-slate-600 text-sm">
              {type === 'admin' ? user.lastActive : user.registered}
            </TableCell>
            <TableCell>
              {user.status === 'active' ? (
                <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">Активний</Badge>
              ) : user.status === 'trial' ? (
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">Пробний</Badge>
              ) : (
                <Badge variant="outline">Неактивний</Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onEdit?.(user)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                {user.role !== 'Superadmin' && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onDelete?.(user)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
