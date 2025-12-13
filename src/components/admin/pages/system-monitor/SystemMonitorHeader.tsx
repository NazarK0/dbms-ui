import type { SystemMonitorHeaderProps } from './types';

export default function SystemMonitorHeader({
  title = 'Системний моніторинг',
  description = 'Моніторинг продуктивності PostgreSQL в реальному часі',
}: SystemMonitorHeaderProps) {
  return (
    <div>
      <h2 className="text-slate-900">{title}</h2>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}
