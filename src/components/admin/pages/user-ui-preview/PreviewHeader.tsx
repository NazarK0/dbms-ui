import { Eye } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import UserSelector from './UserSelector';
import { headerTitle, headerDescription } from './data';
import type { PreviewHeaderProps } from './types';

export default function PreviewHeader({
  username,
  userId,
  onUsernameChange,
  onUserIdChange,
}: PreviewHeaderProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-lime-600" />
              {headerTitle}
            </CardTitle>
            <CardDescription>{headerDescription}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* User Selector */}
        <UserSelector
          username={username}
          userId={userId}
          onUsernameChange={onUsernameChange}
          onUserIdChange={onUserIdChange}
        />
      </CardContent>
    </Card>
  );
}