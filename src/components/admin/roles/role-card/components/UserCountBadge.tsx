/**
 * UserCountBadge Component
 * Displays user count in messenger-style badge (top-left corner)
 */

interface UserCountBadgeProps {
  count: number;
}

export default function UserCountBadge({ count }: UserCountBadgeProps) {
  return (
    <div className="absolute top-1.5 left-1.5 z-20">
      <div className="h-5 min-w-[20px] px-1.5 bg-red-500 rounded-full flex items-center justify-center shadow-md">
        <span className="text-[10px] text-white font-bold leading-none">{count}</span>
      </div>
    </div>
  );
}
