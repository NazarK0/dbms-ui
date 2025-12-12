import { useState } from 'react';
import { Users, Plus, UserCog, Shield, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import UserTable from '../../users/UserTable';
import CreateUserModal from '../../users/CreateUserModal';

type UserType = 'admin' | 'user';

export default function UsersManager() {
  const [activeTab, setActiveTab] = useState<UserType>('admin');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const administrators = [
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
  ];

  const endUsers = [
    {
      id: 101,
      name: 'Анна Сидоренко',
      email: 'anna.s@gmail.com',
      role: 'Premium User',
      roleColor: 'from-violet-500 to-purple-600',
      registered: '2024-10-15',
      status: 'active',
      avatar: 'АС'
    },
    {
      id: 102,
      name: 'Дмитро Мельник',
      email: 'dmytro.m@gmail.com',
      role: 'Standard User',
      roleColor: 'from-blue-500 to-cyan-600',
      registered: '2024-11-20',
      status: 'active',
      avatar: 'ДМ'
    },
    {
      id: 103,
      name: 'Олена Бондаренко',
      email: 'olena.b@gmail.com',
      role: 'Free User',
      roleColor: 'from-slate-400 to-slate-500',
      registered: '2024-12-01',
      status: 'active',
      avatar: 'ОБ'
    },
    {
      id: 104,
      name: 'Сергій Ткаченко',
      email: 'sergiy.t@gmail.com',
      role: 'Trial User',
      roleColor: 'from-amber-500 to-orange-600',
      registered: '2024-12-10',
      status: 'trial',
      avatar: 'СТ'
    },
  ];

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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Користувачі системи</CardTitle>
              <CardDescription>Управління адміністраторами та користувачами</CardDescription>
            </div>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Створити {activeTab === 'admin' ? 'адміністратора' : 'користувача'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
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
              <UserTable users={administrators} type="admin" />
            </TabsContent>

            {/* End Users Tab */}
            <TabsContent value="user" className="space-y-4">
              <UserTable users={endUsers} type="user" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Create User Modal */}
      <CreateUserModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        userType={activeTab}
      />
    </div>
  );
}
