import { useState } from 'react';
import { Save } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import type { AddCommandDialogProps, SavedCommand } from './types';

export default function AddCommandDialog({ open, onOpenChange, onAdd }: AddCommandDialogProps) {
  const [cmd, setCmd] = useState('');
  const [desc, setDesc] = useState('');

  const handleAdd = () => {
    if (!cmd.trim() || !desc.trim()) return;

    const newCommand: SavedCommand = {
      id: Date.now().toString(),
      cmd: cmd.trim(),
      desc: desc.trim(),
      isCustom: true,
    };

    onAdd(newCommand);
    setCmd('');
    setDesc('');
    onOpenChange(false);
  };

  const handleCancel = () => {
    setCmd('');
    setDesc('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Додати нову команду</DialogTitle>
          <DialogDescription>
            Збережіть вашу власну команду для швидкого доступу
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="cmd">Команда</Label>
            <Input
              id="cmd"
              placeholder="Наприклад: SELECT * FROM users;"
              value={cmd}
              onChange={(e) => setCmd(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="desc">Опис</Label>
            <Input
              id="desc"
              placeholder="Короткий опис команди..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Скасувати
          </Button>
          <Button onClick={handleAdd} disabled={!cmd.trim() || !desc.trim()}>
            <Save className="w-4 h-4 mr-2" />
            Зберегти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
