import { UserCog } from 'lucide-react';
import Widget, { LoadWidgetData, WidgetType } from '../../../../../global/Widget';
import { useCpuUsageWidgetData } from './useCpuUsageWidgetData';


export default function CpuUsageWidget() {
    const { data, isLoading, error } = useCpuUsageWidgetData();
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const url = "connections";

    const widgetData: LoadWidgetData = {
        ...data!,
    };

    return (
        <Widget
            title="Використання CPU"
            icon={UserCog}
            type={WidgetType.LOAD}
            data={widgetData}

        />
    );
}
