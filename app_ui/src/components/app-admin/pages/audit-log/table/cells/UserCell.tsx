import { User } from 'lucide-react';
import { TableCell } from '../../../../../ui/table';

interface UserCellProps {
  user: string;
}

export default function UserCell({ user }: UserCellProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
        <User className="w-4 h-4 text-white" />
      </div>
      <span className="text-slate-900">{user}</span>
    </div>
  );
}
