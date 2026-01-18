import { UserCog } from 'lucide-react';
import Widget, { CounterWidgetData, WidgetType } from '../../../../../global/Widget';
import { useUsedStorageWidgetData } from './useUsedStorageWidgetData';


export default function UsedStorageWidget() {
    const { data, isLoading, error } = useUsedStorageWidgetData();
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const url = "connections";

    const widgetData: CounterWidgetData = {
        ...data!,
    };

    return (
        <Widget
            title="Використано сховища"
            icon={UserCog}
            type={WidgetType.COUNTER}
            data={widgetData}

        />
    );
}
