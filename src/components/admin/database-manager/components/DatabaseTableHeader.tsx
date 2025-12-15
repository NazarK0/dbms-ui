import { TableHead, TableHeader, TableRow } from '../../../ui/table';

export default function DatabaseTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Назва</TableHead>
        <TableHead>Опис</TableHead>
        <TableHead>Розмір</TableHead>
        <TableHead>Таблиці</TableHead>
        <TableHead>Кодування</TableHead>
        <TableHead>Сортування</TableHead>
        <TableHead className="text-right">Дії</TableHead>
      </TableRow>
    </TableHeader>
  );
}
