/**
 * User Lookup Panel
 * Allows admin to search and select a real user to preview their interface
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Badge } from '../../../ui/badge';
import { Search, User, Shield, Database, CheckCircle } from 'lucide-react';

interface UserLookupPanelProps {
  onUserSelect: (userId: string, username: string, userRoles: string[]) => void;
}

// Mock user data - in real system this would come from Active Directory
const MOCK_USERS = [
  {
    id: 'user-001',
    username: 'ivan.petrenko',
    fullName: 'Іван Петренко',
    email: 'ivan.petrenko@company.com',
    roles: ['developer', 'data-analyst'],
    department: 'IT',
  },
  {
    id: 'user-002',
    username: 'maria.kovalenko',
    fullName: 'Марія Коваленко',
    email: 'maria.kovalenko@company.com',
    roles: ['content-manager'],
    department: 'Marketing',
  },
  {
    id: 'user-003',
    username: 'petro.sydorenko',
    fullName: 'Петро Сидоренко',
    email: 'petro.sydorenko@company.com',
    roles: ['data-analyst', 'business-analyst'],
    department: 'Analytics',
  },
  {
    id: 'user-004',
    username: 'olena.bondar',
    fullName: 'Олена Бондар',
    email: 'olena.bondar@company.com',
    roles: ['developer', 'devops-engineer'],
    department: 'IT',
  },
  {
    id: 'user-005',
    username: 'andriy.moroz',
    fullName: 'Андрій Мороз',
    email: 'andriy.moroz@company.com',
    roles: ['content-manager', 'data-analyst'],
    department: 'Content',
  },
];

export default function UserLookupPanel({ onUserSelect }: UserLookupPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const filteredUsers = MOCK_USERS.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.username.toLowerCase().includes(query) ||
      user.fullName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.department.toLowerCase().includes(query)
    );
  });

  const handleSelectUser = (user: typeof MOCK_USERS[0]) => {
    setSelectedUser(user.id);
    onUserSelect(user.id, user.username, user.roles);
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-slate-900 flex items-center gap-2">
          <User className="h-4 w-4 text-violet-600" />
          Пошук користувача
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="space-y-2">
          <Label className="text-xs text-slate-600">
            Введіть ID, ім'я або email користувача
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Пошук користувачів..."
              className="pl-10"
            />
          </div>
        </div>

        {/* User List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredUsers.length === 0 ? (
            <div className="p-4 text-center border border-dashed border-slate-300 rounded-lg">
              <p className="text-sm text-slate-500">Користувачів не знайдено</p>
            </div>
          ) : (
            filteredUsers.map((user) => {
              const isSelected = selectedUser === user.id;
              return (
                <button
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? 'border-violet-500 bg-violet-50'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-slate-900 truncate">
                          {user.fullName}
                        </span>
                        {isSelected && (
                          <CheckCircle className="h-4 w-4 text-violet-600 flex-shrink-0" />
                        )}
                      </div>
                      <div className="text-xs text-slate-600 mb-2">
                        {user.username} • {user.email}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          <Database className="h-3 w-3 mr-1" />
                          {user.department}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Shield className="h-3 w-3 text-violet-600" />
                          <span className="text-xs text-slate-600">
                            {user.roles.length} {user.roles.length === 1 ? 'роль' : 'ролей'}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="mt-2 pt-2 border-t border-violet-200">
                          <div className="text-xs text-slate-600 mb-1">Активні ролі:</div>
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map((role) => (
                              <Badge key={role} className="bg-violet-100 text-violet-700 text-xs">
                                {role.replace('-', ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Info Box */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Інформація:</strong> Користувачі синхронізуються з Microsoft Active Directory.
            Після вибору користувача будуть завантажені його реальні ролі та дозволи.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
