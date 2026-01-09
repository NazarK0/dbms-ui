import { Card, CardContent } from '../../../ui/card';

interface LogStatsCardProps {
  label: string;
  value: number;
  colorClass?: string;
  borderColor?: string;
}

export default function LogStatsCard({
  label,
  value,
  colorClass = 'text-slate-900',
  borderColor,
}: LogStatsCardProps) {
  return (
    <Card
      className={`border-slate-200 shadow-sm ${borderColor ? `border-l-4 ${borderColor}` : ''
        }`}
    >
      <CardContent className="p-4">
        <p className="text-slate-600 text-sm mb-1">{label}</p>
        <p className={`text-2xl ${colorClass}`}>{value}</p>
      </CardContent>
    </Card>
  );
}
