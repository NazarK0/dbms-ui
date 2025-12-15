import { Clock } from 'lucide-react';

interface UserTimezoneProps {
  timezone: string;
}

export default function UserTimezone({ timezone }: UserTimezoneProps) {
  return (
    <div className="flex items-center gap-1.5 text-slate-600 text-sm">
      <Clock className="w-3.5 h-3.5" />
      <span>{timezone}</span>
    </div>
  );
}
