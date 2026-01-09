import { Save } from 'lucide-react';
import { Button } from '../../ui/button';
import type { RecordFormActionsProps } from './types';

export default function RecordFormActions({
  submitLabel,
  cancelLabel = 'Скасувати',
  onCancel,
}: RecordFormActionsProps) {
  return (
    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-200">
      <Button
        type="submit"
        className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
      >
        <Save className="w-4 h-4 mr-2" />
        {submitLabel}
      </Button>
      <Button type="button" variant="outline" onClick={onCancel}>
        {cancelLabel}
      </Button>
    </div>
  );
}
