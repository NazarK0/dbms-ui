import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Button } from '../../../ui/button';

interface CreateDatabaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dbName: string;
  onDbNameChange: (name: string) => void;
  dbOwner: string;
  onDbOwnerChange: (owner: string) => void;
  onCreate: () => void;
}

export default function CreateDatabaseModal({
  open,
  onOpenChange,
  dbName,
  onDbNameChange,
  dbOwner,
  onDbOwnerChange,
  onCreate,
}: CreateDatabaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Створити нову базу даних</DialogTitle>
          <DialogDescription>
            Введіть параметри для створення нової бази даних PostgreSQL
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="db-name">Назва бази даних</Label>
            <Input
              id="db-name"
              value={dbName}
              onChange={(e) => onDbNameChange(e.target.value)}
              placeholder="my_database"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="db-owner">Власник</Label>
            <Select value={dbOwner} onValueChange={onDbOwnerChange}>
              <SelectTrigger id="db-owner">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">admin</SelectItem>
                <SelectItem value="developer">developer</SelectItem>
                <SelectItem value="analyst">analyst</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="db-encoding">Кодування</Label>
            <Select defaultValue="UTF8">
              <SelectTrigger id="db-encoding">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTF8">UTF8</SelectItem>
                <SelectItem value="LATIN1">LATIN1</SelectItem>
                <SelectItem value="SQL_ASCII">SQL_ASCII</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Скасувати
          </Button>
          <Button onClick={onCreate}>Створити</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}