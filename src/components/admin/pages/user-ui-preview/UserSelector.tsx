import { User } from 'lucide-react';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';

interface UserSelectorProps {
  username?: string;
  userId?: string;
  onUsernameChange?: (username: string) => void;
  onUserIdChange?: (userId: string) => void;
}

export default function UserSelector({
  username,
  userId,
  onUsernameChange,
  onUserIdChange,
}: UserSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <User className="w-4 h-4 text-slate-400" />
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Label htmlFor="username" className="text-xs text-slate-600 whitespace-nowrap">
            Користувач:
          </Label>
          <Input
            id="username"
            type="text"
            value={username || ''}
            onChange={(e) => onUsernameChange?.(e.target.value)}
            placeholder="username"
            className="h-8 w-32 text-sm"
          />
        </div>
        
        <span className="text-slate-400">або</span>
        
        <div className="flex items-center gap-2">
          <Label htmlFor="userId" className="text-xs text-slate-600 whitespace-nowrap">
            ID:
          </Label>
          <Input
            id="userId"
            type="text"
            value={userId || ''}
            onChange={(e) => onUserIdChange?.(e.target.value)}
            placeholder="user_id"
            className="h-8 w-32 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
