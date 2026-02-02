import { Progress } from '../../../../../../ui/progress';

interface HitRatioCellProps {
  hitRatio: number;
}

export default function HitRatioCell({ hitRatio }: HitRatioCellProps) {
  return (
    <div className="flex items-center gap-3">
      <Progress value={hitRatio} className="h-2 flex-1 max-w-[80px]" />
      <span className="text-sm text-slate-900 min-w-[50px]">{hitRatio}%</span>
    </div>
  );
}
