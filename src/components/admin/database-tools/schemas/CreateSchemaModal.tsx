import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Alert, AlertDescription } from '../../../ui/alert';
import { Textarea } from '../../../ui/textarea';

export interface SchemaFormData {
  schemaName: string;
  schemaOwner: string;
  schemaDescription: string;
}

interface CreateSchemaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SchemaFormData) => void;
  selectedDatabase: string;
}

const availableOwners = [
  { value: 'postgres', label: 'postgres' },
  { value: 'admin', label: 'admin' },
  { value: 'developer', label: 'developer' },
  { value: 'analyst', label: 'analyst' },
];

export default function CreateSchemaModal({ 
  open, 
  onOpenChange, 
  onSubmit,
  selectedDatabase 
}: CreateSchemaModalProps) {
  const [schemaName, setSchemaName] = useState('');
  const [schemaOwner, setSchemaOwner] = useState('postgres');
  const [schemaDescription, setSchemaDescription] = useState('');

  const handleSubmit = () => {
    if (schemaName.trim()) {
      onSubmit({
        schemaName,
        schemaOwner,
        schemaDescription,
      });
      
      // Reset form
      setSchemaName('');
      setSchemaOwner('postgres');
      setSchemaDescription('');
    }
  };

  const handleCancel = () => {
    // Reset form on cancel
    setSchemaName('');
    setSchemaOwner('postgres');
    setSchemaDescription('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Створити нову схему</DialogTitle>
          <DialogDescription>
            Створення нової схеми в базі даних {selectedDatabase}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="schema-name">Назва схеми</Label>
            <Input
              id="schema-name"
              value={schemaName}
              onChange={(e) => setSchemaName(e.target.value)}
              placeholder="my_schema"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="schema-owner">Власник</Label>
            <Select value={schemaOwner} onValueChange={setSchemaOwner}>
              <SelectTrigger id="schema-owner">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableOwners.map((owner) => (
                  <SelectItem key={owner.value} value={owner.value}>
                    {owner.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="schema-description">Опис (необов'язково)</Label>
            <Textarea
              id="schema-description"
              value={schemaDescription}
              onChange={(e) => setSchemaDescription(e.target.value)}
              placeholder="Опис призначення схеми..."
              rows={3}
            />
          </div>
          
          <Alert>
            <AlertDescription>
              <strong>Примітка:</strong> Після створення схеми, не забудьте надати відповідні права доступу користувачам.
            </AlertDescription>
          </Alert>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Скасувати
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
            disabled={!schemaName.trim()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Створити
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
