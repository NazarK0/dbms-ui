import { Plus, UserCog } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import RolesGrid from './RolesGrid';
import { Role } from './RoleCard';

interface AdminRolesPanelProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onSelect: (name: string) => void;
  onDelete?: (role: Role) => void;
  onCreateClick: () => void;
}

export default function AdminRolesPanel({ 
  roles, 
  onEdit, 
  onSelect, 
  onDelete,
  onCreateClick 
}: AdminRolesPanelProps) {
  return (
    <Card className="border-lime-200 shadow-sm bg-gradient-to-br from-lime-50/50 to-green-50/50">
      <CardHeader>
        <div className="flex items-center justify-between">
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
          <Button 
            onClick={onCreateClick}
            className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Додати admin роль
          </Button>
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
