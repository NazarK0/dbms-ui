import { UserCog } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import RolesGrid from './RolesGrid';
import type { Role } from './role-card/types';

interface AdminRolesPanelProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onSelect: (name: string) => void;
  onDelete?: (role: Role) => void;
}

export default function AdminRolesPanel({ 
  roles, 
  onEdit, 
  onSelect, 
  onDelete
}: AdminRolesPanelProps) {
  return (
    <Card className="border-lime-200 shadow-sm bg-gradient-to-br from-lime-50/50 to-green-50/50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
            <UserCog className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="flex items-center gap-2">
              Адміністративні ролі
              <Badge variant="secondary" className="bg-lime-100 text-lime-700 border-lime-300">
                {roles.length}
              </Badge>
            </CardTitle>
            <CardDescription>Ролі з доступом до адміністрування системи</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <RolesGrid 
          roles={roles} 
          onEdit={onEdit} 
          onSelect={onSelect}
          onDelete={onDelete}
        />
      </CardContent>
    </Card>
  );
}