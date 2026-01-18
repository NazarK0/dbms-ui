import { UserCog } from 'lucide-react';
import Widget, { LoadWidgetData, WidgetType } from '../../../../../global/Widget';
import { useDiskIOWidgetData } from './useDiskIOWidgetData';


export default function DiskIOWidget() {
    const { data, isLoading, error } = useDiskIOWidgetData();
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const url = "connections";

    const widgetData: LoadWidgetData = {
        ...data!,
    };

    return (
        <Widget
            title="Ввід/вивід диску"
            icon={UserCog}
            type={WidgetType.LOAD}
            data={widgetData}

        />
    );
}
