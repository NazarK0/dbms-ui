import { Download } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Checkbox } from '../../../ui/checkbox';
import { Button } from '../../../ui/button';

interface ExportSchemaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDb: string | null;
  onConfirm: () => void;
}

export default function ExportSchemaModal({
  open,
  onOpenChange,
  selectedDb,
  onConfirm,
}: ExportSchemaModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Експорт схеми бази даних</DialogTitle>
          <DialogDescription>
            Експортувати схему бази даних "{selectedDb}"
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
              {['Структура таблиць', 'Дані', 'Індекси', 'Тригери та функції', 'Права доступу'].map((item) => (
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Скасувати
          </Button>
          <Button onClick={onConfirm}>
            <Download className="w-4 h-4 mr-2" />
            Експортувати
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}