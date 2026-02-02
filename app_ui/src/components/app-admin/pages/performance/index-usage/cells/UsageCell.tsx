import { Progress } from '../../../../../ui/progress';

interface UsageCellProps {
  usage: number;
}

export default function UsageCell({ usage }: UsageCellProps) {
  return (
    <div className="flex items-center gap-3">
      <Progress value={usage} className="h-2 flex-1 max-w-[100px]" />
      <span className="text-sm text-slate-900 min-w-[45px]">{usage}%</span>
    </div>
  );
}
