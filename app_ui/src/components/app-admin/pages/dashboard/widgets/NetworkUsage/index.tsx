import { UserCog } from 'lucide-react';
import Widget, { LoadWidgetData, WidgetType } from '../../../../../global/Widget';
import { useNetworkUsageWidgetData } from './useNetworkUsageWidgetData';


export default function NetworkUsageWidget() {
    const { data, isLoading, error } = useNetworkUsageWidgetData();
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const url = "connections";

    const widgetData: LoadWidgetData = {
        ...data!,
    };

    return (
        <Widget
            title="Використання Мережі"
            icon={UserCog}
            type={WidgetType.LOAD}
            data={widgetData}

        />
    );
}
