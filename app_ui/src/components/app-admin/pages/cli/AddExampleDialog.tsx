import { useState } from 'react';
import { Save } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Textarea } from '../../../ui/textarea';
import type { AddExampleDialogProps, SavedExample } from './types';

export default function AddExampleDialog({ open, onOpenChange, onAdd }: AddExampleDialogProps) {
  const [title, setTitle] = useState('');
  const [query, setQuery] = useState('');

  const handleAdd = () => {
    if (!title.trim() || !query.trim()) return;

    const newExample: SavedExample = {
      id: Date.now().toString(),
      title: title.trim(),
      query: query.trim(),
      isCustom: true,
    };

    onAdd(newExample);
    setTitle('');
    setQuery('');
    onOpenChange(false);
  };

  const handleCancel = () => {
    setTitle('');
    setQuery('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Додати новий SQL приклад</DialogTitle>
          <DialogDescription>
            Збережіть ваш SQL запит для швидкого доступу
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Назва</Label>
            <Input
              id="title"
              placeholder="Наприклад: Статистика користувачів"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="query">SQL запит</Label>
            <Textarea
              id="query"
              placeholder="Введіть ваш SQL запит..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[120px] font-mono text-sm"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Скасувати
          </Button>
          <Button onClick={handleAdd} disabled={!title.trim() || !query.trim()}>
            <Save className="w-4 h-4 mr-2" />
            Зберегти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
