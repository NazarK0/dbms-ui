import { TableHead, TableHeader, TableRow } from '../../../ui/table';

interface UserTableHeaderProps {
  type: 'admin' | 'user';
}

export default function UserTableHeader({ type }: UserTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Користувач</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Роль</TableHead>
        <TableHead>Часовий пояс</TableHead>
        <TableHead>
          {type === 'admin' ? 'Остання активність' : 'Дата реєстрації'}
        </TableHead>
        <TableHead>Статус</TableHead>
        <TableHead className="text-right">Дії</TableHead>
      </TableRow>
    </TableHeader>
  );
}
