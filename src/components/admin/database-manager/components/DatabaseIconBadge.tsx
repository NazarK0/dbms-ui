import { Database as DatabaseIcon } from 'lucide-react';

interface DatabaseIconBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'red' | 'green' | 'blue' | 'purple';
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const variantClasses = {
  red: 'bg-gradient-to-br from-red-500 to-pink-600',
  green: 'bg-gradient-to-br from-green-500 to-emerald-600',
  blue: 'bg-gradient-to-br from-blue-500 to-cyan-600',
  purple: 'bg-gradient-to-br from-purple-500 to-violet-600',
};

export default function DatabaseIconBadge({ 
  size = 'md', 
  variant = 'red' 
}: DatabaseIconBadgeProps) {
  return (
    <div className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-lg flex items-center justify-center`}>
      <DatabaseIcon className={`${iconSizeClasses[size]} text-white`} />
    </div>
  );
}
