import { Shield, UserCog, Users, Key } from 'lucide-react';



import WidgetCard from './WidgetCard';



export default function RolesWidgets() {
  // Map stat types to values
  const totalAdmins = 42; // Example value, replace with actual data fetching logic
  const totalUsers = 128; // Example value, replace with actual data fetching logic
  const totalRoles = 15; // Example value, replace with actual data fetching logic
  const totalPermissions = 60; // Example value, replace with actual data fetching logic

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <WidgetCard
        icon={Shield}
        gradient="from-blue-500 to-blue-700"
        value={totalAdmins}
        title="Total Admins"
        description="Number of administrators in the system"
      />
      <WidgetCard
        icon={Users}
        gradient="from-green-500 to-green-700"
        value={totalUsers}
        title="Total Users"
        description="Number of users in the system"
      />
      <WidgetCard
        icon={UserCog}
        gradient="from-purple-500 to-purple-700"
        value={totalRoles}
        title="Total Roles"
        description="Number of roles defined in the system"
      />
      <WidgetCard
        icon={Key}
        gradient="from-yellow-500 to-yellow-700"
        value={totalPermissions}
        title="Total Permissions"
        description="Number of permissions available in the system"
      />
    </div>
  );
}
