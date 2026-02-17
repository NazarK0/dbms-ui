import { UserCog } from 'lucide-react';
import Widget, { CounterWidgetData, WidgetType } from '../../../../../global/Widget';
import { useBlocksFromCacheWidgetData } from './useBlocksFromCacheWidgetData';


export default function BlocksFromCacheWidget() {
    const { data, isLoading, error } = useBlocksFromCacheWidgetData();
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const url = "connections";

    const widgetData: CounterWidgetData = {
        ...data!,
    };

    return (
        <Widget
            title="Блоки з кешу"
            icon={UserCog}
            type={WidgetType.COUNTER}
            data={widgetData}

        />
    );
}
