import { UserCog } from 'lucide-react';
import Widget, { LoadWidgetData, WidgetType } from '../../../../../global/Widget';
import { useRamUsageWidgetData } from './useRamUsageWidgetData';


export default function RamUsageWidget() {
    const { data, isLoading, error } = useRamUsageWidgetData();
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const url = "connections";

    const widgetData: LoadWidgetData = {
        ...data!,
    };

    return (
        <Widget
            title="Використання оперативної пам'яті"
            icon={UserCog}
            type={WidgetType.LOAD}
            data={widgetData}

        />
    );
}
