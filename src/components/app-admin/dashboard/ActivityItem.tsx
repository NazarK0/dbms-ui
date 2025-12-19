interface ActivityItemProps {
  action: string;
  details: string;
  user: string;
  time: string;
  type: 'success' | 'info' | 'warning';
}

export function ActivityItem({ action, details, user, time, type }: ActivityItemProps) {
  const getActivityColor = () => {
    switch(type) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-lime-50 rounded-lg transition-colors">
      <div className={`w-2 h-2 rounded-full ${getActivityColor()} mt-2 flex-shrink-0`}></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-900">{action}</p>
        <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
          <code className="px-2 py-0.5 bg-slate-100 rounded">{details}</code>
          <span>•</span>
          <span>{user}</span>
          <span>•</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
