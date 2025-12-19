import { Badge } from '../../../ui/badge';
import { getLevelBadge } from './utils';
import type { LogLevel } from './types';

interface LogLevelBadgeProps {
  level: LogLevel;
}

export default function LogLevelBadge({ level }: LogLevelBadgeProps) {
  const levelConfig = getLevelBadge(level);
  const Icon = levelConfig.icon;

  return (
    <Badge variant={levelConfig.variant} className={`${levelConfig.className} gap-1`}>
      <Icon className="w-3 h-3" />
      {level}
    </Badge>
  );
}
