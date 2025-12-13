import { Lock, Download, Copy, Edit, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { templateDatabases } from '../../../mockData/admin';

interface TemplateDatabasesCardProps {
  onDatabaseSelect: (dbName: string) => void;
  onExport: (dbName: string) => void;
  onCopy: (dbName: string) => void;
}

export default function TemplateDatabasesCard({ 
  onDatabaseSelect, 
  onExport,
  onCopy 
}: TemplateDatabasesCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle>Шаблонні бази даних</CardTitle>
            <CardDescription>Системні шаблони для створення нових баз даних</CardDescription>
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
              <TableHead>Таблиці</TableHead>
              <TableHead>Кодування</TableHead>
              <TableHead>Сортування</TableHead>
              <TableHead>Клонування</TableHead>
              <TableHead className="text-right">Дії</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templateDatabases.map((db) => (
              <TableRow 
                key={db.name} 
                className="bg-yellow-50/30 cursor-pointer hover:bg-yellow-50/50 transition-colors"
                onClick={() => onDatabaseSelect(db.name)}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Lock className="w-4 h-4 text-white" />
                    </div>
                    <code className="text-slate-900">{db.name}</code>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">{db.description}</TableCell>
                <TableCell className="text-slate-600">{db.size}</TableCell>
                <TableCell className="text-slate-600">{db.tables}</TableCell>
                <TableCell className="text-slate-600">{db.encoding}</TableCell>
                <TableCell className="text-slate-600">{db.collation}</TableCell>
                <TableCell>
                  <Badge variant={db.allowCloning ? 'default' : 'destructive'}>
                    {db.allowCloning ? 'Так' : 'Ні'}
                  </Badge>
                </TableCell>
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
                      disabled={!db.allowCloning}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="Редагувати"
                      disabled
                    >
                      <Edit className="w-4 h-4 text-slate-400" />
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
