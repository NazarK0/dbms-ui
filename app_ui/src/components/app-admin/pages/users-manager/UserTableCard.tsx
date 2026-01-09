import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import MicrosoftADInfoBanner from './MicrosoftADInfoBanner';
import UserTabs from './UserTabs';
import type { UserTabsProps } from './types';

export default function UserTableCard(props: UserTabsProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div>
          <CardTitle>Користувачі системи</CardTitle>
          <CardDescription>
            Управління адміністраторами та користувачами
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {/* Microsoft AD Info Banner */}
        <MicrosoftADInfoBanner />

        {/* User Tabs */}
        <UserTabs {...props} />
      </CardContent>
    </Card>
  );
}
