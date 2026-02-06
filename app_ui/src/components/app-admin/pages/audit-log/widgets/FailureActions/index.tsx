import { UserCog } from 'lucide-react';
import Widget, { CounterWidgetData, WidgetType } from '../../../../../global/Widget';
import { useFailureActionsWidgetData } from './useFailureActionsWidgetData';


export default function FailureActionsWidget() {
    const { data, isLoading, error } = useFailureActionsWidgetData();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const widgetData: CounterWidgetData = {
        ...data!,
    };

    return (
        <Widget
            title="Виконано з помилками"
            icon={UserCog}
            type={WidgetType.COUNTER}
            data={widgetData}

        />
    );
}
