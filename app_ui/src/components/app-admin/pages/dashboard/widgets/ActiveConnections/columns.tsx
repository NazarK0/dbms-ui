import { Badge } from '../../../../../ui/badge';
import { ColumnConfig, TwoLine } from "../../../../../global/table";
import { ActiveConnectionsWidgetData } from "./types";

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
                <div className="font-medium">{row.requests}</div>
                <div className="text-xs text-muted-foreground">запитів</div>
            </div>
        ),
    },
];

export default columns;