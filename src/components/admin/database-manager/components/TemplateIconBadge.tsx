import { Lock } from 'lucide-react';

interface TemplateIconBadgeProps {
  size?: 'sm' | 'md' | 'lg';
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

export default function TemplateIconBadge({ size = 'md' }: TemplateIconBadgeProps) {
  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center`}>
      <Lock className={`${iconSizeClasses[size]} text-white`} />
    </div>
  );
}
