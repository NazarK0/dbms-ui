import { Database, Bell, Settings, Home } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface AdminHeaderProps {
  onHomeClick: () => void;
}

export default function AdminHeader({ onHomeClick }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-lime-200/50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onHomeClick}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
            <div className="w-10 h-10 bg-gradient-to-br from-lime-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-slate-900">PostgreSQL DBMS</h1>
              <p className="text-slate-600 text-sm">Root Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-2">
              <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
              Connected
            </Badge>
            <Button variant="outline" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
