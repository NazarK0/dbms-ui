import { Users, UserCog } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import UserTable from '../../users/UserTable';
import type { UserTabsProps } from './types';

export default function UserTabs({
  activeTab,
  onTabChange,
  administrators,
  endUsers,
  onEditUser,
  onDeleteUser,
}: UserTabsProps) {
  return (
    <Tabs
      defaultValue="admin"
      value={activeTab}
      onValueChange={onTabChange}
    >
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
          onEdit={onEditUser}
          onDelete={onDeleteUser}
        />
      </TabsContent>

      {/* End Users Tab */}
      <TabsContent value="user" className="space-y-4">
        <UserTable
          users={endUsers}
          type="user"
          onEdit={onEditUser}
          onDelete={onDeleteUser}
        />
      </TabsContent>
    </Tabs>
  );
}