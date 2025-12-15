interface UserRoleBadgeProps {
  role: string;
  roleColor: string;
}

export default function UserRoleBadge({ role, roleColor }: UserRoleBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 bg-gradient-to-br ${roleColor} rounded-full`} />
      <span className="text-slate-900">{role}</span>
    </div>
  );
}
