import { TableHead, TableHeader, TableRow } from '../../../../ui/table';

export default function UserDatabaseTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Назва бази даних</TableHead>
        <TableHead>Власник</TableHead>
        <TableHead>Розмір</TableHead>
        <TableHead>Таблиці</TableHead>
        <TableHead>Кодування</TableHead>
        <TableHead>Сортування</TableHead>
        <TableHead className="text-right">Дії</TableHead>
      </TableRow>
    </TableHeader>
  );
}
