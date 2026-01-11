import { ColumnConfig, TwoLine } from "../../../../../global/table";
import { ActivityLog } from "./types";
import { getCategoryIcon, getTypeIcon } from "./utils";

    const columns: ColumnConfig<ActivityLog> = [
        {
            key: "category",
            header: "",
            width: "60px",
            render: (row) => {
                const { Icon, className } = getCategoryIcon(row.category);
                return (
                    <div className="flex justify-center">
                        <Icon className={`h-5 w-5 ${className}`} />
                    </div>
                );
            },
        },
        {
            key: "type",
            header: "Активність",
            render: (row) => <TwoLine title={row.title} subtitle={row.details} />,
        },
        {
            key: "timeAgo",
            header: "Час",
            render: (row) => <span className="text-muted-foreground">{row.timeAgo}</span>,
        },
        {
            key: "type",
            header: "",
            width: "60px",
            render: (row) => {
                const { Icon, className } = getTypeIcon(row.type);
                return (
                    <div className="flex justify-center">
                        <Icon className={`h-5 w-5 ${className}`} />
                    </div>
                );
            },
        },
    ];

export default columns;