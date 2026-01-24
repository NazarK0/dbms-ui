import { ColumnConfig } from "../../../../global/table";
import {ActionCell, CategoryCell, StatusCell, UserCell} from "./cells";

import { AuditEntry } from "./types";

const columns: ColumnConfig<AuditEntry> = [
    {
        key: "time",
        header: "Час",
        render: (row) => <span className="text-slate-600 text-sm font-mono">{row.time}</span>,
    },
    {
        key: "user",
        header: "Користувач",
        width: "60px",
        render: (row) => <UserCell user={row.user} />,
    },
    {
        key: "action",
        header: "Дія",
        render: (row) => <ActionCell action={row.action} />,
    },
    {
        key: "category",
        header: "Категорія",
        render: (row) => <CategoryCell category={row.category} />,
    },
    {
        key: "target",
        header: "Ціль",
        render: (row) => <span className="text-slate-900 font-mono text-sm max-w-xs truncate">{row.target}</span>,
    },
    {
        key: "details",
        header: "Деталі",
        render: (row) => <span className="text-slate-600 text-sm max-w-md truncate">{row.details}</span>,
    },
    {
        key: "ipAddress",
        header: "IP Адреса",
        render: (row) => <span className="text-slate-600 text-sm font-mono">{row.ipAddress}</span>,
    },
    {
        key: "status",
        header: "Статус",
        render: (row) => <StatusCell status={row.status} />,
    },
];

export default columns;