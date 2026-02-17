import { ColumnConfig } from "../../../../../global/table";
import { IndexCell, StatusCell, UsageCell} from "./cells";


import { IndexUsageEntry } from "./types";

const columns: ColumnConfig<IndexUsageEntry> = [
    {
        key: "database",
        header: "База даних",
        render: (row) => <span className="text-slate-900">{row.database}</span>,
    },
    {
        key: "schema",
        header: "Схема",
        render: (row) => <span className="text-slate-900">{row.schema}</span>,
    },
    {
        key: "table",
        header: "Таблиця",
        render: (row) => <span className="text-slate-900">{row.table}</span>,
    },
    {
        key: "index",
        header: "Індекс",
        width: "60px",
        render: (row) => <IndexCell index={row.index} />,
    },
    {
        key: "scans",
        header: "Сканування",
        render: (row) => <span className="text-slate-600">{row.scans.toLocaleString()}</span>,
    },
    {
        key: "rowsRead",
        header: "Прочитано рядків",
        render: (row) => <span className="text-slate-600">{row.rowsRead.toLocaleString()}</span>,
    },
    {
        key: "usage",
        header: "Використання",
        render: (row) => <UsageCell usage={row.usage} />,
    },
    {
        key: "size",
        header: "Розмір",
        render: (row) => <span className="text-slate-600">{row.size}</span>,
    },
    {
        key: "status",
        header: "Статус",
        render: (row) => <StatusCell usage={row.usage} />,
    },
];

export default columns;