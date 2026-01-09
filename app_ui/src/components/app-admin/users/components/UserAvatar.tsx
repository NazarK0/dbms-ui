interface UserAvatarProps {
  avatar: string;
  name: string;
  roleColor: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const textSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export default function UserAvatar({ 
  avatar, 
  name, 
  roleColor, 
  size = 'md' 
}: UserAvatarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} bg-gradient-to-br ${roleColor} rounded-full flex items-center justify-center text-white ${textSizeClasses[size]}`}>
        {avatar}
      </div>
      <span className="text-slate-900">{name}</span>
    </div>
  );
}
