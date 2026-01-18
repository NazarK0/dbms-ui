import { ColumnConfig, TwoLine } from "../../../../global/table";
import { SystemLog } from "./types";
import { getTypeIcon } from "./utils";

    const columns: ColumnConfig<SystemLog> = [
        {
            key: "time",
            header: "Час",
            render: (row) => <span className="font-mono text-sm">{row.time}</span>,
        },
        {
            key: "level",
            header: "Рівень",
            width: "60px",
            render: (row) => {
                const { Icon, className } = getTypeIcon(row.level);
                return (
                    <div className="flex justify-center">
                        <Icon className={`h-5 w-5 ${className}`} />
                    </div>
                );
            },
        },
        {
            key: "source",
            header: "Джерело",
            render: (row) => <span className="font-mono text-sm">{row.source}</span>,
        },
        {
            key: "database",
            header: "База даних",
            render: (row) => <span className="font-mono text-sm">{row.database}</span>,
        },
        {
            key: "user",
            header: "Користувач",
            render: (row) => <span className="font-mono text-sm">{row.user}</span>,
        },
        {
            key: "message",
            header: "Повідомлення",
            render: (row) => <TwoLine title={row.message} subtitle={row.details} />,
        },
    ];

export default columns;