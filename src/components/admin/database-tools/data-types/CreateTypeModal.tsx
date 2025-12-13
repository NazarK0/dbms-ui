import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Alert, AlertDescription } from '../../../ui/alert';
import { getBaseTypeOptions, getTypeCategoryOptions } from './utils';

interface CreateTypeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TypeFormData) => void;
}

export interface TypeFormData {
  typeName: string;
  typeCategory: 'domain' | 'composite' | 'enum';
  baseType?: string;
}

export default function CreateTypeModal({ open, onOpenChange, onSubmit }: CreateTypeModalProps) {
  const [typeName, setTypeName] = useState('');
  const [baseType, setBaseType] = useState('');
  const [typeCategory, setTypeCategory] = useState<'domain' | 'composite' | 'enum'>('domain');

  const baseTypeOptions = getBaseTypeOptions();
  const categoryOptions = getTypeCategoryOptions();

  const handleSubmit = () => {
    if (typeName.trim()) {
      onSubmit({
        typeName: typeName.trim(),
        typeCategory,
        baseType: typeCategory === 'domain' ? baseType : undefined,
      });
      
      // Reset form
      setTypeName('');
      setBaseType('');
      setTypeCategory('domain');
    }
  };

  const handleClose = () => {
    setTypeName('');
    setBaseType('');
    setTypeCategory('domain');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Створити користувацький тип даних</DialogTitle>
          <DialogDescription>
            Створення нового типу даних у схемі
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="type-category">Категорія типу</Label>
            <Select 
              value={typeCategory} 
              onValueChange={(value) => setTypeCategory(value as 'domain' | 'composite' | 'enum')}
            >
              <SelectTrigger id="type-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type-name">Назва типу</Label>
            <Input
              id="type-name"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
              placeholder="email"
            />
          </div>

          {typeCategory === 'domain' && (
            <div className="space-y-2">
              <Label htmlFor="base-type">Базовий тип</Label>
              <Select value={baseType} onValueChange={setBaseType}>
                <SelectTrigger id="base-type">
                  <SelectValue placeholder="Виберіть базовий тип" />
                </SelectTrigger>
                <SelectContent>
                  {baseTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Alert>
            <AlertDescription>
              <strong>Примітка:</strong> Після створення типу, ви зможете використовувати його при створенні або зміні таблиць.
            </AlertDescription>
          </Alert>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Скасувати
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!typeName.trim() || (typeCategory === 'domain' && !baseType)}
            className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Створити
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
