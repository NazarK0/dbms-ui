import { ArrowLeft, Bell, Settings, Users } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface UserRole {
  id: number;
  name: string;
  color: string;
}

interface UserApplicationHeaderProps {
  userRoles: UserRole[];
  currentView: string;
  onBack: () => void;
  onProfileToggle: () => void;
}

export default function UserApplicationHeader({ 
  userRoles, 
  currentView, 
  onBack, 
  onProfileToggle 
}: UserApplicationHeaderProps) {
  return (
    <div className="border-b border-violet-200/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Home
            </Button>
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-slate-900">User Application</h1>
              <p className="text-slate-600 text-sm">Система управління даними</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {userRoles.map((role) => (
                <Badge key={role.id} variant="outline" className={role.color}>
                  {role.name}
                </Badge>
              ))}
            </div>
            <Button variant="outline" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={onProfileToggle}
              className={currentView === 'profile' ? 'bg-violet-100 border-violet-300' : ''}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
