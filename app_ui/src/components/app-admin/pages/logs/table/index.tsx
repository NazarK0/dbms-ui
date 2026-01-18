import { UserCog } from 'lucide-react';
import Widget, { ListWidgetData, WidgetType } from '../../../../global/Widget';
import { useSystemLogWidgetData } from './useSystemLogWidgetData';
import columns from './columns';
import { getActivityColor } from './utils';

export default function LogTable() {
    const { data, isLoading, error } = useSystemLogWidgetData();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const url = "activity";

    const widgetData: ListWidgetData = {
        columns: columns as any,
        data: data!,
        url,
        rowClassName: (row) => getActivityColor(row.type),
    };

    return (
        <Widget
            title="Записи логів"
            icon={UserCog}
            type={WidgetType.LIST}
            data={widgetData}
        />
    );
}
