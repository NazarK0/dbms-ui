import { ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '../../ui/button';
import type { RecordFormHeaderProps } from './types';

export default function RecordFormHeader({
  onBack,
  onDelete,
  canDelete = false,
  showDeleteButton = false,
}: RecordFormHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Назад до таблиці
        </Button>
      </div>
      {showDeleteButton && canDelete && onDelete && (
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          className="gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Видалити запис
        </Button>
      )}
    </div>
  );
}
