import { Edit, Trash2 } from 'lucide-react';
import { Button } from '../../../ui/button';
import { type User } from '../../../../mockData/admin';

interface UserActionButtonsProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export default function UserActionButtons({ 
  user, 
  onEdit, 
  onDelete 
}: UserActionButtonsProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => onEdit?.(user)}
        title="Редагувати користувача"
      >
        <Edit className="w-4 h-4" />
      </Button>
      {user.role !== 'Superadmin' && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onDelete?.(user)}
          title="Видалити користувача"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </Button>
      )}
    </div>
  );
}
