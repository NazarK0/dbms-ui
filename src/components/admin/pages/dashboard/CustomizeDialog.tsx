import { Eye, EyeOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { Checkbox } from '../../../ui/checkbox';
import { Label } from '../../../ui/label';
import { getCategoryLabel, getCardsByCategory } from './utils';
import type { CustomizeDialogProps } from './types';

export default function CustomizeDialog({
  open,
  onOpenChange,
  visibleCards,
  onToggleVisibility,
}: CustomizeDialogProps) {
  const categories = ['stats', 'performance', 'activity'] as const;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Налаштування панелі керування</DialogTitle>
          <DialogDescription>
            Виберіть, які віджети відображати на панелі керування
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {categories.map((category) => {
            const categoryCards = getCardsByCategory(visibleCards, category);

            if (categoryCards.length === 0) return null;

            return (
              <div key={category} className="space-y-3">
                <h4 className="text-sm text-slate-900">
                  {getCategoryLabel(category)}
                </h4>
                {categoryCards.map((card) => (
                  <div
                    key={card.id}
                    className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Checkbox
                      id={card.id}
                      checked={card.visible}
                      onCheckedChange={() => onToggleVisibility(card.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={card.id}
                        className="text-sm cursor-pointer block mb-1"
                      >
                        {card.name}
                      </Label>
                      <p className="text-xs text-slate-600">{card.description}</p>
                    </div>
                    {card.visible ? (
                      <Eye className="w-4 h-4 text-green-600 mt-1" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-slate-400 mt-1" />
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Скасувати
          </Button>
          <Button onClick={() => onOpenChange(false)}>Застосувати</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
