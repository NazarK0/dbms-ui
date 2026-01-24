import LogWidget from './LogWidget';
import { useSystemLogWidgetPanelData } from './useSystemLogWidgetPanelData';


export default function LogWidgetsPanel() {
  const { data: stats, isLoading, error } = useSystemLogWidgetPanelData();

  console.log('sstats', stats)
  const total = stats!.errors + stats!.warnings + stats!.info + stats!.success;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <LogWidget label="Всього записів" value={total} />
      <LogWidget
        label="Помилки"
        level='error'
        value={stats!.errors}
      />
      <LogWidget
        label="Попередження"
        level='warning'
        value={stats!.warnings}
      />
      <LogWidget
        label="Інформаційні"
        level='info'
        value={stats!.info}
      />
      <LogWidget
        label="Успішні операції"
        level='success'
        value={stats!.success}
      />
    </div>
  );
}
