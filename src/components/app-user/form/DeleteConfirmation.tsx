import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmation({ onConfirm, onCancel }: DeleteConfirmationProps) {
  return (
    <Card className="border-red-500 bg-red-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-900 font-medium">Підтвердити видалення</p>
            <p className="text-sm text-slate-600">Ця дія незворотна. Запис буде видалено назавжди.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={onConfirm}
            >
              Так, видалити
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
            >
              Скасувати
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
