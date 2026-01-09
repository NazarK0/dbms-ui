import type { RoleType } from './types';

interface RoleCellProps {
  roleName: string;
  roleColor: string;
  type: RoleType;
}

export default function RoleCell({ roleName, roleColor, type }: RoleCellProps) {
  const hoverBg = type === 'admin' ? 'hover:bg-lime-50/30' : 'hover:bg-violet-50/30';

  return (
    <td className={`px-4 py-3 sticky left-0 bg-white ${hoverBg}`}>
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${roleColor}`} />
        <span className="text-sm text-slate-900">{roleName}</span>
      </div>
    </td>
  );
}
