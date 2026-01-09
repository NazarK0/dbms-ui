import { TableHead, TableHeader, TableRow } from '../../../../ui/table';

export default function TemplateDatabaseTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Назва</TableHead>
        <TableHead>Опис</TableHead>
        <TableHead>Розмір</TableHead>
        <TableHead>Таблиці</TableHead>
        <TableHead>Кодування</TableHead>
        <TableHead>Сортування</TableHead>
        <TableHead>Клонування</TableHead>
        <TableHead className="text-right">Дії</TableHead>
      </TableRow>
    </TableHeader>
  );
}
