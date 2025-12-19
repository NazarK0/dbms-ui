import { Upload } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../ui/dialog';

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport?: (file: File) => void;
}

export default function ImportDialog({ open, onOpenChange, onImport }: ImportDialogProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImport) {
      onImport(file);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Імпорт налаштувань з файлу</DialogTitle>
          <DialogDescription>
            Завантажте JSON файл з налаштуваннями PostgreSQL
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50/50">
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 mb-2">Перетягніть файл сюди або клацніть для вибору</p>
            <p className="text-slate-500 text-sm">Підтримуються файли .json та .conf</p>
            <Input 
              type="file" 
              accept=".json,.conf" 
              className="mt-4" 
              onChange={handleFileChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Скасувати</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
