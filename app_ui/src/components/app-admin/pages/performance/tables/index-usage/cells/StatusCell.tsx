import { Badge } from '../../../../../../ui/badge';


interface StatusCellProps {
  usage: number;
}

export default function StatusCell({ usage }: StatusCellProps) {

  if (usage < 10) {
    return (
      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
        Не використовується
      </Badge>
    );
  }
}
