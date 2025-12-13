import { useState, useEffect } from 'react';
import { Puzzle, Plus, Trash2, Search, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { installedExtensionsDetailed, availableExtensions } from '../../../mockData/admin';
import { mockApiCall } from '../../../utils/mockApi';
import { SkeletonTable, SkeletonCardGrid } from '../../ui/skeletons';

export default function ExtensionManager({ selectedDatabase }: { selectedDatabase?: string }) {
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isLoadingInstalled, setIsLoadingInstalled] = useState(true);
  const [isLoadingAvailable, setIsLoadingAvailable] = useState(true);
  const [installedExtensions, setInstalledExtensions] = useState<any[]>([]);
  const [availableExts, setAvailableExts] = useState<any[]>([]);

  useEffect(() => {
    // Load installed extensions
    mockApiCall('extensions/installed', { database: selectedDatabase }, 700).then((data) => {
      setInstalledExtensions(installedExtensionsDetailed);
      setIsLoadingInstalled(false);
    });

    // Load available extensions
    mockApiCall('extensions/available', {}, 900).then((data) => {
      setAvailableExts(availableExtensions);
      setIsLoadingAvailable(false);
    });
  }, [selectedDatabase]);

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
          {isLoadingInstalled ? (
            <SkeletonTable rows={5} columns={5} showActions />
          ) : (
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
                          <AlertCircle className="w-3 h-3" />
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
          )}
        </CardContent>
      </Card>

      {/* Available Extensions */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Доступні розширення</CardTitle>
          <CardDescription>Розширення, які можна встановити</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingAvailable ? (
            <SkeletonCardGrid count={6} columns={2} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableExts.map((ext) => (
                <div key={ext.name} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-slate-900 font-medium">{ext.name}</h4>
                    <Badge variant="outline">{ext.version}</Badge>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{ext.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Встановити
                  </Button>
                </div>
              ))}
            </div>
          )}
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