/**
 * RoleIcon Component
 * Large centered icon with gradient background
 */

import { UserCog, Users } from 'lucide-react';

interface RoleIconProps {
  isAdmin: boolean;
  gradient: string;
}

export default function RoleIcon({ isAdmin, gradient }: RoleIconProps) {
  return (
    <div className={`absolute inset-0 m-2 bg-gradient-to-br ${gradient} rounded-md flex items-center justify-center`}>
      {isAdmin ? (
        <UserCog className="w-2/5 h-2/5 text-white/90" />
      ) : (
        <Users className="w-2/5 h-2/5 text-white/90" />
      )}
    </div>
  );
}
