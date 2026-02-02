import { Badge } from '../../../../../../ui/badge';


interface TotalTimeCellProps {
  totalTime: string;
}

export default function TotalTimeCell({ totalTime }: TotalTimeCellProps) {
  return (
    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
      {totalTime}
    </Badge>
  );
}
