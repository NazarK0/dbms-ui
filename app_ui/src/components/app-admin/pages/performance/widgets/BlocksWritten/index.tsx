import { UserCog } from 'lucide-react';
import Widget, { CounterWidgetData, WidgetType } from '../../../../../global/Widget';
import { useBlocksWrittenWidgetData } from './useBlocksWrittenWidgetData';


export default function BlocksWrittenWidget() {
    const { data, isLoading, error } = useBlocksWrittenWidgetData();
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const url = "connections";

    const widgetData: CounterWidgetData = {
        ...data!,
    };

    return (
        <Widget
            title="Блоки записані"
            icon={UserCog}
            type={WidgetType.COUNTER}
            data={widgetData}

        />
    );
}
