import { ColumnConfig } from "../../../../../global/table";
import { Badge } from "../../../../../ui/badge";
import { HitRatioCell, QueryCell, TotalTimeCell } from "./cells";



import { QueryStatEntry } from "./types";

const columns: ColumnConfig<QueryStatEntry> = [
    {
        key: "query",
        header: "Запит",
        render: (row) => <QueryCell query={row.query} />,
    },
    {
        key: "calls",
        header: "Виклики",
        render: (row) => <Badge variant="secondary">{row.calls.toLocaleString()}</Badge>,
    },
    {
        key: "totalTime",
        header: "Загальний час",
        render: (row) => <TotalTimeCell totalTime={row.totalTime} />,
    },
    {
        key: "avgTime",
        header: "Середній час",
        render: (row) => <span className="text-slate-600 font-mono text-sm">{row.avgTime}</span>,
    },
    {
        key: "min-max",
        header: "Мін/Макс",
        width: "60px",
        render: (row) => <span className="text-slate-600 text-xs font-mono">{row.minTime} / {row.maxTime}</span>,
    },
    {
        key: "rows",
        header: "Рядки",
        render: (row) => <span className="text-slate-600">{row.rows.toLocaleString()}</span>,
    },
    {
        key: "hitRatio",
        header: "Попадання кешу",
        render: (row) => <HitRatioCell hitRatio={row.hitRatio} />,
    },
];

export default columns;