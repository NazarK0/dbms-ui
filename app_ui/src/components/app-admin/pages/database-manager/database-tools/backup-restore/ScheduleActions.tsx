import { Button } from '../../../../../ui/button';

interface ScheduleActionsProps {
  scheduleId: string;
  isEnabled: boolean;
  onToggle: (scheduleId: string) => void;
  onEdit: (scheduleId: string) => void;
}

export default function ScheduleActions({ scheduleId, isEnabled, onToggle, onEdit }: ScheduleActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onToggle(scheduleId)}
      >
        {isEnabled ? 'Вимкнути' : 'Увімкнути'}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEdit(scheduleId)}
      >
        Редагувати
      </Button>
    </div>
  );
}
