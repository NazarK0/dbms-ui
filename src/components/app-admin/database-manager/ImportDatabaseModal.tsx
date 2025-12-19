import { Upload, FileCode } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Checkbox } from '../../ui/checkbox';

interface Database {
  name: string;
  owner: string;
  size: string;
  tables: number;
  encoding: string;
  collation: string;
  type: 'user' | 'template' | 'admin';
}

interface ImportDatabaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  databases: Database[];
  onImport: () => void;
}

const importOptions = [
  { label: 'Очистити цільову БД перед імпортом', checked: false },
  { label: 'Ігнорувати помилки', checked: true },
  { label: 'Відключити тригери під час імпорту', checked: false },
];

export default function ImportDatabaseModal({
  open,
  onOpenChange,
  databases,
  onImport,
}: ImportDatabaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Імпорт схеми бази даних</DialogTitle>
          <DialogDescription>
            Імпортувати схему з файлу резервної копії
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="target-db">Цільова база даних</Label>
            <Select defaultValue="">
              <SelectTrigger id="target-db">
                <SelectValue placeholder="Створити нову базу даних" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Створити нову базу даних</SelectItem>
                {databases.map((db) => (
                  <SelectItem key={db.name} value={db.name}>
                    {db.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Файл схеми</Label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-lime-500 transition-colors cursor-pointer bg-slate-50 hover:bg-lime-50">
              <FileCode className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-sm text-slate-600">
                Перетягніть файл сюди або клацніть для вибору
              </p>
              <p className="text-xs text-slate-500 mt-2">SQL, Custom, TAR файли</p>
            </div>
          </div>
          <div className="space-y-3">
            <Label>Параметри імпорту</Label>
            <div className="space-y-2">
              {importOptions.map((item) => (
                <div key={item.label} className="flex items-center space-x-2">
                  <Checkbox id={item.label} defaultChecked={item.checked} />
                  <Label htmlFor={item.label} className="text-sm font-normal cursor-pointer">
                    {item.label}
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
          <Button
            onClick={onImport}
            className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            Імпортувати
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
