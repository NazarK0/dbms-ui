import { Card, CardContent } from '../../../../ui/card';
import { LogLevel } from '../types';

interface LogStatsCardProps {
  label: string;
  value: number;
  colorClass?: string;
  borderColor?: string;
  level?: LogLevel;
}


const getBorderColorByLogLevel = (level: LogLevel) => {
  switch (level) {
    case "success":
      return "border-l-green-500";
    case "warning":
      return "border-l-yellow-500";
    case "error":
      return "border-l-red-500";
    case "info":
      return "border-l-blue-500";
    case "unknown":
      return "";
    default: return '';
  }
};


const geTextColorByLogLevel = (level: LogLevel) => {
  switch (level) {
    case "success":
      return "text-green-600";
    case "warning":
      return "text-yellow-600";
    case "error":
      return "text-red-600";
    case "info":
      return "text-blue-600";
    case "unknown":
      return "";
    default: return '';
  }
};


export default function LogWidget({
  label,
  value,
  level,
}: LogStatsCardProps) {
  const borderColor = getBorderColorByLogLevel(level);
  const textColor = geTextColorByLogLevel(level);
  return (
    <Card
      className={`border-slate-200 shadow-sm ${borderColor ? `border-l-4 ${borderColor}` : ''
        }`}
    >
      <CardContent className="p-4">
        <p className="text-slate-600 text-sm mb-1">{label}</p>
        <p className={`text-2xl ${textColor}`}>{value}</p>
      </CardContent>
    </Card>
  );
}
