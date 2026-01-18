import { UserCog } from 'lucide-react';
import Widget, { CounterWidgetData, WidgetType } from '../../../../../global/Widget';
import { useUsersCountWidgetData } from './useUsersCountWidgetData';


export default function UsersCountWidget() {
    const { data, isLoading, error } = useUsersCountWidgetData();
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const url = "connections";

    const widgetData: CounterWidgetData = {
        ...data!,
    };

    return (
        <Widget
            title="Користувачів"
            icon={UserCog}
            type={WidgetType.COUNTER}
            data={widgetData}

        />
    );
}
