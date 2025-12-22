import { Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import RolesGrid from './RolesGrid';
import type { Role } from './role-card/types';

interface UserRolesPanelProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onSelect: (name: string) => void;
  onDelete?: (role: Role) => void;
}

export default function UserRolesPanel({ 
  roles, 
  onEdit, 
  onSelect,
  onDelete
}: UserRolesPanelProps) {
  return (
    <Card className="border-violet-200 shadow-sm bg-gradient-to-br from-violet-50/50 to-purple-50/50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="flex items-center gap-2">
              Користувацькі ролі
              <Badge variant="secondary" className="bg-violet-100 text-violet-700 border-violet-300">
                {roles.length}
              </Badge>
            </CardTitle>
            <CardDescription>Ролі для кінцевих користувачів застосунку</CardDescription>
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