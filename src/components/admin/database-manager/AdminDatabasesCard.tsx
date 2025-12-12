import { Database as DatabaseIcon, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Button } from '../../ui/button';

interface AdminDatabasesCardProps {
  onDatabaseSelect: (dbName: string) => void;
  onExport: (dbName: string) => void;
}

export default function AdminDatabasesCard({ onDatabaseSelect, onExport }: AdminDatabasesCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
            <DatabaseIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle>Адміністративні бази даних</CardTitle>
            <CardDescription>Системні бази даних PostgreSQL</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Назва</TableHead>
              <TableHead>Опис</TableHead>
              <TableHead>Розмір</TableHead>
              <TableHead>Кодування</TableHead>
              <TableHead>Сортування</TableHead>
              <TableHead className="text-right">Дії</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-red-50/30">
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <DatabaseIcon className="w-4 h-4 text-white" />
                  </div>
                  <code className="text-slate-900">postgres</code>
                </div>
              </TableCell>
              <TableCell className="text-slate-600">
                Системна БД для підключень та управління
              </TableCell>
              <TableCell className="text-slate-600">8.2 МБ</TableCell>
              <TableCell className="text-slate-600">UTF8</TableCell>
              <TableCell className="text-slate-600">uk_UA.UTF-8</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDatabaseSelect('postgres')}
                    title="Переглянути"
                  >
                    <DatabaseIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onExport('postgres')}
                    title="Експорт схеми"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}