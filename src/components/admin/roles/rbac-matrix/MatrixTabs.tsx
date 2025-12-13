import { UserCog, Users } from 'lucide-react';
import { TabsList, TabsTrigger } from '../../../ui/tabs';

interface MatrixTabsProps {
  adminCount: number;
  userCount: number;
}

export default function MatrixTabs({ adminCount, userCount }: MatrixTabsProps) {
  return (
    <TabsList className="w-full justify-start mb-6">
      <TabsTrigger value="admin" className="gap-2">
        <UserCog className="w-4 h-4" />
        Адмін ролі ({adminCount})
      </TabsTrigger>
      <TabsTrigger value="user" className="gap-2">
        <Users className="w-4 h-4" />
        Користувацькі ролі ({userCount})
      </TabsTrigger>
    </TabsList>
  );
}
