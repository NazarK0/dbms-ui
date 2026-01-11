import { UserCog } from 'lucide-react';
import Widget, { ListWidgetData, WidgetType } from '../../../../../global/Widget';
import columns from './columns';
import { useActiveConnectionsWidgetData } from './useActiveConnectionsWidgetData';


export default function ActiveConnectionsWidget() {
    const { data, isLoading, error } = useActiveConnectionsWidgetData();
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const url = "connections";

    const widgetData: ListWidgetData = {
        columns: columns as any,
        data: data!,
        url
    };

    return (
        <Widget
            title="Active Connections"
            icon={UserCog}
            type={WidgetType.LIST}
            data={widgetData}

        />
    );
}
