import { ColumnConfig } from "../../../../global/table";
import { Badge } from "../../../../ui/badge";
import { ReplicaActivityEntry } from "./types";


const columns: ColumnConfig<ReplicaActivityEntry> = [
    {
        key: "replica",
        header: "Репліка",
        render: (row) => <span className="text-slate-900">{row.replica}</span>,
    },
    {
        key: "state",
        header: "Стан",
        render: (row) => <Badge variant="default" className="bg-green-600">{row.state}</Badge>,
    },
    {
        key: "syncState",
        header: "Режим синхр.",
        render: (row) => <span className="text-slate-600">{row.syncState}</span>,
    },
    {
        key: "sentLSN",
        header: "Sent LSN",
        render: (row) => <code className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">{row.sentLSN}</code>,
    },
    {
        key: "writeLSN",
        header: "Write LSN",
        render: (row) => <code className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">{row.writeLSN}</code>,
    },
    {
        key: "flushLSN",
        header: "Flush LSN",
        render: (row) => <code className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">{row.flushLSN}</code>,
    },
    {
        key: "lag",
        header: "Затримка",
        render: (row) => <span className="text-slate-600 font-mono text-sm">{row.lag}</span>,
    },
];


export default columns;