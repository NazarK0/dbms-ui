import { Download } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Checkbox } from '../../../ui/checkbox';

interface ExportDatabaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  databaseName: string | null;
  onExport: () => void;
  onClose: () => void;
}

export default function ExportDatabaseModal({
  open,
  onOpenChange,
  databaseName,
  onExport,
  onClose,
}: ExportDatabaseModalProps) {
  const exportOptions = [
    'Структура таблиць',
    'Дані',
    'Індекси',
    'Тригери та функції',
    'Права доступу'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Експорт схеми бази даних</DialogTitle>
          <DialogDescription>
            Експортувати схему бази даних "{databaseName}"
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="export-format">Формат експорту</Label>
            <Select defaultValue="sql">
              <SelectTrigger id="export-format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sql">SQL (pg_dump)</SelectItem>
                <SelectItem value="custom">Custom (pg_dump -Fc)</SelectItem>
                <SelectItem value="tar">TAR архів</SelectItem>
                <SelectItem value="directory">Директорія</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label>Що експортувати</Label>
            <div className="space-y-2">
              {exportOptions.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox id={item} defaultChecked />
                  <Label htmlFor={item} className="text-sm font-normal cursor-pointer">
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Скасувати
          </Button>
          <Button
            onClick={onExport}
            className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Експортувати
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
