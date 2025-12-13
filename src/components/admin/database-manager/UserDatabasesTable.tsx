import { Database as DatabaseIcon, Download, Copy, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';

interface Database {
  name: string;
  owner: string;
  size: string;
  tables: number;
  encoding: string;
  collation: string;
}

interface UserDatabasesTableProps {
  databases: Database[];
  onDatabaseSelect: (dbName: string) => void;
  onDeleteDatabase: (dbName: string) => void;
  onExport: (dbName: string) => void;
  onCopy: (dbName: string) => void;
}

export default function UserDatabasesTable({
  databases,
  onDatabaseSelect,
  onDeleteDatabase,
  onExport,
  onCopy,
}: UserDatabasesTableProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Користувацькі бази даних</CardTitle>
        <CardDescription>Клацніть на рядок для відкриття деталей бази даних</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
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
          <TableBody>
            {databases.map((db) => (
              <TableRow 
                key={db.name} 
                onClick={() => onDatabaseSelect(db.name)}
                className="cursor-pointer hover:bg-blue-50/50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
                      <DatabaseIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-900">{db.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{db.owner}</Badge>
                </TableCell>
                <TableCell className="text-slate-600">{db.size}</TableCell>
                <TableCell className="text-slate-600">{db.tables}</TableCell>
                <TableCell className="text-slate-600">{db.encoding}</TableCell>
                <TableCell className="text-slate-600">{db.collation}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDatabaseSelect(db.name)}
                      title="Переглянути"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onExport(db.name)}
                      title="Експорт схеми"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onCopy(db.name)}
                      title="Копіювати БД"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Редагувати">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteDatabase(db.name)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Видалити"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}