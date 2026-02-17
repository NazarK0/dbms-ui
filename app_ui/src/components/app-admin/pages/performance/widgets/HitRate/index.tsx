import { UserCog } from 'lucide-react';
import Widget, { LoadWidgetData, WidgetType } from '../../../../../global/Widget';
import { useCacheHitRateWidgetData } from './useCacheHitRateWidgetData';


export default function CacheHitRateWidget() {
    const { data, isLoading, error } = useCacheHitRateWidgetData();
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const url = "connections";

    const widgetData: LoadWidgetData = {
        ...data!,
    };

    return (
        <Widget
            title="Коефіцієнт попадань"
            icon={UserCog}
            type={WidgetType.LOAD}
            data={widgetData}

        />
    );
}
