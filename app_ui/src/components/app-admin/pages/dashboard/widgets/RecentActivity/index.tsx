import { UserCog } from 'lucide-react';
import Widget, { ListWidgetData, WidgetType } from '../../../../../global/Widget';
import { useRecentActivityWidgetData } from './useRecentActivityWidgetData';
import columns from './columns';
import { getActivityColor } from './utils';

export default function RecentActivityWidget() {
    const { data, isLoading, error } = useRecentActivityWidgetData();

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
            title="Recent Activity"
            icon={UserCog}
            type={WidgetType.LIST}
            data={widgetData}
        />
    );
}
