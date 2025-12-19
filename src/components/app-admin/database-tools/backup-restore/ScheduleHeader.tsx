import { Clock } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '../../../ui/card';
import { Button } from '../../../ui/button';

interface ScheduleHeaderProps {
  onAddSchedule: () => void;
}

export default function ScheduleHeader({ onAddSchedule }: ScheduleHeaderProps) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Розклад резервного копіювання</CardTitle>
          <CardDescription>Автоматичне створення резервних копій</CardDescription>
        </div>
        <Button onClick={onAddSchedule}>
          <Clock className="w-4 h-4 mr-2" />
          Додати розклад
        </Button>
      </div>
    </CardHeader>
  );
}
