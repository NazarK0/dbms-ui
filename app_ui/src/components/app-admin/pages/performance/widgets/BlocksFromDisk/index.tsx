import { UserCog } from 'lucide-react';
import Widget, { CounterWidgetData, WidgetType } from '../../../../../global/Widget';
import { useBlocksFromDiskWidgetData } from './useBlocksFromDiskWidgetData';


export default function BlocksFromDiskWidget() {
    const { data, isLoading, error } = useBlocksFromDiskWidgetData();
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const url = "connections";

    const widgetData: CounterWidgetData = {
        ...data!,
    };

    return (
        <Widget
            title="Блоки з диску"
            icon={UserCog}
            type={WidgetType.COUNTER}
            data={widgetData}

        />
    );
}
