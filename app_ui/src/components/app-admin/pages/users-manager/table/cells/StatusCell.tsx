import { Badge } from '../../../../../ui/badge';


interface StatusCellProps {
  status: string;
}

export default function StatusCell({ status }: StatusCellProps) {

  switch (status) {
    case 'active':
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
          Активний
        </Badge>
      );
    case 'inactive':
      return (
        <Badge variant="outline">
          Неактивний
        </Badge>
      );
  }
}
