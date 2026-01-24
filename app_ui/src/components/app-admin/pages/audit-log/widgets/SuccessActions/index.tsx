import { UserCog } from 'lucide-react';
import Widget, { CounterWidgetData, WidgetType } from '../../../../../global/Widget';
import { useSuccessActionsWidgetData } from './useSuccessActionsWidgetData';


export default function SuccessActionsWidget() {
    const { data, isLoading, error } = useSuccessActionsWidgetData();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const widgetData: CounterWidgetData = {
        ...data!,
    };

    return (
        <Widget
            title="Виконано без помилок"
            icon={UserCog}
            type={WidgetType.COUNTER}
            data={widgetData}

        />
    );
}
