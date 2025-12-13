import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { getAvailableLocations, validateReplicaConfig } from './utils';
import type { AddReplicaFormData } from './types';

interface AddReplicaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: AddReplicaFormData) => void;
}

export default function AddReplicaDialog({ open, onOpenChange, onSubmit }: AddReplicaDialogProps) {
  const [formData, setFormData] = useState<AddReplicaFormData>({
    name: '',
    host: '',
    port: 5432,
    location: 'us-east',
    replicationMode: 'async',
  });

  const locations = getAvailableLocations();

  const handleSubmit = () => {
    const validation = validateReplicaConfig(formData);
    
    if (!validation.valid) {
      alert(validation.errors.join('\n'));
      return;
    }

    onSubmit?.(formData);
    
    // Reset form
    setFormData({
      name: '',
      host: '',
      port: 5432,
      location: 'us-east',
      replicationMode: 'async',
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Додати кластер репліки</DialogTitle>
          <DialogDescription>Налаштуйте новий сервер реплікації</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="replica-name">Назва репліки</Label>
            <Input 
              id="replica-name" 
              placeholder="Read Replica 4" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="host">Host</Label>
            <Input 
              id="host" 
              placeholder="replica-4.example.com" 
              value={formData.host}
              onChange={(e) => setFormData({ ...formData, host: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="port">Port</Label>
            <Input 
              id="port" 
              type="number" 
              value={formData.port}
              onChange={(e) => setFormData({ ...formData, port: parseInt(e.target.value) || 5432 })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Локація</Label>
            <Select 
              value={formData.location}
              onValueChange={(value) => setFormData({ ...formData, location: value })}
            >
              <SelectTrigger id="location">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="replication-mode">Режим реплікації</Label>
            <Select 
              value={formData.replicationMode}
              onValueChange={(value: 'async' | 'sync') => setFormData({ ...formData, replicationMode: value })}
            >
              <SelectTrigger id="replication-mode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="async">Асинхронний</SelectItem>
                <SelectItem value="sync">Синхронний</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Скасувати
          </Button>
          <Button onClick={handleSubmit}>
            Додати репліку
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
