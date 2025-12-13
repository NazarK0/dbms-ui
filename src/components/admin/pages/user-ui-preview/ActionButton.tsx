import { getActionButtonClass, getActionIconClass } from './utils';
import type { ActionButtonProps } from './types';

export default function ActionButton({
  icon: Icon,
  label,
  enabled,
}: ActionButtonProps) {
  return (
    <button className={getActionButtonClass(enabled)} disabled={!enabled}>
      <Icon className={getActionIconClass(enabled)} />
      <div className="text-xs text-slate-900">{label}</div>
    </button>
  );
}
