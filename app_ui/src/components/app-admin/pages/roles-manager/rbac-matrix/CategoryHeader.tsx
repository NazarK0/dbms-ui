import { ChevronDown, ChevronRight } from 'lucide-react';
import { Badge } from '../../../../ui/badge';
import { getColorClasses } from './utils';
import type { RoleType, PermissionGroup } from './types';

interface CategoryHeaderProps {
  group: PermissionGroup;
  type: RoleType;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function CategoryHeader({
  group,
  type,
  isExpanded,
  onToggle,
}: CategoryHeaderProps) {
  const colors = getColorClasses(type);
  const IconComponent = group.icon;

  return (
    <button
      onClick={onToggle}
      className={`w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r ${colors.bgGradient} ${colors.bgGradientHover} transition-colors border-b ${colors.border}`}
    >
      <div className="flex items-center gap-3">
        <IconComponent className={`w-4 h-4 ${colors.iconColor}`} />
        <span className="text-slate-900">{group.category}</span>
        <Badge
          variant="outline"
          className={`bg-white ${colors.badgeBorder} ${colors.badgeText}`}
        >
          {group.permissions.length}
        </Badge>
      </div>
      {isExpanded ? (
        <ChevronDown className="w-4 h-4 text-slate-600" />
      ) : (
        <ChevronRight className="w-4 h-4 text-slate-600" />
      )}
    </button>
  );
}
