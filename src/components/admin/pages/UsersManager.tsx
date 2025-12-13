import { useState } from 'react';
import { Users, UserCog, Shield, Calendar, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import UserTable from '../../users/UserTable';
import EditUserPermissionsModal from '../../users/EditUserPermissionsModal';

type UserType = 'admin' | 'user';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  roleColor: string;
  status: string;
  avatar: string;
  lastActive?: string;
  registered?: string;
}

export default function UsersManager() {
  const [activeTab, setActiveTab] = useState<UserType>('admin');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const administrators: User[] = [
    {
      id: 1,
      name: 'Іван Петренко',
      email: 'ivan@company.com',
      role: 'Superadmin',
      roleColor: 'from-red-500 to-red-600',
      lastActive: '2024-12-12 14:30',
      status: 'active',
      avatar: 'IP'
    },
    {
      id: 2,
      name: 'Марія Коваленко',
      email: 'maria@company.com',
      role: 'Database Admin',
      roleColor: 'from-lime-500 to-green-600',
      lastActive: '2024-12-12 12:15',
      status: 'active',
      avatar: 'МК'
    },
    {
      id: 3,
      name: 'Олександр Шевченко',
      email: 'alex@company.com',
      role: 'Developer',
      roleColor: 'from-yellow-500 to-lime-600',
      lastActive: '2024-12-11 18:45',
      status: 'inactive',
      avatar: 'ОШ'
    },
    {
      id: 4,
      name: 'Катерина Мельник',
      email: 'kateryna@company.com',
      role: 'Analyst',
      roleColor: 'from-green-500 to-lime-600',
      lastActive: '2024-12-12 09:20',
      status: 'active',
      avatar: 'КМ'
    },
    {
      id: 5,
      name: 'Андрій Ткач',
      email: 'andriy@company.com',
      role: 'Viewer',
      roleColor: 'from-lime-600 to-yellow-600',
      lastActive: '2024-12-10 16:45',
      status: 'active',
      avatar: 'АТ'
    },
  ];

  const endUsers: User[] = [
    {
      id: 101,
      name: 'Анна Сидоренко',
      email: 'anna.s@example.com',
      role: 'Data Analyst',
      roleColor: 'from-violet-500 to-purple-600',
      registered: '2024-10-15',
      status: 'active',
      avatar: 'АС'
    },
    {
      id: 102,
      name: 'Дмитро Мельник',
      email: 'dmytro.m@example.com',
      role: 'Content Manager',
      roleColor: 'from-blue-500 to-cyan-600',
      registered: '2024-11-20',
      status: 'active',
      avatar: 'ДМ'
    },
    {
      id: 103,
      name: 'Олена Бондаренко',
      email: 'olena.b@example.com',
      role: 'Report Viewer',
      roleColor: 'from-indigo-500 to-violet-600',
      registered: '2024-12-01',
      status: 'active',
      avatar: 'ОБ'
    },
    {
      id: 104,
      name: 'Сергій Ткаченко',
      email: 'sergiy.t@example.com',
      role: 'Guest User',
      roleColor: 'from-slate-400 to-slate-500',
      registered: '2024-12-10',
      status: 'active',
      avatar: 'СТ'
    },
  ];

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (user: User) => {
    console.log('Delete user:', user);
    // TODO: Implement delete functionality
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-green-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <Badge variant="secondary" className="text-lg">6,748</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl mb-1">Всього користувачів</CardTitle>
            <CardDescription>Адміни та користувачі</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-lime-600 rounded-xl flex items-center justify-center">
                <UserCog className="w-6 h-6 text-white" />
              </div>
              <Badge variant="secondary" className="text-lg">42</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl mb-1">Адміністраторів</CardTitle>
            <CardDescription>З доступом до панелі</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-lime-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <Badge variant="secondary" className="text-lg">6,706</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl mb-1">Кінцевих користувачів</CardTitle>
            <CardDescription>Користувачі застосунку</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <Badge variant="secondary" className="text-lg">+156</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl mb-1">Цього місяця</CardTitle>
            <CardDescription>Нових користувачів</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Users Table with Tabs */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div>
            <CardTitle>Користувачі системи</CardTitle>
            <CardDescription>Управління адміністраторами та користувачами</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {/* Microsoft AD Info Banner */}
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-blue-900 mb-1">Управління через Microsoft Active Directory</h4>
              <p className="text-sm text-blue-800">
                Користувачі автоматично синхронізуються з корпоративного Active Directory. 
                Для створення нових облікових записів зверніться до системного адміністратора вашої організації.
              </p>
            </div>
          </div>

          <Tabs defaultValue="admin" value={activeTab} onValueChange={(value) => setActiveTab(value as UserType)}>
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="admin" className="gap-2">
                <UserCog className="w-4 h-4" />
                Адміністратори ({administrators.length})
              </TabsTrigger>
              <TabsTrigger value="user" className="gap-2">
                <Users className="w-4 h-4" />
                Користувачі ({endUsers.length})
              </TabsTrigger>
            </TabsList>

            {/* Administrators Tab */}
            <TabsContent value="admin" className="space-y-4">
              <UserTable 
                users={administrators} 
                type="admin"
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            </TabsContent>

            {/* End Users Tab */}
            <TabsContent value="user" className="space-y-4">
              <UserTable 
                users={endUsers} 
                type="user"
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit User Permissions Modal */}
      {selectedUser && (
        <EditUserPermissionsModal
          open={showEditModal}
          onOpenChange={handleCloseEditModal}
          user={selectedUser}
          userType={activeTab}
        />
      )}
    </div>
  );
}