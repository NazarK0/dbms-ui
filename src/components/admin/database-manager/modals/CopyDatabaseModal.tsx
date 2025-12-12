import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Button } from '../../../ui/button';
import { Alert, AlertDescription } from '../../../ui/alert';

interface CopyDatabaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDb: string | null;
  onConfirm: () => void;
}

export default function CopyDatabaseModal({
  open,
  onOpenChange,
  selectedDb,
  onConfirm,
}: CopyDatabaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Копіювати базу даних</DialogTitle>
          <DialogDescription>
            Створити копію бази даних "{selectedDb}" з усіма таблицями та даними
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="copy-name">Назва нової бази даних</Label>
            <Input
              id="copy-name"
              placeholder={`${selectedDb}_copy`}
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Скасувати
          </Button>
          <Button onClick={onConfirm}>
            Копіювати
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}