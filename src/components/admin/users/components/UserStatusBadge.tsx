import { Badge } from '../../../ui/badge';

interface UserStatusBadgeProps {
  status: 'active' | 'trial' | 'inactive';
}

export default function UserStatusBadge({ status }: UserStatusBadgeProps) {
  if (status === 'active') {
    return (
      <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
        Активний
      </Badge>
    );
  }

  if (status === 'trial') {
    return (
      <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
        Пробний
      </Badge>
    );
  }

  return (
    <Badge variant="outline">Неактивний</Badge>
  );
}
