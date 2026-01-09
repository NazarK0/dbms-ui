import { UserCog } from 'lucide-react';
import { ColumnConfig, TwoLine } from '../../../../global/table';
import Widget, { ListWidgetData, WidgetType } from '../../../../global/Widget';
import { Badge } from '../../../../ui/badge';


export interface ActiveConnectionsWidgetData {
    id: number;
    name: string;
    user?: string;
    status: "АКТИВНИЙ" | "ОЧІКУЄ";
    duration: string;
    requests: number;
}

export default function ActiveConnectionsWidget() {
    const columns: ColumnConfig<ActiveConnectionsWidgetData> = [
        {
            key: "name",
            header: "База даних",
            render: (row) => <TwoLine title={row.name} subtitle={row.user} />,
        },
        {
            key: "status",
            header: "Статус",
            render: (row) => (
                <Badge variant={row.status === "АКТИВНИЙ" ? "default" : "secondary"}>
                    {row.status}
                </Badge>
            ),
        },
        {
            key: "duration",
            header: "Час підключення",
            render: (row) => <span className="font-mono text-sm">{row.duration}</span>,
        },
        {
            key: "requests",
            header: "Запитів",
            render: (row) => (
                <div className="text-right">
                    <div className="font-medium">{row.requests.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">запитів</div>
                </div>
            ),
        },
    ];

    const data: ActiveConnectionsWidgetData[] = [
        {
            id: 1,
            name: "customer_db",
            user: "admin",
            status: "АКТИВНИЙ",
            duration: "00:15:32",
            requests: 1245,
        },
        {
            id: 2,
            name: "inventory_db",
            user: "user1",
            status: "ОЧІКУЄ",
            duration: "00:08:45",
            requests: 892,
        },
        {
            id: 3,
            name: "sales_db",
            user: "user2",
            status: "АКТИВНИЙ",
            duration: "00:22:17",
            requests: 3456,
        },
    ];

    const url = "connections";

    const widgetData: ListWidgetData = {
        columns: columns as any,
        data,
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
