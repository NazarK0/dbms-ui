import { Home, User } from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { mockAppName } from './data';
import type { UIHeaderProps } from './types';

export default function UIHeader({ deviceType, roleName }: UIHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-lime-500 to-green-600 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <Home className="w-5 h-5 text-lime-600" />
        </div>
        {deviceType === 'desktop' && (
          <span className="text-white">{mockAppName}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Badge className="bg-white/20 text-white border-0">{roleName}</Badge>
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}
