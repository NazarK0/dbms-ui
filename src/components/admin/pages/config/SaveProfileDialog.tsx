import { useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Alert, AlertDescription } from '../../../ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../ui/dialog';

interface SaveProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parametersCount: number;
  onSave?: (name: string, description: string) => void;
}

export default function SaveProfileDialog({
  open,
  onOpenChange,
  parametersCount,
  onSave,
}: SaveProfileDialogProps) {
  const [profileName, setProfileName] = useState('');
  const [profileDescription, setProfileDescription] = useState('');

  const handleSave = () => {
    onSave?.(profileName, profileDescription);
    setProfileName('');
    setProfileDescription('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Зберегти поточні налаштування як профіль</DialogTitle>
          <DialogDescription>
            Створіть новий профіль конфігурації для подальшого використання
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="profile-name">Назва профілю</Label>
            <Input 
              id="profile-name" 
              placeholder="Наприклад: Production Setup v2" 
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-description">Опис (необов'язково)</Label>
            <Input 
              id="profile-description" 
              placeholder="Короткий опис профілю..."
              value={profileDescription}
              onChange={(e) => setProfileDescription(e.target.value)}
            />
          </div>
          <Alert className="bg-blue-50 border-blue-200">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              Буде збережено <strong>{parametersCount}</strong> параметрів з поточної конфігурації
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Скасувати</Button>
          <Button onClick={handleSave} disabled={!profileName.trim()}>
            <Save className="w-4 h-4 mr-2" />
            Зберегти профіль
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
