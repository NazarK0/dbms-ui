/**
 * RoleCard Component
 * Displays a role card with user count, actions, and description tooltip
 */

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../ui/tooltip';
import { UserCountBadge, ActionButtons, RoleIcon, TitleOverlay } from './components';
import { getCardStyle, isAdminRole, isDeletableRole } from './utils';
import type { RoleCardProps } from './types';

export default function RoleCard({ role, onEdit, onSelect, onDelete }: RoleCardProps) {
  const { bgGradient, borderColor } = getCardStyle(role.type);
  const isAdmin = isAdminRole(role.type);
  const canDelete = isDeletableRole(role.name);
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div 
            className={`relative border ${borderColor} rounded-md p-2 bg-gradient-to-br ${bgGradient} transition-all cursor-pointer aspect-square group hover:shadow-md overflow-hidden`}
            onClick={() => onSelect(role.name)}
          >
            <UserCountBadge count={role.users} />
            
            <ActionButtons 
              role={role}
              onEdit={onEdit}
              onDelete={onDelete}
              canDelete={canDelete}
            />
            
            <RoleIcon 
              isAdmin={isAdmin}
              gradient={role.color}
            />
            
            <TitleOverlay name={role.name} />
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[200px]">
          <p className="text-xs">{role.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
