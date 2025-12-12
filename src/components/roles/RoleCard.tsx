import { Shield, Users, Edit, Trash2, UserCog } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface Role {
  name: string;
  users: number;
  description: string;
  color: string;
  badge: string;
  type: 'admin' | 'user';
}

interface RoleCardProps {
  role: Role;
  onEdit: (role: Role) => void;
  onSelect: (name: string) => void;
}

export default function RoleCard({ role, onEdit, onSelect }: RoleCardProps) {
  const isAdmin = role.type === 'admin';
  const bgGradient = isAdmin 
    ? 'from-lime-50 to-green-50 hover:from-lime-100 hover:to-green-100' 
    : 'from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100';
  const borderColor = isAdmin ? 'border-lime-200' : 'border-violet-200';
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div 
            className={`relative border ${borderColor} rounded-md p-2 bg-gradient-to-br ${bgGradient} transition-all cursor-pointer aspect-square group hover:shadow-md overflow-hidden`}
            onClick={() => onSelect(role.name)}
          >
            {/* User Count Badge - top left corner (messenger style) */}
            <div className="absolute top-1.5 left-1.5 z-20">
              <div className="h-5 min-w-[20px] px-1.5 bg-red-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-[10px] text-white font-bold leading-none">{role.users}</span>
              </div>
            </div>

            {/* Delete Button - top right corner */}
            {role.name !== 'Superadmin' && (
              <Button 
                variant="ghost" 
                size="sm"
                className="absolute top-2 right-2 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-white/80 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Trash2 className="w-3 h-3 text-red-600" />
              </Button>
            )}

            {/* Large Icon - full size */}
            <div className={`absolute inset-0 m-2 bg-gradient-to-br ${role.color} rounded-md flex items-center justify-center`}>
              {isAdmin ? (
                <UserCog className="w-2/5 h-2/5 text-white/90" />
              ) : (
                <Users className="w-2/5 h-2/5 text-white/90" />
              )}
            </div>

            {/* Title + Edit Button - bottom overlay */}
            <div className="absolute bottom-2 left-2 right-2 z-10">
              <div className="bg-white/90 backdrop-blur-sm rounded px-2 py-1 shadow-sm flex items-center justify-between gap-1">
                <h4 className="text-[11px] text-slate-900 line-clamp-2 leading-tight font-medium flex-1">{role.name}</h4>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-4 w-4 p-0 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(role);
                  }}
                >
                  <Edit className="w-3 h-3 text-slate-700" />
                </Button>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[200px]">
          <p className="text-xs">{role.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}