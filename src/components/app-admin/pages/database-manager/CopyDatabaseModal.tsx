import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Alert, AlertDescription } from '../../../ui/alert';

interface CopyDatabaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceDatabaseName: string | null;
  onCopy: () => void;
  onClose: () => void;
}

export default function CopyDatabaseModal({
  open,
  onOpenChange,
  sourceDatabaseName,
  onCopy,
  onClose,
}: CopyDatabaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Копіювати базу даних</DialogTitle>
          <DialogDescription>
            Створити копію бази даних "{sourceDatabaseName}" з усіма таблицями та даними
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="copy-name">Назва нової бази даних</Label>
            <Input
              id="copy-name"
              placeholder={`${sourceDatabaseName}_copy`}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="copy-type">Тип копіювання</Label>
            <Select defaultValue="full">
              <SelectTrigger id="copy-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Повна копія (структура + дані)</SelectItem>
                <SelectItem value="schema">Тільки структура</SelectItem>
                <SelectItem value="data">Структура + дані (без індексів)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Alert>
            <AlertDescription>
              <strong>Примітка:</strong> Копіювання великих баз даних може зайняти деякий час.
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Скасувати
          </Button>
          <Button
            onClick={onCopy}
            className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
          >
            Копіювати
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
