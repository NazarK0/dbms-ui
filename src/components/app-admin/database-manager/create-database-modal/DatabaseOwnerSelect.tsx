import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Label } from '../../../ui/label';
import { databaseOwners, type DatabaseOwner } from '../../../../mockData/admin';
import { Shield, User, Crown } from 'lucide-react';

interface DatabaseOwnerSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const getRoleIcon = (roleType: DatabaseOwner['roleType']) => {
  switch (roleType) {
    case 'superuser':
      return <Crown className="w-3.5 h-3.5 text-amber-600" />;
    case 'admin':
      return <Shield className="w-3.5 h-3.5 text-lime-600" />;
    case 'user':
      return <User className="w-3.5 h-3.5 text-slate-600" />;
  }
};

export default function DatabaseOwnerSelect({ 
  value, 
  onChange 
}: DatabaseOwnerSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="db-owner">
        Власник <span className="text-red-500">*</span>
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="db-owner">
          <SelectValue placeholder="Виберіть власника" />
        </SelectTrigger>
        <SelectContent>
          {databaseOwners.map((owner) => (
            <SelectItem key={owner.username} value={owner.username}>
              <div className="flex items-center gap-2">
                {getRoleIcon(owner.roleType)}
                <span>{owner.displayName}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-slate-500">
        PostgreSQL роль, яка буде власником бази даних
      </p>
    </div>
  );
}
