import { useState } from 'react';
import { Plus, Puzzle, CheckCircle, XCircle, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';

export default function ExtensionManager({ selectedDatabase }: { selectedDatabase?: string }) {
  const [showInstallModal, setShowInstallModal] = useState(false);

  const installedExtensions = [
    { name: 'pg_stat_statements', version: '1.10', description: 'Відстеження статистики виконання SQL запитів', status: 'enabled' },
    { name: 'uuid-ossp', version: '1.1', description: 'Генерація UUID за різними алгоритмами', status: 'enabled' },
    { name: 'hstore', version: '1.8', description: 'Зберігання пар ключ-значення в одному полі', status: 'enabled' },
    { name: 'pg_trgm', version: '1.6', description: 'Підтримка тригра мів для пошуку подібних рядків', status: 'disabled' },
  ];

  const availableExtensions = [
    { name: 'postgis', version: '3.3.2', description: 'Географічні об\'єкти для PostgreSQL' },
    { name: 'pgcrypto', version: '1.3', description: 'Криптографічні функції' },
    { name: 'pg_repack', version: '1.4.8', description: 'Реорганізація таблиць без блокування' },
    { name: 'timescaledb', version: '2.11.0', description: 'Розширення для часових рядів' },
  ];

  return (
    <div className="space-y-6">
      {/* Installed Extensions */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Puzzle className="w-5 h-5 text-slate-700" />
              <CardTitle>Встановлені розширення</CardTitle>
            </div>
            <Button onClick={() => setShowInstallModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Встановити
            </Button>
          </div>
          <CardDescription>База даних: {selectedDatabase}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Розширення</TableHead>
                <TableHead>Версія</TableHead>
                <TableHead>Опис</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {installedExtensions.map((ext) => (
                <TableRow key={ext.name}>
                  <TableCell className="font-medium text-slate-900">{ext.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{ext.version}</Badge>
                  </TableCell>
                  <TableCell className="text-slate-600 max-w-md">{ext.description}</TableCell>
                  <TableCell>
                    {ext.status === 'enabled' ? (
                      <Badge variant="default" className="gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Увімкнено
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1">
                        <XCircle className="w-3 h-3" />
                        Вимкнено
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        {ext.status === 'enabled' ? 'Вимкнути' : 'Увімкнути'}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Видалити
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Available Extensions */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Доступні розширення</CardTitle>
          <CardDescription>Розширення, які можна встановити</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableExtensions.map((ext) => (
              <div key={ext.name} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-slate-900 font-medium">{ext.name}</h4>
                  <Badge variant="outline">{ext.version}</Badge>
                </div>
                <p className="text-slate-600 text-sm mb-4">{ext.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Встановити
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Install Modal */}
      <Dialog open={showInstallModal} onOpenChange={setShowInstallModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Встановити розширення</DialogTitle>
            <DialogDescription>Введіть назву розширення PostgreSQL</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input placeholder="Назва розширення (напр. postgis)" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInstallModal(false)}>
              Скасувати
            </Button>
            <Button onClick={() => setShowInstallModal(false)}>Встановити</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
